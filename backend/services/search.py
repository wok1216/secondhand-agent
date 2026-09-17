from typing import Any


# 검색 단계에서 플랫폼이 기본적으로 제공한다고 보는 공통 필드
UNIVERSAL_FIELDS = {
    "id",
    "category",
    "subcategory",
    "title",
    "description",
    "price",
    "location",
    "distance_km",
}


def build_search_document(
    item: dict,
    analysis: dict | None = None,
):
    document = {
        "id": item.get("id"),
        "category": item.get("category"),
        "subcategory": item.get("subcategory"),
        "title": item.get("title"),
        "description": item.get("description"),
        "price": item.get("price"),
        "location": item.get("location"),
        "distance_km": item.get("distance_km"),
        "metadata": item.get("metadata") or {},
        "attributes": {},
    }

    # 상세 평가에서만 사용
    if not analysis:
        return document

    for attribute in analysis.get(
        "attributes",
        []
    ):
        key = attribute.get("key")

        if not key:
            continue

        document["attributes"].setdefault(
            key,
            []
        )

        document["attributes"][key].append({
            "value":
                attribute.get("value"),

            "number_value":
                attribute.get("number_value"),

            "unit":
                attribute.get("unit"),

            "label":
                attribute.get("label"),

            "certainty":
                attribute.get("certainty"),

            "evidence":
                attribute.get("evidence"),
        })

    return document


def _normalize_text(value):
    if value is None:
        return ""

    return str(
        value
    ).strip().lower()


def _to_number(value):
    if value is None:
        return None

    if isinstance(
        value,
        (int, float)
    ):
        return float(value)

    try:
        return float(
            str(value)
            .replace(",", "")
            .strip()
        )

    except (
        TypeError,
        ValueError
    ):
        return None


def get_field_values(
    document: dict,
    key: str,
):
    if key in UNIVERSAL_FIELDS:
        value = document.get(
            key
        )

        if value is None:
            return []

        return [{
            "value": value,
            "number_value":
                _to_number(value),
            "certainty": "명시",
            "source": "system",
        }]

    attributes = document.get(
        "attributes",
        {}
    )

    return [
        {
            **value,
            "source": "description",
        }
        for value in attributes.get(
            key,
            []
        )
    ]


def match_condition(
    document: dict,
    condition: dict,
):
    key = condition.get(
        "key"
    )

    operator = condition.get(
        "operator"
    )

    expected_value = condition.get(
        "value"
    )

    expected_number = condition.get(
        "number_value"
    )

    expected_values = condition.get(
        "values"
    ) or []

    actual_values = get_field_values(
        document,
        key,
    )

    if not actual_values:
        return {
            "status": "unknown",
            "matched_value": None,
            "reason":
                f"{condition.get('label', key)} 정보 없음",
        }

    # 숫자 비교
    if operator in {
        "<=",
        ">=",
    }:
        target = expected_number

        if target is None:
            target = _to_number(
                expected_value
            )

        if target is None:
            return {
                "status": "unknown",
                "matched_value": None,
                "reason":
                    f"{condition.get('label', key)} 비교 기준 확인 불가",
            }

        comparable_values = []

        for actual in actual_values:
            number = actual.get(
                "number_value"
            )

            if number is None:
                number = _to_number(
                    actual.get("value")
                )

            if number is not None:
                comparable_values.append(
                    number
                )

        if not comparable_values:
            return {
                "status": "unknown",
                "matched_value": None,
                "reason":
                    f"{condition.get('label', key)} 수치 정보 없음",
            }

        if operator == "<=":
            matched = [
                value
                for value in comparable_values
                if value <= target
            ]

        else:
            matched = [
                value
                for value in comparable_values
                if value >= target
            ]

        if matched:
            return {
                "status": "match",
                "matched_value": matched[0],
                "reason":
                    f"{condition.get('label', key)} 조건 충족",
            }

        return {
            "status": "fail",
            "matched_value":
                comparable_values[0],
            "reason":
                f"{condition.get('label', key)} 조건 미충족",
        }

    # 정확히 일치
    if operator == "==":
        expected = _normalize_text(
            expected_value
        )

        for actual in actual_values:
            actual_text = _normalize_text(
                actual.get("value")
            )

            if actual_text == expected:
                return {
                    "status": "match",
                    "matched_value":
                        actual.get("value"),
                    "reason":
                        f"{condition.get('label', key)} 조건 충족",
                }

        return {
            "status": "fail",
            "matched_value":
                actual_values[0].get(
                    "value"
                ),
            "reason":
                f"{condition.get('label', key)} 조건 미충족",
        }

    # 문자열 포함
    if operator == "contains":
        expected = _normalize_text(
            expected_value
        )

        for actual in actual_values:
            actual_text = _normalize_text(
                actual.get("value")
            )

            if (
                expected in actual_text
                or actual_text in expected
            ):
                return {
                    "status": "match",
                    "matched_value":
                        actual.get("value"),
                    "reason":
                        f"{condition.get('label', key)} 조건 충족",
                }

        return {
            "status": "fail",
            "matched_value":
                actual_values[0].get(
                    "value"
                ),
            "reason":
                f"{condition.get('label', key)} 조건 미충족",
        }

    # 여러 후보 중 하나
    if operator == "in":
        candidates = (
            expected_values
            if expected_values
            else [expected_value]
        )

        normalized_candidates = [
            _normalize_text(value)
            for value in candidates
            if value is not None
        ]

        for actual in actual_values:
            actual_text = _normalize_text(
                actual.get("value")
            )

            for candidate in (
                normalized_candidates
            ):
                if (
                    candidate in actual_text
                    or actual_text in candidate
                ):
                    return {
                        "status": "match",
                        "matched_value":
                            actual.get("value"),
                        "reason":
                            f"{condition.get('label', key)} 조건 충족",
                    }

        return {
            "status": "fail",
            "matched_value":
                actual_values[0].get(
                    "value"
                ),
            "reason":
                f"{condition.get('label', key)} 조건 미충족",
        }

    return {
        "status": "unknown",
        "matched_value": None,
        "reason":
            f"지원하지 않는 연산자: {operator}",
    }

