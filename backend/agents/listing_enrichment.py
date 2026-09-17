import os
from typing import Literal

from dotenv import load_dotenv
from google import genai
from google.genai.errors import ServerError
from google.genai import types
from pydantic import BaseModel, Field

from services.attribute_registry import (
    get_attribute_definition,
    get_registry_prompt,
    resolve_attribute_key,
)

from services.enrichment_store import (
    get_enrichment,
    is_enrichment_fresh,
    save_enrichment,
    save_enrichment_error,
)


load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY"),
    http_options=types.HttpOptions(
        retry_options=types.HttpRetryOptions(
            attempts=1
        )
    ),
)
MODEL_NAMES = [
    "gemini-3.5-flash-lite",
    "gemini-3.5-flash",
]


def _generate_listing_analysis(prompt: str):
    """
    503 UNAVAILABLE 발생 시 다음 Gemini 모델로만 fallback한다.
    같은 모델에 반복 재시도하지 않아 불필요한 요청을 늘리지 않는다.
    """
    last_error = None

    for model_name in MODEL_NAMES:
        try:
            print(
                "[건지니 enrichment Gemini 호출] "
                f"{model_name}"
            )

            return client.models.generate_content(
                model=model_name,
                contents=prompt,
                config={
                    "response_mime_type":
                        "application/json",
                    "response_schema":
                        GenericListingAnalysis,
                },
            )

        except ServerError as error:
            last_error = error
            status_code = (
                getattr(error, "status_code", None)
                or getattr(error, "code", None)
            )

            is_unavailable = (
                status_code == 503
                or "503" in str(error)
                or "UNAVAILABLE" in str(error)
            )

            if not is_unavailable:
                raise

            print(
                "[건지니 enrichment 503] "
                f"{model_name} -> 다음 모델 시도"
            )

    if last_error is not None:
        raise last_error

    raise RuntimeError(
        "사용 가능한 Gemini enrichment 모델이 없습니다."
    )


# Response Schema
class ExtractedAttribute(BaseModel):
    key: str = Field(
        description=(
            "Attribute Registry에 정의된 "
            "표준 속성 key"
        )
    )

    label: str = Field(
        description="사용자 표시용 속성명"
    )

    value: str = Field(
        description=(
            "판매글에서 확인된 원래 속성값"
        )
    )

    number_value: float | None = Field(
        default=None,
        description=(
            "숫자 비교가 가능한 경우의 "
            "정규화된 숫자값"
        )
    )

    unit: str | None = Field(
        default=None
    )

    evidence: str = Field(
        description=(
            "판매글에서 해당 속성을 "
            "추출한 짧은 근거"
        )
    )

    certainty: Literal[
        "명시",
        "판매자 주장",
        "불명확",
    ]


class GenericListingAnalysis(BaseModel):
    summary: str

    attributes: list[
        ExtractedAttribute
    ] = Field(
        default_factory=list
    )

    seller_claims: list[str] = Field(
        default_factory=list
    )

    condition_observations: list[str] = Field(
        default_factory=list
    )

    unknown: list[str] = Field(
        default_factory=list
    )

    risk_flags: list[str] = Field(
        default_factory=list
    )

def _stored_enrichment_to_analysis(
    enrichment: dict
):
    return {
        "summary":
            enrichment.get("summary") or "",

        "attributes":
            enrichment.get(
                "attributes",
                []
            ),

        "seller_claims":
            enrichment.get(
                "seller_claims",
                []
            ),

        "condition_observations":
            enrichment.get(
                "condition_observations",
                []
            ),

        "unknown":
            enrichment.get(
                "unknown",
                []
            ),

        "risk_flags":
            enrichment.get(
                "risk_flags",
                []
            ),
    }


def normalize_analysis(
    analysis: dict
):
    normalized_attributes = []

    unknown = list(
        analysis.get(
            "unknown",
            []
        )
    )

    for attribute in analysis.get(
        "attributes",
        []
    ):
        canonical_key = (
            resolve_attribute_key(
                key=attribute.get("key"),
                label=attribute.get(
                    "label"
                ),
            )
        )

        if canonical_key is None:
            original_name = (
                attribute.get("label")
                or attribute.get("key")
                or "알 수 없는 속성"
            )

            original_value = (
                attribute.get("value")
            )

            unknown.append(
                "표준 속성으로 매핑되지 않은 정보: "
                f"{original_name}"
                f" = {original_value}"
            )

            continue

        definition = (
            get_attribute_definition(
                canonical_key
            )
        )

        normalized = {
            **attribute,

            "key":
                canonical_key,

            "label":
                definition.get(
                    "label",
                    attribute.get(
                        "label"
                    ),
                ),
        }

        if (
            not normalized.get("unit")
            and definition.get("unit")
        ):
            normalized["unit"] = (
                definition["unit"]
            )

        normalized_attributes.append(
            normalized
        )

    # 동일 key/value 중복 제거
    deduplicated = []
    seen = set()

    for attribute in (
        normalized_attributes
    ):
        identity = (
            attribute.get("key"),
            str(
                attribute.get("value")
            ).strip().lower(),
        )

        if identity in seen:
            continue

        seen.add(identity)

        deduplicated.append(
            attribute
        )

    return {
        "summary":
            analysis.get(
                "summary",
                ""
            ),

        "attributes":
            deduplicated,

        "seller_claims":
            analysis.get(
                "seller_claims",
                []
            ),

        "condition_observations":
            analysis.get(
                "condition_observations",
                []
            ),

        "unknown":
            unknown,

        "risk_flags":
            analysis.get(
                "risk_flags",
                []
            ),
    }


