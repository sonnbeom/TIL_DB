package com.example.ojt_ui.model;

/** 상세 패널의 info-grid 카드 한 칸(라벨/값). numeric이면 "v num" 스타일이 적용된다. */
public class InfoCard {

    private final String label;
    private final String value;
    private final boolean numeric;

    public InfoCard(String label, String value, boolean numeric) {
        this.label = label;
        this.value = value;
        this.numeric = numeric;
    }

    public String getLabel() {
        return label;
    }

    public String getValue() {
        return value;
    }

    public boolean isNumeric() {
        return numeric;
    }
}
