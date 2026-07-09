package com.example.cahsetest.dto.response;

public record StatsResponse(
        long totalRequests,
        long cacheHits,
        long cacheMisses,
        long dbQueryCount,
        double cacheHitRatePercent,
        double dbQueryReductionRatePercent
) {
}
