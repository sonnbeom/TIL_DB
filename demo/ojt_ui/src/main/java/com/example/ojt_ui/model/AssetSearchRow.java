package com.example.ojt_ui.model;

/** S05 자산 검색 결과 한 행(mockup_ui/test.html의 doc-table row-asset 마크업을 그대로 반영). */
public class AssetSearchRow {

    private final String name;
    private final String sub;
    private final String category;
    private final String location;
    private final String statusLabel;
    private final String statusClass;
    private final String statusKind;
    private final String date;
    private final String icon;

    public AssetSearchRow(String name, String sub, String category, String location,
                           String statusLabel, String statusClass, String statusKind,
                           String date, String icon) {
        this.name = name;
        this.sub = sub;
        this.category = category;
        this.location = location;
        this.statusLabel = statusLabel;
        this.statusClass = statusClass;
        this.statusKind = statusKind;
        this.date = date;
        this.icon = icon;
    }

    public String getName() {
        return name;
    }

    public String getSub() {
        return sub;
    }

    public String getCategory() {
        return category;
    }

    public String getLocation() {
        return location;
    }

    public String getStatusLabel() {
        return statusLabel;
    }

    public String getStatusClass() {
        return statusClass;
    }

    public String getIcon() {
        return icon;
    }

    /** "badge"(자산 행)와 "ci-status"(문서 행)로 상태 표시 마크업이 다르다. */
    public boolean isBadgeStatus() {
        return "badge".equals(statusKind);
    }
}
