import json
import os
from typing import Literal

from dotenv import load_dotenv
from google import genai
from google.genai import errors, types
from pydantic import BaseModel, Field


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


def _generate_judgement(prompt: str):
    last_error = None

    for model_name in MODEL_NAMES:
        try:
            print(
                "[건지니 Final Judge Gemini 호출] "
                f"{model_name}"
            )

            return client.models.generate_content(
                model=model_name,
                contents=prompt,
                config={
                    "response_mime_type":
                        "application/json",
                    "response_schema":
                        GenericJudgement,
                    "temperature":
                        0.0,
                },
            )

        except errors.ServerError as error:
            last_error = error

            error_text = str(error)

            if (
                "503" not in error_text
                and "UNAVAILABLE" not in error_text
            ):
                raise

            print(
                "[건지니 Final Judge 503] "
                f"{model_name} -> 다음 모델 시도"
            )

    raise last_error


class GenericJudgement(BaseModel):
    verdict: Literal[
        "추천",
        "확인 필요",
        "기다리기",
        "비추천",
    ]

    recommendation_score: float = Field(
        ge=1.0,
        le=5.0,
        description="구매 추천 점수. 1.0~5.0점, 0.5점 단위"
    )

    summary: str

    reasons: list[str] = Field(
        default_factory=list
    )

    matched_conditions: list[str] = Field(
        default_factory=list
    )

    unmatched_conditions: list[str] = Field(
        default_factory=list
    )

    uncertainties: list[str] = Field(
        default_factory=list
    )

    seller_questions: list[str] = Field(
        default_factory=list
    )


def judge_generic_listing(
    conditions: dict,
    item: dict,
    listing_analysis: dict,
    rule_result: dict,
):
    context = {
        "user_conditions": conditions,
        "item": item,
        "listing_analysis": listing_analysis,
        "rule_result": rule_result,
    }

    prompt = f"""
너는 중고거래 구매 판단을 돕는 Final Judge Agent다.

특정 상품군에 한정하지 않는다.
노트북, 가구, 스포츠용품, 의류 등
어떤 중고상품에도 동일한 판단 원칙을 적용한다.

아래 정보만 근거로 판단한다.

{json.dumps(
    context,
    ensure_ascii=False,
    indent=2
)}

중요 규칙:

1. 제공되지 않은 사실은 추측하지 않는다.

2. seller_claims는 판매자의 주장일 뿐
   검증된 사실로 취급하지 않는다.

3. unknown에 있는 정보가 구매 판단에 중요하면
   uncertainties와 seller_questions에 반영한다.

4. risk_flags가 있다면 판단에 반영한다.

5. Hard Condition이 명확히 실패했다면
   추천으로 판정하지 않는다.

6. Hard Condition이 확인되지 않았다면
   충족한 것으로 가정하지 않는다.

7. Preference는 필수조건이 아니다.
   일부 Preference를 만족하지 않는다는 이유만으로
   자동 비추천하지 않는다.

8. 사용자의 purpose가 있다면
   해당 목적에 적합한지를 근거 범위 안에서 고려한다.

9. 상품 종류에 대한 일반 상식으로
   판매글에 없는 정보를 만들어내지 않는다.

판정 기준:

추천:
필수조건을 충족하고,
중대한 위험이나 핵심 불확실성이 적은 경우.

확인 필요:
구매 가능성이 있지만
핵심 정보가 없거나 판매자 확인이 필요한 경우.

기다리기:
필수조건 위반은 없지만
사용 목적이나 주요 선호와의 적합도가 낮아
더 나은 매물을 기다리는 것이 합리적인 경우.

비추천:
명확한 필수조건 위반이나
중대한 위험 요소가 확인된 경우.

추천 점수 기준:

최종 판단과 추천 근거, 비추천 근거,
위험 요소, 불확실성을 종합하여
1.0~5.0점 사이의 recommendation_score를 정한다.

점수는 0.5점 단위로만 작성한다.

5.0:
사용자 조건과 목적에 매우 잘 맞고,
중대한 위험이나 불확실성이 거의 없음.

4.0~4.5:
전반적으로 추천할 만하지만
일부 확인사항이나 경미한 단점이 있음.

3.0~3.5:
구매 가능성은 있으나
확인해야 할 정보나 단점이 꽤 있음.

2.0~2.5:
조건 적합성이 낮거나
위험 요소가 커서 적극 추천하기 어려움.

1.0~1.5:
명확한 Hard Condition 위반이나
중대한 위험으로 구매를 권하기 어려움.

추천 근거만으로 점수를 높이지 말고,
risk_flags, uncertainties,
unmatched_conditions,
Hard Condition 실패 여부도 반드시 함께 고려한다.

recommendation_score는
verdict와 서로 모순되지 않아야 한다.

"""

    response = _generate_judgement(
        prompt
    )

    if response.parsed:
        return response.parsed.model_dump()

    return (
        GenericJudgement
        .model_validate_json(
            response.text
        )
        .model_dump()
    )