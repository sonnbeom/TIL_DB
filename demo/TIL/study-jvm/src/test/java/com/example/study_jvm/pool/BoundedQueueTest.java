package com.example.study_jvm.pool;

import java.util.concurrent.atomic.AtomicLong;

import static org.junit.jupiter.api.Assertions.*;

class BoundedQueueTest {

    public static void main(String[] args) {
        BoundedQueue<Integer> q = new BoundedQueue<>(10);
        int producers = 3, consumers = 3, per = 100_000;

        AtomicLong sum = new AtomicLong();
        Thread[] ts = new Thread[producers + consumers];
        for (int i = 0; i < producers; i++) {
            ts[i] = new Thread(() -> {
                try {
                    for (int j = 0; j < per; j++) {
                        q.put(j);
                    }
                }
                catch (InterruptedException ignored){}
            });
        }

        for (int i = 0; i < consumers; i++) {
            ts[producers + i] = new Thread(() -> {
                try {
                    for (int j = 0; j < per; j++) {
                        sum.addAndGet(q.take());
                    }
                }catch (InterruptedException ignored){}
            });
        }

    }
}