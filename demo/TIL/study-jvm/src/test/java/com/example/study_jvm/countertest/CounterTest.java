package com.example.study_jvm.countertest;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.concurrent.atomic.AtomicInteger;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CounterTest {

    @Test
    @DisplayName("단일_스레드에서_증가시키면_정확히_증가하는_테스트")
    void oneThreadTest(){
        //Given: 카운터 준비
        AtomicInteger count = new AtomicInteger(0);

        //when : 3번 증가
        count.incrementAndGet();
        count.incrementAndGet();
        count.incrementAndGet();

        //Then: 결과가 3인지 검증
        assertEquals(count.get(), 3);
    }
}
