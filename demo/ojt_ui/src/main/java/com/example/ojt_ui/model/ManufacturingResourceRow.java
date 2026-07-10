package com.example.ojt_ui.model;

/** S08 제조자원 목록 한 행(공장 설비·시설). */
public class ManufacturingResourceRow {

    private final String id;
    private final String name;
    private final String type;
    private final String subtype;
    private final String location;
    private final String maintenanceLabel;
    private final String maintenanceClass;
    private final String statusLabel;
    private final String statusClass;

    public ManufacturingResourceRow(String id, String name, String type, String subtype, String location,
                                     String maintenanceLabel, String maintenanceClass,
                                     String statusLabel, String statusClass) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.subtype = subtype;
        this.location = location;
        this.maintenanceLabel = maintenanceLabel;
        this.maintenanceClass = maintenanceClass;
        this.statusLabel = statusLabel;
        this.statusClass = statusClass;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getType() {
        return type;
    }

    public String getLocation() {
        return location;
    }

    public String getMaintenanceLabel() {
        return maintenanceLabel;
    }

    public String getMaintenanceClass() {
        return maintenanceClass;
    }

    public String getStatusLabel() {
        return statusLabel;
    }

    public String getStatusClass() {
        return statusClass;
    }

    /** 목록 "분류" 컬럼 표시값 — subtype이 없으면(Facility) type만, 있으면 "Equipment · 절단설비" 형태. */
    public String getCategoryLabel() {
        return subtype == null ? type : type + " · " + subtype;
    }
}
