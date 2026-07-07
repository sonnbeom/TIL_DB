package com.example.cahsetest.controller;

import com.example.cahsetest.dto.PopularContentResponse;
import com.example.cahsetest.service.PopularContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor

public class PopularContentController {
    private final PopularContentService popularContentService;

    /** GET /popular?year=2026 — JMeter가 반복 호출할 그 API */
    @GetMapping("/popular")
    public ResponseEntity<List<PopularContentResponse>> getPopular(@RequestParam int year) {
        return ResponseEntity.ok(popularContentService.getPopular(year));
    }
}
