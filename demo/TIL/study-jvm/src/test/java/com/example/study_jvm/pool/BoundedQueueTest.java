package com.example.study_jvm.pool;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Timeout;

import java.util.concurrent.atomic.AtomicLong;

import static org.junit.jupiter.api.Assertions.*;

class BoundedQueueTest {

    @Test
    void put_then_take_returns_same_value() throws Exception {
        BoundedQueue<Integer> q = new BoundedQueue<>(2);
        q.put(1);
        assertEquals(1, q.take());
    }

    // 2. FIFO 순서
    @Test @Timeout(2)
    void keeps_fifo_order() throws Exception {
        BoundedQueue<Integer> q = new BoundedQueue<>(3);
        q.put(1);
        q.put(2);
        q.put(3);
        assertEquals(q.take(), 1);
        assertEquals(q.take(), 2);
        assertEquals(q.take(), 3);
    }

    // 3. offer는 가득 차면 대기하지 않고 false
    @Test @Timeout(2)
    void offer_returns_false_when_full() {

    }
}