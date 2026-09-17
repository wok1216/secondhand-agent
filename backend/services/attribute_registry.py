import re

SYSTEM_FIELDS = {
    "category": {
        "label": "카테고리",
        "type": "text",
    },
    "title": {
        "label": "상품명",
        "type": "text",
    },
    "price": {
        "label": "가격",
        "type": "number",
        "unit": "원",
    },
    "location": {
        "label": "거래위치",
        "type": "text",
    },
}

ATTRIBUTE_REGISTRY = {
    "brand": {
        "label": "브랜드",
        "type": "text",
        "aliases": [
            "브랜드",
            "제조사",
            "메이커",
        ],
    },

    "model_name": {
        "label": "모델명",
        "type": "text",
        "aliases": [
            "모델",
            "모델명",
            "제품명",
        ],
    },

    "condition": {
        "label": "상품 상태",
        "type": "text",
        "aliases": [
            "상태",
            "상품상태",
            "제품상태",
            "외관상태",
        ],
    },

    "functionality": {
        "label": "기능 상태",
        "type": "text",
        "aliases": [
            "작동상태",
            "기능상태",
            "정상작동",
        ],
    },

    "defect": {
        "label": "하자",
        "type": "text",
        "aliases": [
            "하자",
            "결함",
            "고장",
            "문제",
        ],
    },

    "usage_months": {
        "label": "사용 기간",
        "type": "number",
        "unit": "개월",
        "aliases": [
            "사용기간",
            "사용개월",
            "사용개월수",
        ],
    },

    "purchase_year": {
        "label": "구매 연도",
        "type": "number",
        "unit": "년",
        "aliases": [
            "구매연도",
            "구입연도",
        ],
    },

    "manufacture_year": {
        "label": "제조 연도",
        "type": "number",
        "unit": "년",
        "aliases": [
            "제조연도",
            "생산연도",
        ],
    },

    "weight_kg": {
        "label": "무게",
        "type": "number",
        "unit": "kg",
        "aliases": [
            "무게",
            "중량",
        ],
    },

    "width_cm": {
        "label": "너비",
        "type": "number",
        "unit": "cm",
        "aliases": [
            "너비",
            "폭",
        ],
    },

    "height_cm": {
        "label": "높이",
        "type": "number",
        "unit": "cm",
        "aliases": [
            "높이",
        ],
    },

    "depth_cm": {
        "label": "깊이",
        "type": "number",
        "unit": "cm",
        "aliases": [
            "깊이",
        ],
    },

    "length_cm": {
        "label": "길이",
        "type": "number",
        "unit": "cm",
        "aliases": [
            "길이",
        ],
    },

    "size": {
        "label": "크기",
        "type": "text",
        "aliases": [
            "크기",
            "사이즈",
        ],
    },

    "color": {
        "label": "색상",
        "type": "text",
        "aliases": [
            "색상",
            "색깔",
            "컬러",
        ],
    },

    "material": {
        "label": "소재",
        "type": "text",
        "aliases": [
            "소재",
            "재질",
        ],
    },

    "accessories": {
        "label": "구성품",
        "type": "list",
        "aliases": [
            "구성품",
            "부속품",
            "포함품",
            "구성",
        ],
    },

    "quantity": {
        "label": "수량",
        "type": "number",
        "unit": "개",
        "aliases": [
            "수량",
            "개수",
        ],
    },

    "capacity_l": {
        "label": "용량",
        "type": "number",
        "unit": "L",
        "aliases": [
            "용량",
        ],
    },

    # 전자기기에서 자주 사용
    "storage_gb": {
        "label": "저장 용량",
        "type": "number",
        "unit": "GB",
        "aliases": [
            "저장용량",
            "스토리지",
            "저장공간",
        ],
    },

    "ram_gb": {
        "label": "메모리",
        "type": "number",
        "unit": "GB",
        "aliases": [
            "램",
            "RAM",
            "메모리",
        ],
    },

    "screen_size_inch": {
        "label": "화면 크기",
        "type": "number",
        "unit": "inch",
        "aliases": [
            "화면크기",
            "디스플레이크기",
            "인치",
        ],
    },

    "cpu": {
        "label": "CPU",
        "type": "text",
        "aliases": [
            "CPU",
            "프로세서",
        ],
    },

    "gpu": {
        "label": "GPU",
        "type": "text",
        "aliases": [
            "GPU",
            "그래픽",
            "그래픽카드",
        ],
    },

    "os": {
        "label": "운영체제",
        "type": "text",
        "aliases": [
            "운영체제",
            "OS",
        ],
    },

    "battery_condition": {
        "label": "배터리 상태",
        "type": "text",
        "aliases": [
            "배터리상태",
            "배터리",
        ],
    },

    # 스포츠 / 취미 용품
    "target_level": {
        "label": "사용 수준",
        "type": "text",
        "aliases": [
            "사용수준",
            "숙련도",
            "입문자",
            "초보자",
        ],
    },

    "grip_size": {
        "label": "그립 사이즈",
        "type": "number",
        "aliases": [
            "그립사이즈",
            "그립",
        ],
    },

    "frame_size_inch": {
        "label": "프레임 크기",
        "type": "number",
        "unit": "inch",
        "aliases": [
            "프레임크기",
        ],
    },

    "wheel_size_inch": {
        "label": "휠 크기",
        "type": "number",
        "unit": "inch",
        "aliases": [
            "휠사이즈",
            "바퀴크기",
        ],
    },

    # 의류 / 신발
    "clothing_size": {
        "label": "의류 사이즈",
        "type": "text",
        "aliases": [
            "옷사이즈",
            "의류사이즈",
        ],
    },

    "shoe_size_mm": {
        "label": "신발 사이즈",
        "type": "number",
        "unit": "mm",
        "aliases": [
            "신발사이즈",
            "발사이즈",
        ],
    },

    # 기타 범용 특성
    "foldable": {
        "label": "접이식 여부",
        "type": "boolean",
        "aliases": [
            "접이식",
            "폴딩",
        ],
    },

    "wireless": {
        "label": "무선 여부",
        "type": "boolean",
        "aliases": [
            "무선",
        ],
    },

    "bluetooth": {
        "label": "블루투스",
        "type": "boolean",
        "aliases": [
            "블루투스",
            "bluetooth",
        ],
    },

    "waterproof": {
        "label": "방수 여부",
        "type": "boolean",
        "aliases": [
            "방수",
        ],
    },

    "compatibility": {
        "label": "호환성",
        "type": "list",
        "aliases": [
            "호환",
            "호환성",
            "지원기기",
        ],
    },
}


