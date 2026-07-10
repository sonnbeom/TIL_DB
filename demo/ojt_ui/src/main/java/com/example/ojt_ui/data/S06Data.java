package com.example.ojt_ui.data;

import com.example.ojt_ui.model.VesselDraft;

public final class S06Data {

    public static final VesselDraft EXAMPLE = new VesselDraft(
            "9M 동력수상레저기구 (해람호)",
            "DK2507-04",
            "(주)지오시스템리서치",
            "민수",
            "레저용",
            "FRP",
            "9.7",
            "소형선박 (< 1000t)",
            "DK-0704",
            "KR — 대한민국",
            "KRKUV — 군산",
            "연해구역"
    );

    /** 위 예시 호선(레저용·FRP·소형선박)에 대응하는 S03 검사기준 키 — 검사기준 판정 패널을 S03Data와 동일한 값으로 계산하기 위함. */
    public static final String JUDGE_CRITERIA_KEY = "ClassificationSociety|KR|LEISURE|FRP|SMALL|LEISURE_GUIDE";

    private S06Data() {
    }
}
