import json
import os
from typing import Literal

from dotenv import load_dotenv
from google import genai
from pydantic import BaseModel, Field


load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
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
"""

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt,
        config={
            "response_mime_type":
                "application/json",
            "response_schema":
                GenericReview,
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