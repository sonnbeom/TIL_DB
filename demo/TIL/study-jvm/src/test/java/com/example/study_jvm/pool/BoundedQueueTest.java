package com.example.study_jvm.pool;

import org.junit.jupiter.api.Test;

import java.util.concurrent.atomic.AtomicLong;

import static org.junit.jupiter.api.Assertions.*;

class BoundedQueueTest {
    @Test
    void put_then_take_returns_same_value() throws Exception {
        BoundedQueue<Integer> q = new BoundedQueue<>(2);
        q.put(1);
        assertEquals(1, q.take());
    }
}