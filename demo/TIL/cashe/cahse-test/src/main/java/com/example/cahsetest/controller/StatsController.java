package com.example.cahsetest.controller;

import com.example.cahsetest.dto.response.StatsResponse;
import com.example.cahsetest.metrics.CacheMetrics;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stats")
@RequiredArgsConstructor
public class StatsController {
    private final CacheMetrics cacheMetrics;

    /** GET /api/stats — 누적 카운터 스냅샷 (Before/After 비교용) */
    @GetMapping
    public ResponseEntity<StatsResponse> getStats() {
        return ResponseEntity.ok(cacheMetrics.getStats());
    }

    /** POST /api/stats/reset — JMeter 100/1,000/10,000회 테스트 전마다 호출해서 카운터 초기화 */
    @PostMapping("/reset")
    public ResponseEntity<String> reset() {
        cacheMetrics.reset();
        return ResponseEntity.ok("stats reset");
    }
}
