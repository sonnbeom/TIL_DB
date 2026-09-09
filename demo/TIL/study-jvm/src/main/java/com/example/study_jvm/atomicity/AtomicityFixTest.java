package com.example.study_jvm.atomicity;

import java.util.concurrent.atomic.AtomicInteger;

public class AtomicityFixTest {
    private static AtomicInteger count = new AtomicInteger(0);

    public static void main(String[] args) throws InterruptedException {
        int threadCount = 10;
        int incrementsPerThread = 100_000;
        Thread[] threads = new Thread[threadCount];

        for (int i = 0; i < threadCount; i++) {
            threads[i] = new Thread(() -> {
                for (int j = 0; j < incrementsPerThread; j++) {
                    count.incrementAndGet();
                }
            });
            threads[i].start();
        }

        for (Thread t : threads) {
            t.join();
        }

        System.out.println("예상값: " + (threadCount * incrementsPerThread));
        System.out.println("실제값: " + count.get());
    }
}
