package com.example.study_jvm.reentrantlock;

import java.util.concurrent.locks.ReentrantLock;

public class ReentrantLockTest {
    private static int count = 0;
    private static final ReentrantLock lock = new ReentrantLock();

    public static void main(String[] args) throws InterruptedException {
        int threadCnt = 10;
        int incrementsPerThread = 100_000;
        Thread[] threads = new Thread[threadCnt];

        for (int i = 0; i < threadCnt; i++) {
            threads[i] = new Thread(() ->{
                for (int j = 0; j < incrementsPerThread; j++) {
                    lock.lock();
                    try{
                        count++;
                    }finally {
                        lock.unlock();
                    }
                }
            });
            threads[i].start();
        }
        for (Thread t : threads){
            t.join();
        }
        System.out.println("예상값: " + (threadCnt * incrementsPerThread));
        System.out.println("실제값: " + count);
    }
}
