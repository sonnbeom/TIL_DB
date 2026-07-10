package com.example.ojt_ui.data;

import com.example.ojt_ui.model.AssetSearchRow;
import com.example.ojt_ui.model.FilterOption;

import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;


public final class S05Data {

    public static final Map<String, String> ICONS;
    static {
        Map<String, String> icons = new LinkedHashMap<>();
        icons.put("asset", "<rect x=\"4\" y=\"4\" width=\"16\" height=\"16\" rx=\"2\"/><path d=\"M8 4v16M4 9h4\"/>");
        icons.put("doc", "<path d=\"M3 7l9-4 9 4-9 4-9-4z\"/><path d=\"M3 12l9 4 9-4\"/>");
        ICONS = Collections.unmodifiableMap(icons);
    }

    public static final List<FilterOption> TYPE_FILTERS = Collections.unmodifiableList(Arrays.asList(
            new FilterOption("ALL", "전체 유형"),
            new FilterOption("Equipment", "Equipment"),
            new FilterOption("Facility", "Facility"),
            new FilterOption("Product", "Product (호선)"),
            new FilterOption("기자재", "기자재")
    ));

    public static final List<AssetSearchRow> ROWS = Collections.unmodifiableList(Arrays.asList(
            new AssetSearchRow("이동형 용접기 #3", "SN-2023-0143", "Equipment", "본관 공장동 2층",
                    "가동 중", "active", "badge", "2026-06-02", "asset"),
            new AssetSearchRow("이동형 용접기 #4", "SN-2023-0144", "Equipment", "본관 공장동 2층",
                    "가동 중", "active", "badge", "2026-05-28", "asset"),
            new AssetSearchRow("이동형 용접기 #5", "SN-2023-0145", "Equipment", "본관 공장동 2층",
                    "정비 중", "version", "badge", "2026-06-07", "asset"),
            new AssetSearchRow("고정형 용접기 (본관 1층)", "SN-2019-0002", "Equipment", "본관 공장동 1층",
                    "가동 중", "active", "badge", "2026-03-14", "asset"),
            new AssetSearchRow("용접기 검정증서 (2026년도)", "문서 · DocumentRecord", "문서", "—",
                    "최신", "done", "ci-status", "2026-01-20", "doc")
    ));

    private S05Data() {
    }
}
