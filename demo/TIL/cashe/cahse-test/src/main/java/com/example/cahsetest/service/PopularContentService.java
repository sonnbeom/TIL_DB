package com.example.cahsetest.service;

import com.example.cahsetest.dto.PopularContentResponse;
import com.example.cahsetest.metrics.CacheMetrics;
import com.example.cahsetest.repository.PopularContentMapper;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

/**
 * "올해 인기 콘텐츠 TOP10" 조회의 Cache-Aside 구현.
 * app.cache.enabled 로 Before(캐시 우회)/After(Cache-Aside) 전환.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class PopularContentService {
    private static final Duration CACHE_TTL = Duration.ofHours(24);
    private static final String CACHE_KEY_PREFIX = "popular:";

    private final PopularContentMapper popularContentMapper;
    private final StringRedisTemplate redisTemplate;
    private final CacheMetrics cacheMetrics;

    @Qualifier("redisObjectMapper")
    private final ObjectMapper redisObjectMapper;

    @Value("${app.cache.enabled:true}")
    private boolean cacheEnabled;

    public List<PopularContentResponse> getPopular(int year) {
        cacheMetrics.incrementTotal();
        LocalDateTime bucket = toYearBucket(year);

        if (!cacheEnabled) {
            // Before: 항상 MySQL
            cacheMetrics.incrementDbQuery();
            return popularContentMapper.findTop10(bucket);
        }

        String key = CACHE_KEY_PREFIX + year;
        List<PopularContentResponse> cached = readFromCache(key);
        if (cached != null) {
            cacheMetrics.incrementHit();
            return cached;
        }

        cacheMetrics.incrementMiss();
        cacheMetrics.incrementDbQuery();
        List<PopularContentResponse> fromDb = popularContentMapper.findTop10(bucket);
        writeToCache(key, fromDb);
        return fromDb;
    }

    /** year 파라미터를 좋아요 집계 시 쓰는 것과 동일한 버킷 값으로 변환 (연초 0시로 고정) */
    private LocalDateTime toYearBucket(int year) {
        return LocalDateTime.of(year, 1, 1, 0, 0);
    }

    private List<PopularContentResponse> readFromCache(String key) {
        try {
            String json = redisTemplate.opsForValue().get(key);
            if (json == null) {
                return null;
            }
            return redisObjectMapper.readValue(json, new TypeReference<List<PopularContentResponse>>() {});
        } catch (Exception e) {
            log.warn("캐시 읽기 실패 key={}, DB로 폴백", key, e);
            return null;
        }
    }

    private void writeToCache(String key, List<PopularContentResponse> value) {
        try {
            String json = redisObjectMapper.writeValueAsString(value);
            redisTemplate.opsForValue().set(key, json, CACHE_TTL);
        } catch (Exception e) {
            log.warn("캐시 쓰기 실패 key={}", key, e);
        }
    }
}
