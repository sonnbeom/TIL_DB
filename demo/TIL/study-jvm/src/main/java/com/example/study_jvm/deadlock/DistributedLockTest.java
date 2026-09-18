package com.example.study_jvm.deadlock;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.params.SetParams;

import java.util.UUID;

public class DistributedLockTest {
    private static final String REDIS_HOST = "localhost";
    private static final int REDIS_PORT = 16379;
    private static final String LOCK_KEY = "my-distributed-lock";

    public static void main(String[] args) throws InterruptedException {
        int threadCount = 5;
        Thread[] threads = new Thread[threadCount];

        for (int i = 0; i < threadCount; i++) {
            int threadId = i;
            threads[i] = new Thread(() -> tryAcquireLock(threadId));
            threads[i].start();
        }

        for (Thread t : threads) {
            t.join();
        }
    }

    private static void tryAcquireLock(int threadId) {
        try (Jedis jedis = new Jedis(REDIS_HOST, REDIS_PORT)) {
            String lockValue = UUID.randomUUID().toString();
            SetParams params = SetParams.setParams().nx().px(5000); // NX: 없을 때만 설정, PX: 5초 후 자동 만료

            String result = jedis.set(LOCK_KEY, lockValue, params);

            if ("OK".equals(result)) {
                System.out.println("스레드" + threadId + ": 락 획득 성공!");
            } else {
                System.out.println("스레드" + threadId + ": 락 획득 실패 (이미 누군가 쥐고 있음)");
            }
        }
    }
}