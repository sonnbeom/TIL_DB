package com.example.study_jvm.deadlock;

import java.util.concurrent.CountDownLatch;

public class DeadlockTest {
    private static final Object lockA = new Object();
    private static final Object lockB = new Object();
    private static final CountDownLatch latch = new CountDownLatch(2);

    public static void main(String[] args) {
Thread thread1 = new Thread(() -> {
    synchronized (lockA) {
        System.out.println("스레드1: lockA 획득");
        latch.countDown();
        try {
            latch.await();
        } catch (InterruptedException e) {
            System.out.println("스레드 a 에러");
        }

        System.out.println("스레드1: lockB 획득 시도");
        synchronized (lockB) {
            System.out.println("스레드1: lockB 획득 성공");
        }
    }
});

Thread thread2 = new Thread(() -> {
    synchronized (lockB) {
        System.out.println("스레드2: lockB 획득");
        latch.countDown();
        try {
            latch.await();
        } catch (InterruptedException e) {
            System.out.println("스레드 b 에러");
        }

        System.out.println("스레드2: lockA 획득 시도");
        synchronized (lockA) {
            System.out.println("스레드2: lockA 획득 성공");
        }
    }
});
        thread1.start();
        thread2.start();
        System.out.println("메인 스레드 종료");
    }
}
