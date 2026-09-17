from typing import Any, TypedDict
from time import perf_counter

from langgraph.graph import StateGraph, START, END

from agents.search_structuring import (
    structure_generic_query,
)

from services.catalog import (
    get_catalog_items,
)

from services.search import (
    search_generic_listings,
)


class SearchState(TypedDict, total=False):
    query: str

    profile_keywords: list[str]
    profile_preferences: list[dict[str, Any]]

    structured_query: dict[str, Any]

    items: list[dict[str, Any]]
    results: list[dict[str, Any]]

    trace: list[str]
    timings: dict[str, float]

    llm_agent_calls: int


def _record_timing(
    state: SearchState,
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


def structure_query_node(
    state: SearchState,
) -> dict:
    started_at = perf_counter()

    structured_query = (
        structure_generic_query(
            state["query"]
        )
    )

    structured_query[
        "profile_keywords"
    ] = state.get(
        "profile_keywords",
        [],
    )

    structured_query[
        "profile_preferences"
    ] = state.get(
        "profile_preferences",
        [],
    )

    return {
        "structured_query":
            structured_query,

        "llm_agent_calls":
            state.get(
                "llm_agent_calls",
                0,
            )
            + 1,

        "trace":
            state.get("trace", [])
            + ["search_structuring"],

        "timings":
            _record_timing(
                state,
                "search_structuring",
                started_at,
            ),
    }


def load_catalog_node(
    state: SearchState,
) -> dict:
    started_at = perf_counter()

    items = get_catalog_items()

    return {
        "items":
            items,

        "trace":
            state.get("trace", [])
            + ["load_catalog"],

        "timings":
            _record_timing(
                state,
                "load_catalog",
                started_at,
            ),
    }


def rule_search_node(
    state: SearchState,
) -> dict:
    started_at = perf_counter()

    results = search_generic_listings(
        items=state["items"],
        query=state[
            "structured_query"
        ],
        limit=10,
    )

    return {
        "results":
            results,

        "trace":
            state.get("trace", [])
            + ["rule_search"],

        "timings":
            _record_timing(
                state,
                "rule_search",
                started_at,
            ),
    }


builder = StateGraph(
    SearchState
)

builder.add_node(
    "search_structuring",
    structure_query_node,
)

builder.add_node(
    "load_catalog",
    load_catalog_node,
)

builder.add_node(
    "rule_search",
    rule_search_node,
)


builder.add_edge(
    START,
    "search_structuring",
)

builder.add_edge(
    "search_structuring",
    "load_catalog",
)

builder.add_edge(
    "load_catalog",
    "rule_search",
)

builder.add_edge(
    "rule_search",
    END,
)


search_graph = builder.compile()


def run_search_graph(
    query: str,
    profile_keywords=None,
    profile_preferences=None,
):
    return search_graph.invoke(
        {
            "query":
                query,

            "profile_keywords":
                profile_keywords or [],

            "profile_preferences":
                profile_preferences or [],

            "trace":
                [],

            "timings":
                {},

            "llm_agent_calls":
                0,
        }
    )