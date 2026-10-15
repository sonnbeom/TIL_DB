package com.example.study_jvm.pool;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Timeout;

import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicLong;
import java.util.concurrent.atomic.AtomicReference;

import static org.junit.jupiter.api.Assertions.*;

class BoundedQueueTest {

    /** 스레드가 WAITING(await로 잠든 상태)이 될 때까지 대기 */
    private static void waitUntilWaiting(Thread t) throws InterruptedException {
        while (t.getState() != Thread.State.WAITING) Thread.sleep(5);
    }

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
        BoundedQueue<Integer> q = new BoundedQueue<>(2);
        assertTrue(q.offer(1));
        assertTrue(q.offer(2));
        assertFalse(q.offer(3));
        assertEquals(2, q.size());
    }

    // 4. poll은 빈 큐에서 timeout 후 null
    @Test @Timeout(2)
    void poll_returns_null_after_timeout() throws Exception {
        BoundedQueue<Integer> q = new BoundedQueue<>(2);
        long t0 = System.nanoTime();
        assertNull(q.poll(100, TimeUnit.MILLISECONDS));
        long elapsedMs = (System.nanoTime() - t0) / 1_000_000;
        assertTrue(elapsedMs >= 90, "너무 일찍 반환됨: " + elapsedMs + "ms");
    }



    //5.take는 빈 큐에서 잠들고 다른 스레드가 put 하면 깨어난다.notEmpy.signal 동작
    @Test @Timeout(3)
    @DisplayName("take는 빈 큐에서 잠들고 다른 스레드가 put 하면 깨어난다.notEmpy.signal 동작")
    void take_blocks_until_put() throws InterruptedException {
        BoundedQueue<Integer> q = new BoundedQueue<>(2);
        AtomicReference<Integer> got = new AtomicReference<>();

        Thread consumer = new Thread(() -> {
            try {
                got.set(q.take());
            } catch (InterruptedException e) {
            }
        });
        consumer.start();

        waitUntilWaiting(consumer);
        assertNull(got.get());

        q.put(42); // notEmpy.signal()
        consumer.join(1000);
        assertEquals(42, got.get());
    }

    // 6. put은 가득 차면 잠들고, take로 자리가 나면 깨어난다  (notFull.signal 검증)
    @Test @Timeout(3)
    @DisplayName("put은 가득 차면 잠들고, take로 자리가 나면 깨어난다 notFull.signal 검증")
    void put_blocks_until_take() throws InterruptedException {
        BoundedQueue<Integer> q = new BoundedQueue<>(1);
        q.put(1);                            // 가득 참

        Thread producer = new Thread(() -> {
            try {
                q.put(2);
            }catch (InterruptedException ignored){}
        });

        producer.start();

        waitUntilWaiting(producer); // 넣지 못하고 잠듬
        assertEquals(1, q.size());

        assertEquals(1, q.take());
        producer.join();
        assertEquals(2, q.take());
    }

    @Test @Timeout(3)
    @DisplayName(" 7. 원형 배열 wrap-around")
    void works_after_wrapping_around() throws InterruptedException {
        BoundedQueue<Integer> q = new BoundedQueue<>(3);
        for (int i = 0; i < 20; i++) {
            q.put(i);
            assertEquals(i, q.take());
        }
        assertEquals(q.size(), 0);

    }
}