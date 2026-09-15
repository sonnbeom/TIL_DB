package com.example.study_jvm.sychronized;

public class SynchronizedTest {
    private static int count = 0;
    private static final Object lock = new Object();

    public static void main(String[] args) throws InterruptedException {
        int threadCount = 10;
        int incrementsPerThread = 100_100;
        Thread[] threads = new Thread[threadCount];

        for (int i = 0; i < threadCount; i++) {
            threads[i] = new Thread(() ->{
                for (int j = 0; j < incrementsPerThread; j++) {
                    synchronized (lock){
                        count++;
                    }
                }
            });
            threads[i].start();
        }
        for (Thread t: threads){
            t.join();
        }
       System.out.println("예상값: " + (threadCount * incrementsPerThread));
        System.out.println("실제값: " + count);
    }
}
