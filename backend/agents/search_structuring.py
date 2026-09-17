import os
from typing import Literal

from dotenv import load_dotenv
from google import genai
from google.genai import types, errors
from pydantic import BaseModel, Field

from services.attribute_registry import (
    SYSTEM_FIELDS,
    get_registry_prompt,
    resolve_attribute_key,
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

MODEL_NAME = "gemini-3.5-flash"

# 검색 조건 Schema
class SearchCondition(BaseModel):
    key: str = Field(
        description=(
            "SYSTEM_FIELDS 또는 Attribute Registry의 "
            "표준 key"
        )
    )

    label: str = Field(
        description="사용자 표시용 조건명"
    )

    operator: Literal[
        "<=",
        ">=",
        "==",
        "contains",
        "in",
    ]

    value: str = Field(
        description="사용자가 표현한 조건값"
    )

    number_value: float | None = Field(
        default=None,
        description=(
            "숫자 비교가 가능한 경우 "
            "정규화된 숫자값"
        )
    )

    values: list[str] = Field(
        default_factory=list,
        description=(
            "여러 허용값이 있는 경우 사용"
        )
    )

    unit: str | None = None


class SearchPreference(
    SearchCondition
):
    weight: int = Field(
        default=10,
        ge=1,
        le=100,
    )


class GenericSearchQuery(BaseModel):
    category: str | None = None

    purpose: str | None = None

    keywords: list[str] = Field(
        default_factory=list
    )

    hard_conditions: list[
        SearchCondition
    ] = Field(
        default_factory=list
    )

    preferences: list[
        SearchPreference
    ] = Field(
        default_factory=list
    )

# key 표준화
def resolve_search_key(
    key: str | None,
    label: str | None = None,
):
    """
    검색 Agent가 반환한 key를
    시스템 필드 또는 Registry key로 통일한다.
    """

    if key in SYSTEM_FIELDS:
        return key

    return resolve_attribute_key(
        key=key,
        label=label,
    )


def _normalize_condition(
    condition: dict,
):
    canonical_key = resolve_search_key(
        condition.get("key"),
        condition.get("label"),
    )

    if canonical_key is None:
        return None

    normalized = {
        **condition,
        "key": canonical_key,
    }

    # 시스템 필드 label 보정
    if canonical_key in SYSTEM_FIELDS:
        normalized["label"] = (
            SYSTEM_FIELDS[
                canonical_key
            ].get(
                "label",
                condition.get("label"),
            )
        )

    return normalized


def normalize_structured_query(
    structured: dict,
):
    """
    LLM 응답을 Registry 기준으로 다시 검증한다.
    """

    hard_conditions = []

    for condition in structured.get(
        "hard_conditions",
        []
    ):
        normalized = (
            _normalize_condition(
                condition
            )
        )

        if normalized:
            hard_conditions.append(
                normalized
            )

    preferences = []

    for condition in structured.get(
        "preferences",
        []
    ):
        normalized = (
            _normalize_condition(
                condition
            )
        )

        if normalized:
            preferences.append(
                normalized
            )

    keywords = []

    seen = set()

    for keyword in structured.get(
        "keywords",
        []
    ):
        keyword = str(
            keyword
        ).strip()

        if not keyword:
            continue

        normalized_keyword = (
            keyword.lower()
        )

        if normalized_keyword in seen:
            continue

        seen.add(
            normalized_keyword
        )

        keywords.append(
            keyword
        )

    return {
        "category":
            structured.get(
                "category"
            ),

        "purpose":
            structured.get(
                "purpose"
            ),

        "keywords":
            keywords,

        "hard_conditions":
            hard_conditions,

        "preferences":
            preferences,
    }

def structure_generic_query(
    query: str
):
    registry_prompt = (
        get_registry_prompt()
    )

    system_fields_prompt = "\n".join(
        f"- {key}: "
        f"{definition.get('label')}"
        for key, definition
        in SYSTEM_FIELDS.items()
    )

    prompt = f"""
    너는 범용 중고거래 검색 조건 구조화 Agent다.

    특정 상품군에 한정하지 않고
    사용자의 자연어 검색 문장을 검색 가능한 구조로 분해한다.


    [사용자 검색어]

    {query}


    [출력 목적]

    사용자 검색어를 아래 5가지로 명확하게 분리한다.

    1. category
    2. purpose
    3. keywords
    4. hard_conditions
    5. preferences


    [각 항목의 의미]

    1. category

    사용자가 찾고 있는 "상품 종류"만 기록한다.

    예:
    - 노트북
    - 태블릿
    - 테니스 라켓
    - 바이올린
    - 책상
    - 유모차

    category에는 용도, 브랜드, 가격, 상태 등을 넣지 않는다.


    2. purpose

    사용자가 상품을 왜 또는 어디에 사용하려는지 기록한다.

    원문 전체를 복사하지 말고
    핵심 목적만 짧게 요약한다.

    가능하면 2~4개의 짧은 단어로 표현한다.

    예:

    "학교에 들고 다니면서 과제랑 코딩하려고"
    → "학업 · 코딩"

    "강의 필기용으로 쓰려고"
    → "강의 필기"

    "대학교 교양 수업에서 한 학기 쓸 거야"
    → "대학교 수업"

    "영상 편집하려고"
    → "영상 작업"


    3. keywords

    keywords는 실제 상품을 식별하는 데 필요한
    상품명, 제품군명, 모델명 등의 검색어만 넣는다.

    매우 중요:

    - purpose에 들어간 표현을 keywords에 다시 넣지 않는다.
    - hard_conditions에 들어간 표현을 keywords에 다시 넣지 않는다.
    - preferences에 들어간 표현을 keywords에 다시 넣지 않는다.
    - 브랜드가 preference라면 keywords에 넣지 않는다.
    - 가격, 무게, 거리, 상태, 사용 기간 같은 조건은
    keywords에 넣지 않는다.
    - "가벼운", "깨끗한", "저렴한" 같은 형용사는
    keywords가 아니다.

    예:

    입력:
    "학교에서 과제랑 코딩할 가벼운 노트북"

    category:
    "노트북"

    purpose:
    "학업 · 코딩"

    keywords:
    []

    preferences:
    "가벼운"


    입력:
    "강의 필기용 아이패드"

    category:
    "태블릿"

    purpose:
    "강의 필기"

    keywords:
    ["아이패드"]


    입력:
    "사진 찍을 소니 미러리스 카메라"

    category:
    "카메라"

    purpose:
    "사진 촬영"

    keywords:
    ["미러리스"]

    브랜드가 단순 상품 식별 정보인지,
    선호 조건인지 문맥을 보고 판단한다.


    [시스템 공통 필드]

    {system_fields_prompt}


    [사용 가능한 Attribute Registry]

    아래 key만 상품 속성 조건으로 사용할 수 있다.

    {registry_prompt}


    [key 규칙]

    1. 시스템 필드 또는 Attribute Registry에 존재하는
    key만 사용한다.

    2. 새로운 key를 임의로 만들지 않는다.

    3. 같은 의미의 Registry key가 존재하면
    반드시 표준 key를 사용한다.

    예:

    무게 / 중량
    → weight_kg

    사용기간
    → usage_months

    구성품 / 포함품
    → accessories

    브랜드 / 제조사
    → brand


    [Hard Condition]

    사용자가 충족하지 않으면 구매하지 않겠다는
    의미로 표현한 조건이다.

    다음 표현을 강한 신호로 본다.

    - 반드시
    - 무조건
    - 꼭
    - ~여야 한다
    - ~만
    - ~이하
    - ~이상
    - ~넘으면 안 된다
    - ~없으면 안 된다

    예:

    "30만원 이하"
    → price <= 300000

    "1.5kg 이하여야 해"
    → weight_kg <= 1.5

    "충전기 포함된 것만"
    → accessories contains "충전기"

    "원목만"
    → material contains "원목"


    [Preference]

    만족하면 좋지만,
    만족하지 않아도 검색 후보가 될 수 있는 조건이다.

    다음 표현을 선호의 신호로 본다.

    - 좋겠어
    - 좋으면
    - 선호해
    - 가능하면
    - 되도록
    - ~였으면
    - 가벼운
    - 가까운
    - 깨끗한
    - 짧은

    예:

    "가벼우면 좋겠어"
    → Preference

    "LG나 삼성이면 좋겠어"
    → Preference

    "구성품 전부 있으면 좋겠어"
    → Preference

    "사용 기간이 짧았으면 좋겠어"
    → Preference


    [숫자와 operator 규칙]

    매우 중요하다.

    1. 사용자가 숫자를 말하지 않았다면
    숫자를 절대 만들어내지 않는다.

    2. number_value는 사용자가 실제 숫자를 말했을 때만 사용한다.

    3. 숫자가 없는 정성적 표현에는
    <= 또는 >= 연산자를 사용하지 않는다.

    잘못된 예:

    "가벼운"
    → operator "<="
    → unit "kg"

    "사용기간 짧은"
    → operator "<="
    → unit "개월"


    올바른 예:

    "가벼운"
    → operator "contains"
    → value "가벼운"
    → number_value null
    → unit null

    "사용 기간이 짧은"
    → operator "contains"
    → value "짧은"
    → number_value null
    → unit null


    4. 숫자가 명시된 경우에만 숫자 비교 연산자를 사용한다.

    "1.5kg 이하"
    → operator "<="
    → number_value 1.5
    → unit "kg"

    "12개월 이하"
    → operator "<="
    → number_value 12
    → unit "개월"


    [중복 금지 규칙]

    하나의 사용자 표현은 가장 적절한 한 영역에만 배치한다.

    예:

    "코딩용"
    → purpose

    "삼성이면 좋겠어"
    → preferences의 brand

    "30만원 이하"
    → hard_conditions의 price

    "가벼우면 좋겠어"
    → preferences의 weight_kg

    이 표현들을 keywords에 다시 넣지 않는다.


    [판단 예시 1]

    입력:
    "학교에 들고 다니면서 과제랑 코딩할 노트북 찾고 있어.
    50만원 이하였으면 하고 가벼운 게 좋아.
    윈도우였으면 좋겠고 LG나 삼성 선호해."

    의도:

    category:
    "노트북"

    purpose:
    "학업 · 코딩"

    keywords:
    []

    hard_conditions:
    - price <= 500000

    preferences:
    - weight_kg contains "가벼운"
    - os contains "Windows"
    - brand in ["LG", "삼성"]


    [판단 예시 2]

    입력:
    "영상작업용 가벼운 삼성·LG 노트북으로
    30만 원 이하,
    구성품 전부 있으면 좋겠어.
    사용기간이 짧았으면 좋겠어."

    의도:

    category:
    "노트북"

    purpose:
    "영상 작업"

    keywords:
    []

    hard_conditions:
    - price <= 300000

    preferences:
    - brand in ["삼성", "LG"]
    - weight_kg contains "가벼운"
    - accessories contains "전체 구성품"
    - usage_months contains "짧은"


    [판단 예시 3]

    입력:
    "강의 필기용 아이패드 찾고 있어.
    20만원 이하여야 하고
    3km 이내였으면 좋겠고
    64GB 이상이면 좋아."

    의도:

    category:
    "태블릿"

    purpose:
    "강의 필기"

    keywords:
    ["아이패드"]

    hard_conditions:
    - price <= 200000

    preferences:
    - distance_km <= 3
    - storage_gb >= 64


    [최종 규칙]

    - 사용자가 말하지 않은 조건을 추측해서 추가하지 않는다.
    - 목적을 임의로 상품 사양 조건으로 변환하지 않는다.
    - 하나의 표현을 여러 필드에 중복 기록하지 않는다.
    - keywords는 최소한으로 사용한다.
    - 숫자가 없는 정성적 표현에는 숫자 비교 연산자를 쓰지 않는다.
    - 최종 상품 추천이나 구매 판단은 하지 않는다.
    """

    MODEL_NAMES = [
        "gemini-3.5-flash-lite",
        "gemini-3.5-flash",
    ]

    response = None
    last_error = None

    for model_name in MODEL_NAMES:
        try:
            print(
                "[건지니 Search Structuring Gemini 호출] "
                f"{model_name}"
            )

            chat = client.chats.create(
                model=model_name,
                config={
                    "response_mime_type": "application/json",
                    "response_schema": GenericSearchQuery,
                },
            )

            response = chat.send_message(
                prompt
            )

            break

        except (
            errors.ServerError,
            errors.ClientError,
        ) as error:
            last_error = error
            error_text = str(error)

            is_fallback_error = (
                "503" in error_text
                or "UNAVAILABLE" in error_text
                or "429" in error_text
                or "RESOURCE_EXHAUSTED" in error_text
            )

            if not is_fallback_error:
                raise

            print(
                "[건지니 Search Structuring fallback] "
                f"{model_name} 실패 -> 다음 모델"
            )

    if response is None:
        raise last_error

    if response.parsed:
        raw = (
            response.parsed.model_dump()
        )

    else:
        raw = (
            GenericSearchQuery
            .model_validate_json(
                response.text
            )
            .model_dump()
        )

    return normalize_structured_query(
        raw
    )