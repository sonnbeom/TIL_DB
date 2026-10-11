package com.example.study_jvm.pool;

import java.util.concurrent.atomic.AtomicLong;

import static org.junit.jupiter.api.Assertions.*;

class BoundedQueueTest {
    BoundedQueue<Integer> q = new BoundedQueue<>(10);
    int producers = 3, consumers = 3, per = 100_000;

    AtomicLong sum = new AtomicLong();

}