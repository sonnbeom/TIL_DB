package com.example.ojt_ui.data;

import com.example.ojt_ui.model.AssetDetail;
import com.example.ojt_ui.model.AssetNode;
import com.example.ojt_ui.model.InfoCard;

import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/** mockup_ui/test04.html(S04 자산 분류 탐색)의 트리·상세 마크업을 그대로 옮긴 정적 데이터 제공자. */
public final class S04Data {

    public static final Map<String, String> ICONS;
    static {
        Map<String, String> icons = new LinkedHashMap<>();
        icons.put("facility", "<path d=\"M3 7l9-4 9 4-9 4-9-4z\"/><path d=\"M3 12l9 4 9-4M3 17l9 4 9-4\"/>");
        icons.put("ship", "<path d=\"M3 7v13h18V7M3 7l9-4 9 4M3 7l9 4 9-4\"/>");
        ICONS = Collections.unmodifiableMap(icons);
    }

    public static final List<AssetNode> TREE = Collections.unmodifiableList(Arrays.asList(
            AssetNode.group("facility_main", "본관 공장동", "facility", true, null, Arrays.asList(
                    AssetNode.group("cutting", "절단설비", null, true, 2, Arrays.asList(
                            AssetNode.leaf("laser1", "레이저 절단기 #1"),
                            AssetNode.leaf("plasma1", "플라즈마 절단기 #1")
                    )),
                    AssetNode.group("welding", "용접설비", null, true, 10, Arrays.asList(
                            AssetNode.leaf("welder3", "이동형 용접기 #3"),
                            AssetNode.leaf("welder4", "이동형 용접기 #4"),
                            AssetNode.leaf("welder5", "이동형 용접기 #5"),
                            AssetNode.moreLeaf("… 외 7대")
                    )),
                    AssetNode.leaf("bending", "절곡기"),
                    AssetNode.leaf("crane", "크레인 (호이스트)")
            )),
            AssetNode.group("warehouse", "의장 창고동", "facility", false, null, Collections.emptyList()),
            AssetNode.group("vessels", "진행 중 호선", "ship", true, 3, Arrays.asList(
                    AssetNode.leaf("vessel1", "9M 동력수상레저기구 (해람호)"),
                    AssetNode.leaf("vessel2", "관공선 DK2506-02"),
                    AssetNode.leaf("vessel3", "어선 DK2504-11")
            ))
    ));

    public static final Map<String, AssetDetail> DETAILS;
    static {
        Map<String, AssetDetail> details = new LinkedHashMap<>();
        details.put("welder3", new AssetDetail(
                "Equipment › 용접설비 › 이동형 용접기 #3",
                "가동 중", "active",
                Arrays.asList(
                        new InfoCard("모델", "DKW-350 이동형", false),
                        new InfoCard("시리얼번호", "SN-2023-0143", true),
                        new InfoCard("설치 위치", "본관 공장동 2층", false),
                        new InfoCard("최근 점검", "2026-06-02", true)
                ),
                3
        ));
        DETAILS = Collections.unmodifiableMap(details);
    }

    private S04Data() {
    }
}
