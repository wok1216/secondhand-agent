import json
import os
from typing import Literal

from dotenv import load_dotenv
from google import genai
from google.genai import types
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

MODEL_NAME = "gemini-3.5-flash"


class GenericReview(BaseModel):
    review_status: Literal[
        "통과",
        "수정 필요",
    ]

    issues: list[str] = Field(
        default_factory=list
    )

    final_verdict: Literal[
        "추천",
        "확인 필요",
        "기다리기",
        "비추천",
    ]

    final_summary: str

    final_reasons: list[str] = Field(
        default_factory=list
    )

    uncertainties: list[str] = Field(
        default_factory=list
    )

    seller_questions: list[str] = Field(
        default_factory=list
    )

    recommendation_score: float = Field(
        ge=1.0,
        le=5.0,
        description=(
            "추천 근거와 비추천 근거를 종합한 "
            "1.0~5.0점 추천 점수"
        ),
    )


def review_generic_judgement(
    conditions: dict,
    item: dict,
    listing_analysis: dict,
    rule_result: dict,
    original_judgement: dict,
):
    context = {
        "user_conditions": conditions,
        "item": item,
        "listing_analysis": listing_analysis,
        "rule_result": rule_result,
        "original_judgement": original_judgement,
    }

    prompt = f"""
너는 중고거래 구매 판단 결과를 검토하는 Reviewer Agent다.

다음 판단이 주어진 정보에 근거했는지 검증하라.

{json.dumps(
    context,
    ensure_ascii=False,
    indent=2
)}

검토 기준:

- 판매글에 없는 사실을 만들어내지 않았는가
- 판매자의 주장을 사실로 단정하지 않았는가
- Hard Condition 결과와 최종 판정이 모순되지 않는가
- unknown과 risk_flags가 적절히 반영됐는가
- Preference를 필수조건처럼 취급하지 않았는가
- 상품 종류에 대한 일반적인 상식으로
  제공되지 않은 정보를 추론하지 않았는가
- 판매자에게 확인해야 할 사항이 빠지지 않았는가

문제가 없다면 원 판단을 유지한다.

문제가 있다면 제공된 근거 범위 안에서만
최종 결과를 수정한다.

추천 점수 검토 규칙:

1. Final Judge가 제시한 recommendation_score도 검토한다.

2. 최종 추천 근거와 비추천 근거,
   risk_flags, uncertainties,
   Hard Condition 충족 여부를 종합한다.

3. 필요하면 Final Judge의 점수를 수정한다.

4. recommendation_score는
   1.0~5.0 사이이며
   반드시 0.5점 단위로 작성한다.

5. 점수 기준:

5.0:
조건과 목적에 매우 잘 맞고
중대한 위험이나 불확실성이 거의 없음.

4.0~4.5:
전반적으로 추천하지만
경미한 단점이나 확인사항이 있음.

3.0~3.5:
구매 가능하지만
확인할 정보나 단점이 꽤 있음.

2.0~2.5:
적합성이 낮거나
위험 요소가 커서 적극 추천하기 어려움.

1.0~1.5:
Hard Condition 위반 또는
중대한 위험이 있음.

6. final_verdict와 recommendation_score가
   서로 모순되지 않도록 한다.

"""

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt,
        config={
            "response_mime_type":
                "application/json",
            "response_schema":
                GenericReview,
            "temperature":
                0.0,
        },
    )

    if response.parsed:
        return response.parsed.model_dump()

    return (
        GenericReview
        .model_validate_json(
            response.text
        )
        .model_dump()
    )