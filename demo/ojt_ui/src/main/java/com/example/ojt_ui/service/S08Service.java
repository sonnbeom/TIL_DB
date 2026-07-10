package com.example.ojt_ui.service;

import com.example.ojt_ui.data.S08Data;
import com.example.ojt_ui.dto.S08Request;
import com.example.ojt_ui.model.ManufacturingResourceRow;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class S08Service {

    public Map<String, Object> buildModel(S08Request request) {
        ManufacturingResourceRow selected = S08Data.ROWS_BY_ID.get(request.getResource());

        Map<String, Object> model = new LinkedHashMap<>();
        model.put("rows", S08Data.ROWS);
        model.put("resourceSummary", S08Data.RESOURCE_SUMMARY);
        model.put("selectedId", request.getResource());
        model.put("selected", selected);
        model.put("detail", selected != null && S08Data.FACILITY_ID.equals(selected.getId())
                ? S08Data.FACILITY_DETAIL : null);
        return model;
    }
}
