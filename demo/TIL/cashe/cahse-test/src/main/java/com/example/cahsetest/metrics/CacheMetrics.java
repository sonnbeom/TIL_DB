package com.example.cahsetest.metrics;


import com.example.cahsetest.dto.response.StatsResponse;
import org.springframework.stereotype.Component;

import java.util.concurrent.atomic.AtomicLong;

/**
 * Before/After 비교용 누적 카운터. Step 7의 PopularContentService가 요청마다 호출합니다.
 * dbQueryCount는 "MySQL을 실제로 친 횟수"만 셉니다 (캐시 히트일 땐 안 늘어남) —
 * 이게 늘어나는 만큼이 곧 MySQL 부하입니다.
 */
@Component
public class CacheMetrics {
    private final AtomicLong totalRequests = new AtomicLong();
    private final AtomicLong cacheHits = new AtomicLong();
    private final AtomicLong cacheMisses = new AtomicLong();
    private final AtomicLong dbQueryCount = new AtomicLong();

    public void incrementTotal() {
        totalRequests.incrementAndGet();
    }

    public void incrementHit() {
        cacheHits.incrementAndGet();
    }

    public void incrementMiss() {
        cacheMisses.incrementAndGet();
    }

    public void incrementDbQuery() {
        dbQueryCount.incrementAndGet();
    }

    /** JMeter로 100/1,000/10,000회 테스트를 각각 돌리기 전에 호출해서 카운터를 0으로 리셋합니다. */
    public void reset() {
        totalRequests.set(0);
        cacheHits.set(0);
        cacheMisses.set(0);
        dbQueryCount.set(0);
    }

    public StatsResponse getStats() {
        long total = totalRequests.get();
        long hits = cacheHits.get();
        long misses = cacheMisses.get();
        long dbQueries = dbQueryCount.get();

        double hitRate = total == 0 ? 0.0 : (hits * 100.0) / total;
        double reductionRate = total == 0 ? 0.0 : ((total - dbQueries) * 100.0) / total;

        return new StatsResponse(total, hits, misses, dbQueries, hitRate, reductionRate);
    }
}
