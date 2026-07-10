package com.example.ojt_ui.data;

import com.example.ojt_ui.model.FacilityDetail;
import com.example.ojt_ui.model.ManufacturingResourceRow;

import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public final class S08Data {

    public static final String FACILITY_ID = "facility-main";

    public static final String RESOURCE_SUMMARY = "Facility 1건 · Equipment 8건";

    public static final List<ManufacturingResourceRow> ROWS = Collections.unmodifiableList(Arrays.asList(
            new ManufacturingResourceRow(FACILITY_ID, "본관 공장동", "Facility", null, null,
                    null, null, "사용 중", "active"),
            new ManufacturingResourceRow("cutter-laser-1", "레이저 절단기 #1", "Equipment", "절단설비", "본관 1층",
                    "최근 2026-04", "done", "가동 중", "active"),
            new ManufacturingResourceRow("cutter-plasma-1", "플라즈마 절단기 #1", "Equipment", "절단설비", "본관 1층",
                    "미문서화", "waiting", "가동 중", "active"),
            new ManufacturingResourceRow("welder-type", "이동형 용접기 #1~10", "Equipment", "용접설비 (Type)", "본관 2층",
                    "Instance별 개별", "done", "10대", "version"),
            new ManufacturingResourceRow("bender", "절곡기", "Equipment", "절곡설비", "본관 1층",
                    "미문서화", "waiting", "가동 중", "active"),
            new ManufacturingResourceRow("crane-hoist", "천장 크레인 (호이스트)", "Equipment", "운반설비", "본관 전체",
                    "확인 필요", "pending", "가동 중", "active"),
            new ManufacturingResourceRow("forklift", "지게차", "Equipment", "운반설비", "야드",
                    "미문서화", "waiting", "가동 중", "active"),
            new ManufacturingResourceRow("sensor-humidity", "온습도 센서 (도장동)", "Equipment", "계측", "의장 창고동",
                    null, null, "Sensor4.0", "version")
    ));

    public static final Map<String, ManufacturingResourceRow> ROWS_BY_ID = buildRowsById();

    public static final FacilityDetail FACILITY_DETAIL = new FacilityDetail(
            "본관 공장동", "4,200", "2011", "지상 2층 (절단·용접 1층, 절곡·크레인 2층)"
    );

    private S08Data() {
    }

    private static Map<String, ManufacturingResourceRow> buildRowsById() {
        Map<String, ManufacturingResourceRow> m = new LinkedHashMap<>();
        for (ManufacturingResourceRow row : ROWS) {
            m.put(row.getId(), row);
        }
        return Collections.unmodifiableMap(m);
    }
}
