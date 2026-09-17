import hashlib
import json
import sqlite3
from datetime import datetime, timezone
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent

DB_PATH = (
    BASE_DIR
    / "data"
    / "agent.db"
)

ANALYSIS_VERSION = "generic-v1"


def _connect():
    DB_PATH.parent.mkdir(
        parents=True,
        exist_ok=True,
    )

    connection = sqlite3.connect(
        DB_PATH
    )

    connection.row_factory = (
        sqlite3.Row
    )

    return connection


def init_enrichment_db():
    with _connect() as connection:
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS
            listing_enrichments (
                listing_id TEXT PRIMARY KEY,

                source_hash TEXT NOT NULL,

                analysis_version TEXT NOT NULL,

                status TEXT NOT NULL,

                summary TEXT,

                attributes_json TEXT NOT NULL
                    DEFAULT '[]',

                seller_claims_json TEXT NOT NULL
                    DEFAULT '[]',

                condition_observations_json TEXT NOT NULL
                    DEFAULT '[]',

                unknown_json TEXT NOT NULL
                    DEFAULT '[]',

                risk_flags_json TEXT NOT NULL
                    DEFAULT '[]',

                updated_at TEXT NOT NULL,

                error TEXT
            )
            """
        )

        connection.execute(
            """
            CREATE INDEX IF NOT EXISTS
            idx_listing_enrichments_status
            ON listing_enrichments(status)
            """
        )

        connection.execute(
            """
            CREATE INDEX IF NOT EXISTS
            idx_listing_enrichments_source_hash
            ON listing_enrichments(source_hash)
            """
        )


def make_source_hash(
    item: dict
):
    """
    매물 원문이 바뀌었는지 판단하는 해시.

    상품명/설명 등 원본이 변경되면
    해시가 달라지고 재분석 대상이 된다.
    """

    source = {
        "category":
            item.get("category"),

        "title":
            item.get("title"),

        "description":
            item.get("description"),

        "price":
            item.get("price"),

        "location":
            item.get("location"),
    }

    raw = json.dumps(
        source,
        ensure_ascii=False,
        sort_keys=True,
        separators=(",", ":"),
    )

    return hashlib.sha256(
        raw.encode("utf-8")
    ).hexdigest()


def _json_dump(value):
    return json.dumps(
        value or [],
        ensure_ascii=False,
    )


def _json_load(value):
    if not value:
        return []

    try:
        return json.loads(value)

    except json.JSONDecodeError:
        return []


def save_enrichment(
    item: dict,
    analysis: dict,
):
    """
    정상적으로 분석된 결과 저장.
    """

    init_enrichment_db()

    listing_id = item["id"]

    source_hash = make_source_hash(
        item
    )

    updated_at = (
        datetime.now(
            timezone.utc
        ).isoformat()
    )

    with _connect() as connection:
        connection.execute(
            """
            INSERT INTO
            listing_enrichments (
                listing_id,
                source_hash,
                analysis_version,
                status,
                summary,
                attributes_json,
                seller_claims_json,
                condition_observations_json,
                unknown_json,
                risk_flags_json,
                updated_at,
                error
            )
            VALUES (
                ?, ?, ?, ?, ?, ?,
                ?, ?, ?, ?, ?, ?
            )

            ON CONFLICT(listing_id)
            DO UPDATE SET
                source_hash =
                    excluded.source_hash,

                analysis_version =
                    excluded.analysis_version,

                status =
                    excluded.status,

                summary =
                    excluded.summary,

                attributes_json =
                    excluded.attributes_json,

                seller_claims_json =
                    excluded.seller_claims_json,

                condition_observations_json =
                    excluded.condition_observations_json,

                unknown_json =
                    excluded.unknown_json,

                risk_flags_json =
                    excluded.risk_flags_json,

                updated_at =
                    excluded.updated_at,

                error =
                    excluded.error
            """,
            (
                listing_id,
                source_hash,
                ANALYSIS_VERSION,
                "ready",
                analysis.get(
                    "summary"
                ),
                _json_dump(
                    analysis.get(
                        "attributes"
                    )
                ),
                _json_dump(
                    analysis.get(
                        "seller_claims"
                    )
                ),
                _json_dump(
                    analysis.get(
                        "condition_observations"
                    )
                ),
                _json_dump(
                    analysis.get(
                        "unknown"
                    )
                ),
                _json_dump(
                    analysis.get(
                        "risk_flags"
                    )
                ),
                updated_at,
                None,
            ),
        )


def save_enrichment_error(
    item: dict,
    error: str,
):
    """
    분석 실패 자체도 기록한다.
    """

    init_enrichment_db()

    updated_at = (
        datetime.now(
            timezone.utc
        ).isoformat()
    )

    with _connect() as connection:
        connection.execute(
            """
            INSERT INTO
            listing_enrichments (
                listing_id,
                source_hash,
                analysis_version,
                status,
                updated_at,
                error
            )
            VALUES (
                ?, ?, ?, ?, ?, ?
            )

            ON CONFLICT(listing_id)
            DO UPDATE SET
                source_hash =
                    excluded.source_hash,

                analysis_version =
                    excluded.analysis_version,

                status =
                    excluded.status,

                updated_at =
                    excluded.updated_at,

                error =
                    excluded.error
            """,
            (
                item["id"],
                make_source_hash(item),
                ANALYSIS_VERSION,
                "error",
                updated_at,
                str(error),
            ),
        )


def get_enrichment(
    listing_id: str
):
    init_enrichment_db()

    with _connect() as connection:
        row = connection.execute(
            """
            SELECT *
            FROM listing_enrichments
            WHERE listing_id = ?
            """,
            (listing_id,),
        ).fetchone()

    if row is None:
        return None

    return {
        "listing_id":
            row["listing_id"],

        "source_hash":
            row["source_hash"],

        "analysis_version":
            row["analysis_version"],

        "status":
            row["status"],

        "summary":
            row["summary"],

        "attributes":
            _json_load(
                row[
                    "attributes_json"
                ]
            ),

        "seller_claims":
            _json_load(
                row[
                    "seller_claims_json"
                ]
            ),

        "condition_observations":
            _json_load(
                row[
                    "condition_observations_json"
                ]
            ),

        "unknown":
            _json_load(
                row[
                    "unknown_json"
                ]
            ),

        "risk_flags":
            _json_load(
                row[
                    "risk_flags_json"
                ]
            ),

        "updated_at":
            row["updated_at"],

        "error":
            row["error"],
    }


def is_enrichment_fresh(
    item: dict
):
    """
    현재 매물 원문과 저장된 분석 결과가
    동일 버전인지 확인한다.
    """

    enrichment = get_enrichment(
        item["id"]
    )

    if enrichment is None:
        return False

    if enrichment["status"] != "ready":
        return False

    if (
        enrichment[
            "analysis_version"
        ]
        != ANALYSIS_VERSION
    ):
        return False

    return (
        enrichment["source_hash"]
        == make_source_hash(item)
    )
