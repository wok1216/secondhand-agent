from time import perf_counter
from typing import Any, TypedDict

from langgraph.graph import StateGraph, START, END

from services.enrichment_store import (
    get_enrichment,
    is_enrichment_fresh,
)
from services.search import score_generic_listing

from agents.listing_enrichment import analyze_generic_listing
from agents.final_judge import judge_generic_listing
from agents.reviewer import review_generic_judgement


class EvaluationState(TypedDict, total=False):
    item: dict[str, Any]
    conditions: dict[str, Any]

    listing_analysis: dict[str, Any]
    rule_result: dict[str, Any]
    judgement: dict[str, Any]

    needs_review: bool
    review: dict[str, Any] | None

    final_result: dict[str, Any]
    trace: list[str]

    timings: dict[str, float]

    llm_agent_calls: int
    enrichment_cache_hit: bool

def _record_timing(
    state: EvaluationState,
    node_name: str,
    started_at: float,
):
    timings = dict(
        state.get("timings", {})
    )

    timings[node_name] = round(
        (
            perf_counter()
            - started_at
        ) * 1000,
        2,
    )

    return timings

def enrichment_node(
    state: EvaluationState,
) -> dict:
    started_at = perf_counter()

    item = state["item"]

    cache_hit = is_enrichment_fresh(
        item
    )

    if cache_hit:
        analysis = get_enrichment(
            item["id"]
        )

        llm_agent_calls = state.get(
            "llm_agent_calls",
            0,
        )

    else:
        analysis = analyze_generic_listing(
            item
        )

        llm_agent_calls = (
            state.get(
                "llm_agent_calls",
                0,
            )
            + 1
        )

    analysis = analysis or {}

    listing_analysis = {
        "summary":
            analysis.get("summary") or "",

        "attributes":
            analysis.get("attributes", []),

        "seller_claims":
            analysis.get("seller_claims", []),

        "condition_observations":
            analysis.get(
                "condition_observations",
                [],
            ),

        "unknown":
            analysis.get("unknown", []),

        "risk_flags":
            analysis.get("risk_flags", []),
    }

    return {
        "listing_analysis":
            listing_analysis,

        "enrichment_cache_hit":
            cache_hit,

        "llm_agent_calls":
            state.get(
                "llm_agent_calls",
                0,
            )
            + 1,

        "trace":
            state.get("trace", [])
            + ["listing_enrichment"],

        "timings":
            _record_timing(
                state,
                "listing_enrichment",
                started_at,
            ),
    }

def rule_evaluation_node(
    state: EvaluationState,
) -> dict:
    started_at = perf_counter()

    rule_result = score_generic_listing(
        item=state["item"],
        analysis=state["listing_analysis"],
        query=state["conditions"],
        exclude_on_hard=False,
        defer_unknown_hard=False,
    )

    return {
        "rule_result":
            rule_result,

        "trace":
            state.get("trace", [])
            + ["rule_evaluation"],

        "timings": _record_timing(
            state,
            "rule_evaluation",
            started_at,
        ),
    }


def final_judge_node(state: EvaluationState) -> dict:
    started_at = perf_counter()

    item = state["item"]
    conditions = state["conditions"]
    listing_analysis = state["listing_analysis"]
    rule_result = state["rule_result"]

    judgement = judge_generic_listing(
        conditions=conditions,
        item=item,
        listing_analysis=listing_analysis,
        rule_result=rule_result,
    )

    fallback_used = judgement.get("_fallback_used", False)

    needs_review = (
        not fallback_used
        and (
            judgement.get("verdict") == "확인 필요"
            or bool(listing_analysis.get("risk_flags"))
            or bool(
                (rule_result or {})
                .get("rule_evaluation", {})
                .get("hard_unknowns", [])
            )
        )
    )

    return {
        "judgement": judgement,
        "needs_review": needs_review,
        "llm_agent_calls": state.get("llm_agent_calls", 0) + 1,
        "trace": state.get("trace", []) + ["final_judge"],
        "timings": _record_timing(
            state,
            "final_judge",
            started_at,
        ),
    }

def route_after_judge(
    state: EvaluationState,
) -> str:
    if state.get("needs_review"):
        return "reviewer"

    return "finalize"


def reviewer_node(
    state: EvaluationState,
) -> dict:
    started_at = perf_counter()

    review = review_generic_judgement(
        conditions=state["conditions"],
        item=state["item"],
        listing_analysis=state[
            "listing_analysis"
        ],
        rule_result=state[
            "rule_result"
        ],
        original_judgement=state[
            "judgement"
        ],
    )

    return {
        "review":
            review,

        "llm_agent_calls":
            state.get(
                "llm_agent_calls",
                0,
            )
            + 1,

        "trace":
            state.get("trace", [])
            + ["reviewer"],

        "timings":
            _record_timing(
                state,
                "reviewer",
                started_at,
            ),
    }


def finalize_node(
    state: EvaluationState,
) -> dict:
    started_at = perf_counter()
    
    review = state.get("review")
    judgement = state["judgement"]

    if review:
        final_result = {
            "verdict":
                review["final_verdict"],

            "recommendation_score":
                review[
                    "recommendation_score"
                ],

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
        final_result = {
            "verdict":
                judgement["verdict"],

            "recommendation_score":
                judgement[
                    "recommendation_score"
                ],

            "summary":
                judgement["summary"],

            "reasons":
                judgement.get(
                    "reasons",
                    [],
                ),

            "uncertainties":
                judgement.get(
                    "uncertainties",
                    [],
                ),

            "seller_questions":
                judgement.get(
                    "seller_questions",
                    [],
                ),
        }

    return {
        "final_result":
            final_result,

        "trace":
            state.get("trace", [])
            + ["finalize"],

        "timings": _record_timing(
            state,
            "finalize",
            started_at,
        ),
    }


builder = StateGraph(
    EvaluationState
)

builder.add_node(
    "listing_enrichment",
    enrichment_node,
)

builder.add_node(
    "rule_evaluation",
    rule_evaluation_node,
)

builder.add_node(
    "final_judge",
    final_judge_node,
)

builder.add_node(
    "reviewer",
    reviewer_node,
)

builder.add_node(
    "finalize",
    finalize_node,
)


builder.add_edge(
    START,
    "listing_enrichment",
)

builder.add_edge(
    "listing_enrichment",
    "rule_evaluation",
)

builder.add_edge(
    "rule_evaluation",
    "final_judge",
)

builder.add_conditional_edges(
    "final_judge",
    route_after_judge,
    {
        "reviewer":
            "reviewer",

        "finalize":
            "finalize",
    },
)

builder.add_edge(
    "reviewer",
    "finalize",
)

builder.add_edge(
    "finalize",
    END,
)


evaluation_graph = (
    builder.compile()
)


def run_evaluation_graph(
    item: dict,
    conditions: dict,
):
    return evaluation_graph.invoke(
        {
            "item":
                item,

            "conditions":
                conditions,

            "trace":
                [],

            "timings":
                {},

            "llm_agent_calls":
                0,

            "enrichment_cache_hit":
                False,
        }
    )