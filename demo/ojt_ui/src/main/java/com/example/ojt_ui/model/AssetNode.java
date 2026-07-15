package com.example.ojt_ui.model;

import java.util.List;

/** S04 자산 분류 트리의 노드(mockup_ui/test04.html의 tree-node 마크업을 그대로 반영). */
public class AssetNode {

    private final String id;
    private final String label;
    private final String icon;
    private final Integer count;
    private final boolean open;
    private final boolean clickable;
    private final List<AssetNode> children;

    public AssetNode(String id, String label, String icon, Integer count, boolean open,
                      boolean clickable, List<AssetNode> children) {
        this.id = id;
        this.label = label;
        this.icon = icon;
        this.count = count;
        this.open = open;
        this.clickable = clickable;
        this.children = children;
    }

    public static AssetNode group(String id, String label, String icon, boolean open, Integer count, List<AssetNode> children) {
        return new AssetNode(id, label, icon, count, open, true, children);
    }

    public static AssetNode leaf(String id, String label) {
        return new AssetNode(id, label, null, null, false, true, null);
    }

    /** "… 외 7대"처럼 실제 자산을 가리키지 않는, 클릭 불가능한 안내용 리프. */
    public static AssetNode moreLeaf(String label) {
        return new AssetNode(null, label, null, null, false, false, null);
    }

    public String getId() {
        return id;
    }

    public String getLabel() {
        return label;
    }

    public String getIcon() {
        return icon;
    }

    public Integer getCount() {
        return count;
    }

    public boolean isOpen() {
        return open;
    }

    public boolean isClickable() {
        return clickable;
    }

    public List<AssetNode> getChildren() {
        return children;
    }

    /** children이 아예 없는(leaf/moreLeaf) 노드인지 여부 — group()은 자식이 0개여도 leaf가 아니다(예: 의장 창고동). */
    public boolean isLeaf() {
        return children == null;
    }

    public boolean hasChildren() {
        return children != null && !children.isEmpty();
    }
}
