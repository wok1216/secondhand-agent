import json
import re

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel, Field

from services.catalog import get_catalog_items, get_catalog_item_by_id
from services.enrichment_store import get_enrichment, is_enrichment_fresh
from services.search import search_generic_listings, score_generic_listing

from agents.search_structuring import structure_generic_query
from agents.final_judge import judge_generic_listing
from agents.reviewer import review_generic_judgement
from agents.listing_enrichment import analyze_generic_listing

app = FastAPI(
    title="건지니 API",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NaturalSearchRequest(BaseModel):
    query: str

    profile_keywords: list[str] = Field(
        default_factory=list
    )

    profile_preferences: list[dict] = Field(
        default_factory=list
    )


class JudgeRequest(BaseModel):
    conditions: dict


@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "geonjini-backend"
    }


@app.get("/api/items")
def get_items():
    items = get_catalog_items()

    return {
        "count": len(items),
        "items": items
    }


@app.get("/api/items/{item_id}")
def get_item(item_id: str):
    item = get_catalog_item_by_id(item_id)

    if item is None:
        raise HTTPException(
            status_code=404,
            detail="매물을 찾을 수 없습니다."
        )

    return item


@app.post("/api/structure")
def structure_search(request: NaturalSearchRequest):
    conditions = structure_generic_query(
        request.query
    )

    return {
        "query": request.query,
        "conditions": conditions
    }


@app.post("/api/natural-search")
def natural_search(
    request: NaturalSearchRequest
):
    # 사용자 자연어 > 검색 조건
    structured_query = (
        structure_generic_query(
            request.query
        )
    )

    structured_query["profile_keywords"] = (
        request.profile_keywords
    )

    structured_query["profile_preferences"] = (
        request.profile_preferences
    )

    # 플랫폼의 전체 원본 매물
    items = get_catalog_items()

    # 모든 매물을 공통 정보로 Rule 기반 검색
    results = search_generic_listings(
        items=items,
        query=structured_query,
        limit=10,
    )

    response_results = []

    for item in results:
        response_results.append({
            "id":
                item.get("id"),

            "category":
                item.get("category"),

            "subcategory":
                item.get("subcategory"),

            "title":
                item.get("title"),

            "description":
                item.get("description"),

            "price":
                item.get("price"),

            "location":
                item.get("location"),

            "distance_km":
                item.get("distance_km"),

            "score":
                item.get("score", 0),

            "reasons":
                item.get("reasons", []),
        })

    return {
        "query":
            request.query,

        "conditions":
            structured_query,

        "results":
            results,

        "meta": {
            "pipeline":
                "generic-v2",

            "total_items":
                len(items),

            "searchable_items":
                len(items),

            "result_count":
                len(response_results),
        },
    }

@app.post("/api/items/{item_id}/evaluate")
def evaluate_item(
    item_id: str,
    request: JudgeRequest
):
    # 1. 원본 매물 조회
    item = get_catalog_item_by_id(
        item_id
    )

    if item is None:
        raise HTTPException(
            status_code=404,
            detail="매물을 찾을 수 없습니다."
        )

    # 2. 최신 구조화 분석 여부 확인
    if is_enrichment_fresh(item):
        analysis = get_enrichment(
            item["id"]
        )

    else:
        analysis = analyze_generic_listing(
            item
        )

    analysis = analysis or {}

    # 판단
    listing_analysis = {
        "summary": analysis.get("summary") or "",
        "attributes": analysis.get("attributes", []),
        "seller_claims": analysis.get("seller_claims", []),
        "condition_observations": analysis.get(
            "condition_observations",
            [],
        ),
        "unknown": analysis.get("unknown", []),
        "risk_flags": analysis.get("risk_flags", []),
    }

    # 4. 범용 Rule Engine
    rule_result = score_generic_listing(
        item=item,
        analysis=listing_analysis,
        query=request.conditions,
        exclude_on_hard=False,
        defer_unknown_hard=False,
    )

    # 5. Final Judge
    judgement = judge_generic_listing(
        conditions=request.conditions,
        item=item,
        listing_analysis=listing_analysis,
        rule_result=rule_result,
    )

    # 6. Reviewer
    # 불확실성/위험이 있을 때만 추가 검토하여 Gemini 호출을 절약한다.
    needs_review = (
        judgement.get("verdict") == "확인 필요"
        or bool(listing_analysis.get("risk_flags"))
        or bool(
            (rule_result or {})
            .get("rule_evaluation", {})
            .get("hard_unknowns", [])
        )
    )

    if needs_review:
        review = review_generic_judgement(
            conditions=request.conditions,
            item=item,
            listing_analysis=listing_analysis,
            rule_result=rule_result,
            original_judgement=judgement,
        )

        final_result = {
            "verdict":
                review["final_verdict"],
            "recommendation_score":
                review["recommendation_score"],
            "summary":
                review["final_summary"],
            "reasons":
                review["final_reasons"],
            "uncertainties":
                review["uncertainties"],
            "seller_questions":
                review["seller_questions"],
        }

    else:
        review = None

        final_result = {
            "verdict":
                judgement["verdict"],
            "recommendation_score":
                judgement["recommendation_score"],
            "summary":
                judgement["summary"],
            "reasons":
                judgement.get(
                    "reasons",
                    []
                ),
            "uncertainties":
                judgement.get(
                    "uncertainties",
                    []
                ),
            "seller_questions":
                judgement.get(
                    "seller_questions",
                    []
                ),
        }

    # 7. 최종 결과
    return {
        "item_id": item_id,
        "final": final_result,
        "meta": {
            "reviewed": needs_review,
        },
        "agents": {
            "listing_analysis": listing_analysis,
            "rule_result": rule_result,
            "final_judge": judgement,
            "reviewer": review,
        },
    }
