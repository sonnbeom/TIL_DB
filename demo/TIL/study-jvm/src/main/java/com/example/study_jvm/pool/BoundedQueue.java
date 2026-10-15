package com.example.study_jvm.pool;

import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;

public class BoundedQueue<T> {

    private final Object[] items;
    private int head, tail, size;
    private final ReentrantLock lock = new ReentrantLock();
    private final Condition notFull = lock.newCondition();
    private final Condition notEmpty = lock.newCondition();

    public BoundedQueue(int capacity) {items = new Object[capacity];}

    // 큐가 가득 차면 자리가 날 때까지 대기
    public void put(T t) throws InterruptedException {
        lock.lockInterruptibly();

        try {
            while (size == items.length){
                notFull.await();
            }
            enqueue(t);
        }
        finally {
            lock.unlock();
        }
    }

    // 가득 차면 즉시 false 대기하지 않음, put이랑 대조
    public boolean offer(T t){
        lock.lock();

        try {
            if (size == items.length){
                return false;
            }
            enqueue(t);
            return true;
        }finally {
            lock.unlock();
        }
    }

    /** 비어 있으면 들어올 때까지 대기 */
    public T take() throws InterruptedException{
        lock.lockInterruptibly();
        try {
            while (size == 0){ //size는 지금 큐 안에 들어 있는 원소의 갯수, 큐가 비었다 = 꺼낼 게 없다
                notEmpty.await();
            }
            return dequeue();
        }finally {
            lock.unlock();
        }
    }

    @SuppressWarnings("unchecked")
    // 경고를 이 메서드에서 숨겨달라 종류는 unchecked
    private T dequeue() {
        T t =  (T) items[head];
        items[head] = null;
        head = (head + 1) % items.length;
        size--;
        notFull.signal();
        return t;
    }

    public int size(){
        lock.lock();
        try {
            return size;
        }finally {
            lock.unlock();
        }
    }

    /*
    notFull	큐가 가득 차지 않음	제출자	워커가 꺼내서 자리가 생김
    notEmpty	큐가 비어 있지 않음	워커	제출자가 넣어서 작업이 생김
    * */
    private void enqueue(T t) {
        items[tail] = t;
        tail = (tail + 1) % items.length;
        size++;
        notEmpty.signal();
    }


    // 비어 있으면 timeout까지만 대기 시간 초과 시 null
    public T poll(long timeOut, TimeUnit unit) throws InterruptedException {
        long nanos = unit.toNanos(timeOut);
        lock.lockInterruptibly();

        try {
            while (size == 0){
                if (nanos <= 0) return null;
                nanos = notEmpty.awaitNanos(nanos); // 남는 대기 시간을 돌려줌
            }
            return dequeue();
        }finally {
            lock.unlock();
        }
    }
}
