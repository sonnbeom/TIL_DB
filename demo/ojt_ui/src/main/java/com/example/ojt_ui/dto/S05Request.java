package com.example.ojt_ui.dto;

/** GET /s05 쿼리 파라미터. */
public class S05Request {

    private String q = "용접기";
    private String type = "ALL";

    public String getQ() {
        return q;
    }

    public void setQ(String q) {
        this.q = q;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
