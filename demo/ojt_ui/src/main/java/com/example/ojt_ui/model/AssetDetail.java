package com.example.ojt_ui.model;

import java.util.List;

/** S04 트리에서 자산을 선택했을 때 우측에 보이는 미리보기 상세(mockup_ui/test04.html의 split-detail 영역). */
public class AssetDetail {

    private final String path;
    private final String statusLabel;
    private final String statusClass;
    private final List<InfoCard> infoCards;
    private final int docCount;

    public AssetDetail(String path, String statusLabel, String statusClass, List<InfoCard> infoCards, int docCount) {
        this.path = path;
        this.statusLabel = statusLabel;
        this.statusClass = statusClass;
        this.infoCards = infoCards;
        this.docCount = docCount;
    }

    public String getPath() {
        return path;
    }

    public String getStatusLabel() {
        return statusLabel;
    }

    public String getStatusClass() {
        return statusClass;
    }

    public List<InfoCard> getInfoCards() {
        return infoCards;
    }

    public int getDocCount() {
        return docCount;
    }
}