# 범용 매물 분석
def analyze_generic_listing(
    item: dict,
    force: bool = False,
):
    """
    판매글 자연어를 분석하여
    Attribute Registry 기반의
    구조화 enrichment를 생성한다.

    최신 분석이 DB에 존재하면
    Gemini를 다시 호출하지 않는다.
    """

    if (
        not force
        and is_enrichment_fresh(item)
    ):
        stored = get_enrichment(
            item["id"]
        )

        print(
            "[건지니 enrichment HIT] "
            f"{item['id']}"
        )

        return (
            _stored_enrichment_to_analysis(
                stored
            )
        )

    print(
        "[건지니 enrichment 분석] "
        f"{item['id']}"
    )

    registry_prompt = (
        get_registry_prompt()
    )

    prompt = f"""
너는 중고거래 플랫폼의
범용 매물 구조화 Agent다.

특정 상품군에 한정되지 않는다.

플랫폼에서 제공된 최소 공통 정보와
판매자가 작성한 자연어 설명을 읽고,
검색과 구매 판단에 사용할 수 있도록
상품 속성을 구조화한다.


[원본 매물]

카테고리:
{item.get("category")}

상품명:
{item.get("title")}

가격:
{item.get("price")}

거래위치:
{item.get("location")}

판매글:
{item.get("description")}


[사용 가능한 Attribute Registry]

아래 key만 attributes의 key로 사용할 수 있다.

{registry_prompt}


[분석 원칙]

1. 판매글이나 상품명에 실제로 나타난 정보만
   attributes에 넣는다.

2. 일반적인 제품 지식으로
   판매글에 없는 스펙을 추론하지 않는다.

3. Registry에 없는 새로운 key를
   임의로 만들지 않는다.

4. Registry에 대응되지 않지만
   구매 판단에 중요해 보이는 정보는
   unknown에 자연어로 기록한다.

5. 가격, 거래위치, 카테고리, 상품명은
   시스템이 별도로 관리하므로
   attributes에 중복해서 넣지 않는다.

6. 판매자가
   "정상입니다",
   "배터리 좋아요",
   "하자 없습니다",
   "거의 새것입니다"
   등으로 주장하는 내용은
   검증된 사실로 취급하지 않는다.

7. 판매자의 주장에 기반한 속성은
   certainty를 "판매자 주장"으로 설정한다.

8. 숫자로 비교할 수 있는 정보는
   number_value에 정규화된 숫자를 넣는다.

예:

"무게 1.2kg"

key = weight_kg
value = "1.2kg"
number_value = 1.2
unit = "kg"

9. 사용기간을 변환할 수 있다면
   usage_months로 통일한다.

예:

"2년 사용"

number_value = 24
unit = "개월"

10. 속성의 의미가 불명확하거나
    확실히 판단할 수 없는 경우
    추측하지 않는다.

11. 최종적으로 이 상품을
    추천/비추천하지 않는다.

이 Agent의 역할은
오직 매물 정보를 구조화하는 것이다.
"""

    try:
        response = _generate_listing_analysis(
            prompt
        )

        if response.parsed:
            raw_analysis = (
                response.parsed.model_dump()
            )

        else:
            raw_analysis = (
                GenericListingAnalysis
                .model_validate_json(
                    response.text
                )
                .model_dump()
            )

        analysis = normalize_analysis(
            raw_analysis
        )

        save_enrichment(
            item=item,
            analysis=analysis,
        )

        print(
            "[건지니 enrichment 저장] "
            f"{item['id']}"
        )

        return analysis

    except Exception as error:
        save_enrichment_error(
            item=item,
            error=str(error),
        )

        print(
            "[건지니 enrichment 실패] "
            f"{item['id']}: {error}"
        )

        raise