def score_keywords(
    document: dict,
    keywords: list[str],
):
    if not keywords:
        return 0, []

    title = _normalize_text(
        document.get("title")
    )

    category = _normalize_text(
        document.get("category")
    )

    subcategory = _normalize_text(
        document.get("subcategory")
    )

    description = _normalize_text(
        document.get("description")
    )

    metadata_text = _normalize_text(
        " ".join(
            f"{key} {value}"
            for key, value in (
                document.get("metadata") or {}
            ).items()
        )
    )

    score = 0
    matched = []

    for keyword in keywords:
        word = _normalize_text(
            keyword
        )

        if not word:
            continue

        if word in title:
            score += 12
            matched.append(
                f"상품명: {keyword}"
            )

        elif word in subcategory:
            score += 10
            matched.append(
                f"세부 카테고리: {keyword}"
            )

        elif word in category:
            score += 8
            matched.append(
                f"카테고리: {keyword}"
            )

        elif word in description:
            score += 5
            matched.append(
                f"판매글: {keyword}"
            )

        elif word in metadata_text:
            score += 3
            matched.append(
                f"상품 정보: {keyword}"
            )

    return score, matched

def score_profile_keywords(
    document: dict,
    keywords: list[str],
):
    """
    사용자 프로필 키워드는
    검색 결과를 제외시키지 않고
    순위에만 가중치를 준다.
    """

    if not keywords:
        return 0, []

    metadata_text = _normalize_text(
        " ".join(
            f"{key} {value}"
            for key, value in (
                document.get("metadata") or {}
            ).items()
        )
    )

    searchable_text = " ".join([
        _normalize_text(
            document.get("category")
        ),
        _normalize_text(
            document.get("subcategory")
        ),
        _normalize_text(
            document.get("title")
        ),
        _normalize_text(
            document.get("description")
        ),
        metadata_text,
    ])

    score = 0
    matches = []

    for keyword in keywords:
        word = _normalize_text(
            keyword
        )

        if not word:
            continue

        matched = False
        added_score = 0

        # 프로필 문구 전체가 일치
        if word in searchable_text:
            matched = True
            added_score = 3

        else:
            # "대학교 수업"처럼 문장형 프로필은
            # 의미 있는 단어 단위로 한 번 더 비교
            tokens = [
                token
                for token in word.split()
                if len(token) >= 2
            ]

            token_matches = []

            for token in tokens:
                if token in searchable_text:
                    token_matches.append(token)
                    continue

                # "대학생" → "대학"처럼
                # 앞부분 핵심어가 매물 설명에 있는 경우도 인정
                for length in range(
                    len(token) - 1,
                    1,
                    -1,
                ):
                    prefix = token[:length]

                    if prefix in searchable_text:
                        token_matches.append(prefix)
                        break

            if token_matches:
                matched = True
                added_score = min(
                    len(token_matches),
                    2,
                )

        if matched:
            score += added_score
            matches.append(
                keyword
            )

    score = min(
        score,
        12,
    )

    return score, matches

