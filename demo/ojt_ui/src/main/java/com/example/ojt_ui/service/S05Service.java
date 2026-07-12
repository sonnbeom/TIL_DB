package com.example.ojt_ui.service;

import com.example.ojt_ui.data.S05Data;
import com.example.ojt_ui.dto.S05Request;
import com.example.ojt_ui.model.AssetSearchRow;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class S05Service {

    public Map<String, Object> buildModel(S05Request request) {
        String query = request.getQ() == null ? "" : request.getQ().trim();
        String type = request.getType();

        List<AssetSearchRow> results = S05Data.ROWS.stream()
                .filter(row -> "ALL".equals(type) || row.getCategory().equals(type))
                .filter(row -> query.isEmpty()
                        || row.getName().contains(query)
                        || row.getSub().contains(query))
                .collect(Collectors.toList());

        Map<String, Object> model = new LinkedHashMap<>();
        model.put("icons", S05Data.ICONS);
        model.put("typeFilters", S05Data.TYPE_FILTERS);
        model.put("selectedType", type);
        model.put("query", query);
        model.put("results", results);
        model.put("resultCount", results.size());
        return model;
    }
}
