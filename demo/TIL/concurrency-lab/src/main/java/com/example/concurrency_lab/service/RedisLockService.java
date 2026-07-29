package com.example.concurrency_lab.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.time.Duration;

@Component
@RequiredArgsConstructor
public class RedisLockService {

    private final StringRedisTemplate redisTemplate;

    private static final String LOCK_PREFIX = "lock:course:";

    public boolean tryLock(Long courseId, String lockValue, long ttlMills){
        String key = LOCK_PREFIX + courseId;
        Boolean success = redisTemplate.opsForValue()
                .setIfAbsent(key, lockValue, Duration.ofMillis(ttlMills));
        return Boolean.TRUE.equals(success);
    }

    public void unlock(Long courseId, String lockValue){
        String key = LOCK_PREFIX + courseId;
        String currentValue = redisTemplate.opsForValue().get(key);
        if(lockValue.equals(currentValue)) redisTemplate.delete(key);

    }
}
