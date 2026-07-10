package com.example.ojt_ui.model;

/** S06 호선 등록 화면에 표시되는 예시 호선 데이터(mockup_ui/test_02.html의 입력값을 그대로 옮긴 것). */
public class VesselDraft {

    private final String name;
    private final String projectCode;
    private final String client;
    private final String orderType;
    private final String vesselCategory;
    private final String hullMaterial;
    private final String grossTonnage;
    private final String sizeClassAuto;
    private final String hullNumber;
    private final String flag;
    private final String port;
    private final String voyage;

    public VesselDraft(String name, String projectCode, String client, String orderType,
                        String vesselCategory, String hullMaterial, String grossTonnage, String sizeClassAuto,
                        String hullNumber, String flag, String port, String voyage) {
        this.name = name;
        this.projectCode = projectCode;
        this.client = client;
        this.orderType = orderType;
        this.vesselCategory = vesselCategory;
        this.hullMaterial = hullMaterial;
        this.grossTonnage = grossTonnage;
        this.sizeClassAuto = sizeClassAuto;
        this.hullNumber = hullNumber;
        this.flag = flag;
        this.port = port;
        this.voyage = voyage;
    }

    public String getName() {
        return name;
    }

    public String getProjectCode() {
        return projectCode;
    }

    public String getClient() {
        return client;
    }

    public String getOrderType() {
        return orderType;
    }

    public String getVesselCategory() {
        return vesselCategory;
    }

    public String getHullMaterial() {
        return hullMaterial;
    }

    public String getGrossTonnage() {
        return grossTonnage;
    }

    public String getSizeClassAuto() {
        return sizeClassAuto;
    }

    public String getHullNumber() {
        return hullNumber;
    }

    public String getFlag() {
        return flag;
    }

    public String getPort() {
        return port;
    }

    public String getVoyage() {
        return voyage;
    }

    /** sizeClassAuto("소형선박 (< 1000t)")에서 괄호 안 기준을 뺀 짧은 이름("소형선박")만 뽑아낸다. */
    public String getSizeClassShort() {
        int spaceIdx = sizeClassAuto.indexOf(' ');
        return spaceIdx < 0 ? sizeClassAuto : sizeClassAuto.substring(0, spaceIdx);
    }
}
