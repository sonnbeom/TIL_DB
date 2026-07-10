package com.example.ojt_ui.dto;

import com.example.ojt_ui.data.S08Data;

/** GET /s08 쿼리 파라미터. */
public class S08Request {

    private String resource = S08Data.FACILITY_ID;

    public String getResource() {
        return resource;
    }

    public void setResource(String resource) {
        this.resource = resource;
    }
}
