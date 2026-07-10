package com.example.ojt_ui.model;

/** S07 체크리스트 탭의 서류 한 행 — 서류 정의(이름·구분)는 S03Data 기준이고, 제출 상태만 이 호선 인스턴스 고유값이다. */
public class ChecklistItem {

    private final String name;
    private final String subtitle;
    private final String statusLabel;
    private final String statusClass;

    public ChecklistItem(String name, String subtitle, String statusLabel, String statusClass) {
        this.name = name;
        this.subtitle = subtitle;
        this.statusLabel = statusLabel;
        this.statusClass = statusClass;
    }

    public String getName() {
        return name;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public String getStatusLabel() {
        return statusLabel;
    }

    public String getStatusClass() {
        return statusClass;
    }

    public boolean isSubmitted() {
        return "done".equals(statusClass);
    }
}