def _normalize(value: str):
    return re.sub(
        r"[\s_\-]+",
        "",
        str(value or "").strip().lower(),
    )


def get_attribute_definition(
    key: str
):
    return ATTRIBUTE_REGISTRY.get(
        key
    )


def is_registered_attribute(
    key: str
):
    return key in ATTRIBUTE_REGISTRY


def resolve_attribute_key(
    key: str | None = None,
    label: str | None = None,
):
    """
    LLM이 반환한 key 또는 label을
    표준 Registry key로 변환한다.
    """

    if key in ATTRIBUTE_REGISTRY:
        return key

    candidates = {
        _normalize(key),
        _normalize(label),
    }

    for canonical_key, definition in (
        ATTRIBUTE_REGISTRY.items()
    ):
        names = [
            canonical_key,
            definition.get("label"),
            *definition.get(
                "aliases",
                []
            ),
        ]

        normalized_names = {
            _normalize(name)
            for name in names
            if name
        }

        if (
            candidates
            & normalized_names
        ):
            return canonical_key

    return None


def get_registry_prompt():
    """
    Gemini prompt에 넣을 수 있는
    Registry 설명 생성.
    """

    lines = []

    for key, definition in (
        ATTRIBUTE_REGISTRY.items()
    ):
        label = definition.get(
            "label"
        )

        value_type = definition.get(
            "type"
        )

        unit = definition.get(
            "unit"
        )

        text = (
            f"- {key}: "
            f"{label} / "
            f"type={value_type}"
        )

        if unit:
            text += f" / unit={unit}"

        lines.append(text)

    return "\n".join(lines)