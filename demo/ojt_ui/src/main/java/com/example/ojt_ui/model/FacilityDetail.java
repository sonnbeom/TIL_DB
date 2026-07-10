package com.example.ojt_ui.model;

/** S08에서 등록 상세 정보(연면적·준공년도·층수)가 실제로 존재하는 시설 자원 하나. */
public class FacilityDetail {

    private final String name;
    private final String area;
    private final String builtYear;
    private final String floors;

    public FacilityDetail(String name, String area, String builtYear, String floors) {
        this.name = name;
        this.area = area;
        this.builtYear = builtYear;
        this.floors = floors;
    }

    public String getName() {
        return name;
    }

    public String getArea() {
        return area;
    }

    public String getBuiltYear() {
        return builtYear;
    }

    public String getFloors() {
        return floors;
    }
}
