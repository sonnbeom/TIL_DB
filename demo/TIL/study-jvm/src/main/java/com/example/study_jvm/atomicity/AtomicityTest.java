package com.example.study_jvm.atomicity;

public class AtomicityTest {
    private static volatile int count = 0; // volatile을 붙여도 원자성 문제가 그대로 재현되는지 보기 위함

    public static void main(String[] args) throws InterruptedException {
        int threadCnt = 10;
        int incrementsPerThread = 100_000;
        Thread[] threads = new Thread[threadCnt];

        for (int i = 0; i < threadCnt; i++) {
            threads[i] = new Thread(() -> {
                for (int j = 0; j < incrementsPerThread; j++) {
                    count++;
                }
            });
            threads[i].start();
        }
        for (Thread t : threads) {
            t.join();
        }

        System.out.println("예상값: " + (threadCnt * incrementsPerThread));
        System.out.println("실제값: " + count);

    }
}