def score_generic_listing(
    item: dict,
    query: dict,
    analysis: dict | None = None,
    exclude_on_hard: bool = True,
    defer_unknown_hard: bool = False,
):
    """
    검색 시:
        analysis=None
        defer_unknown_hard=True

    상세 평가 시:
        analysis=Listing Agent 결과
        defer_unknown_hard=False
    """

    document = build_search_document(
        item,
        analysis,
    )

    score = 0

    hard_matches = []
    hard_failures = []
    hard_unknowns = []
    pending_hard_conditions = []

    preference_matches = []
    preference_misses = []
    preference_unknowns = []

    # 1. 검색 키워드
    query_keywords = query.get(
        "keywords",
        []
    )

    keyword_score, keyword_matches = (
        score_keywords(
            document,
            query_keywords,
        )
    )

    # keywords는 상품 자체를 식별하는 핵심 검색어다.
    # 사용자가 명시한 핵심 상품어가 있는데
    # 매물 어디에도 등장하지 않으면 검색 후보에서 제외한다.
    if (
        query_keywords
        and not keyword_matches
    ):
        return None

    score += keyword_score

    # 2. 카테고리
    requested_category = query.get(
        "category"
    )

    category_match = False

    if requested_category:
        target_category = _normalize_text(
            requested_category
        )

        item_category = _normalize_text(
            item.get("category")
        )

        item_subcategory = _normalize_text(
            item.get("subcategory")
        )

        item_title = _normalize_text(
            item.get("title")
        )

        category_match = any(
            target_category in value
            or value in target_category
            for value in [
                item_category,
                item_subcategory,
                item_title,
            ]
            if value
        )

        if category_match:
            score += 12

        else:
            return None

    # 3. Hard Conditions
    for condition in query.get(
        "hard_conditions",
        []
    ):
        result = match_condition(
            document,
            condition,
        )

        record = {
            "condition": condition,
            "matched_value":
                result.get(
                    "matched_value"
                ),
            "reason":
                result.get(
                    "reason"
                ),
        }

        if result["status"] == "match":
            hard_matches.append(
                record
            )

            score += 20

        elif result["status"] == "fail":
            hard_failures.append(
                record
            )

        else:
            key = condition.get(
                "key"
            )

            # 검색 단계에서는
            # 플랫폼 기본 정보가 아닌 세부 속성을
            # 모른다고 해서 탈락시키지 않는다.
            if (
                defer_unknown_hard
                and key not in UNIVERSAL_FIELDS
            ):
                pending_hard_conditions.append(
                    record
                )

            else:
                hard_unknowns.append(
                    record
                )

    hard_pass = (
        not hard_failures
        and not hard_unknowns
    )

    if (
        exclude_on_hard
        and not hard_pass
    ):
        return None

    # 4. 검색에서 파악한 선호 조건
    preferences = list(
        query.get(
            "preferences",
            []
        )
    )

    # 추후 사용자 프로필에서 들어오는
    # 구조화된 선호도도 같은 방식으로 처리 가능
    preferences.extend(
        query.get(
            "profile_preferences",
            []
        )
    )

    for preference in preferences:
        result = match_condition(
            document,
            preference,
        )

        record = {
            "condition": preference,
            "matched_value":
                result.get(
                    "matched_value"
                ),
            "reason":
                result.get(
                    "reason"
                ),
        }

        if result["status"] == "match":
            weight = preference.get(
                "weight",
                10,
            )

            score += weight

            preference_matches.append(
                record
            )

        elif result["status"] == "fail":
            preference_misses.append(
                record
            )

        else:
            preference_unknowns.append(
                record
            )
    
    # 5. 사용자 프로필의 단순 키워드 선호
    profile_score, profile_matches = (
        score_profile_keywords(
            document,
            query.get(
                "profile_keywords",
                []
            ),
        )
    )

    score += profile_score

    # 6. 추천 근거
    reasons = []

    reasons.extend(
        item["reason"]
        for item in hard_matches
    )

    reasons.extend(
        item["reason"]
        for item in preference_matches
    )

    reasons.extend(
        f"검색 관련성: {match}"
        for match in keyword_matches
    )

    reasons.extend(
        f"사용자 선호: {match}"
        for match in profile_matches
    )

    return {
        **item,

        "score":
            score,

        "reasons":
            reasons,

        "rule_evaluation": {
            "hard_pass":
                hard_pass,

            "hard_matches":
                hard_matches,

            "hard_failures":
                hard_failures,

            "hard_unknowns":
                hard_unknowns,

            "pending_hard_conditions":
                pending_hard_conditions,

            "preference_matches":
                preference_matches,

            "preference_misses":
                preference_misses,

            "preference_unknowns":
                preference_unknowns,

            "keyword_matches":
                keyword_matches,

            "profile_matches":
                profile_matches,

            "category_match":
                category_match,
        },

        "listing_analysis":
            analysis,
    }


def search_generic_listings(
    items: list[dict],
    query: dict,
    limit: int = 10,
):
    """
    모든 원본 매물을 대상으로 검색한다.

    검색 단계에서는 Gemini 분석 결과를
    필요로 하지 않는다.
    """

    results = []

    for item in items:
        scored = score_generic_listing(
            item=item,
            query=query,
            analysis=None,
            exclude_on_hard=True,
            defer_unknown_hard=True,
        )

        if scored is not None:
            results.append(
                scored
            )

    results.sort(
        key=lambda item:
            item["score"],
        reverse=True,
    )

    return results[:limit]