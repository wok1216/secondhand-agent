import json, re, logging
from time import perf_counter

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from graphs.evaluation_graph import run_evaluation_graph
from graphs.search_graph import run_search_graph
from services.catalog import get_catalog_items, get_catalog_item_by_id
from agents.search_structuring import structure_generic_query

logger = logging.getLogger("uvicorn.error")

app = FastAPI(
    title="건지니 API",
    version="2.0.0",
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
    profile_keywords: list[str] = Field(default_factory=list)
    profile_preferences: list[dict] = Field(default_factory=list)


class JudgeRequest(BaseModel):
    conditions: dict


@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "geonjini-backend",
    }


@app.get("/api/items")
def get_items():
    items = get_catalog_items()
    return {
        "count": len(items),
        "items": items,
    }


@app.get("/api/items/{item_id}")
def get_item(item_id: str):
    item = get_catalog_item_by_id(item_id)

    if item is None:
        raise HTTPException(
            status_code=404,
            detail="매물을 찾을 수 없습니다.",
        )

    return item


@app.post("/api/structure")
def structure_search(request: NaturalSearchRequest):
    conditions = structure_generic_query(request.query)

    return {
        "query": request.query,
        "conditions": conditions,
    }


@app.post("/api/natural-search")
def natural_search(request: NaturalSearchRequest):
    started_at = perf_counter()

    graph_result = run_search_graph(
        query=request.query,
        profile_keywords=request.profile_keywords,
        profile_preferences=request.profile_preferences,
    )

    structured_query = graph_result["structured_query"]
    results = graph_result["results"]
    items = graph_result["items"]

    response_results = [
        {
            "id": item.get("id"),
            "category": item.get("category"),
            "subcategory": item.get("subcategory"),
            "title": item.get("title"),
            "description": item.get("description"),
            "price": item.get("price"),
            "location": item.get("location"),
            "distance_km": item.get("distance_km"),
            "score": item.get("score"),
            "reasons": item.get("reasons", []),
        }
        for item in results
    ]

    total_time_ms = round((perf_counter() - started_at) * 1000, 2)

    logger.info(
        "[Search] total=%sms llm_calls=%s results=%s",
        total_time_ms,
        graph_result.get("llm_agent_calls", 0),
        len(response_results),
    )

    return {
        "query": request.query,
        "conditions": structured_query,
        "results": response_results,
        "meta": {
            "pipeline": "generic-v3-langgraph",
            "orchestrator": "langgraph",
            "llm_agent_calls": graph_result.get("llm_agent_calls", 0),
            "trace": graph_result.get("trace", []),
            "timings_ms": graph_result.get("timings", {}),
            "total_time_ms": total_time_ms,
            "total_items": len(items),
            "searchable_items": len(items),
            "result_count": len(response_results),
        },
    }


@app.post("/api/items/{item_id}/evaluate")
def evaluate_item(item_id: str, request: JudgeRequest):
    started_at = perf_counter()

    item = get_catalog_item_by_id(item_id)

    if item is None:
        raise HTTPException(
            status_code=404,
            detail="매물을 찾을 수 없습니다.",
        )

    graph_result = run_evaluation_graph(
        item=item,
        conditions=request.conditions,
    )

    total_time_ms = round((perf_counter() - started_at) * 1000, 2)

    logger.info(
        "[Evaluation] item=%s total=%sms llm_calls=%s reviewed=%s",
        item_id,
        total_time_ms,
        graph_result.get("llm_agent_calls", 0),
        graph_result.get("needs_review", False),
    )

    return {
        "item_id": item_id,
        "final": graph_result["final_result"],
        "meta": {
            "reviewed": graph_result.get("needs_review", False),
            "orchestrator": "langgraph",
            "llm_agent_calls": graph_result.get("llm_agent_calls", 0),
            "enrichment_cache_hit": graph_result.get("enrichment_cache_hit", False),
            "trace": graph_result.get("trace", []),
            "timings_ms": graph_result.get("timings", {}),
            "total_time_ms": total_time_ms,
        },
        "agents": {
            "listing_analysis": graph_result.get("listing_analysis"),
            "rule_result": graph_result.get("rule_result"),
            "final_judge": graph_result.get("judgement"),
            "reviewer": graph_result.get("review"),
        },
    }
