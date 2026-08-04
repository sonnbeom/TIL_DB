package com.example.log_server.sensor.buffer;

import com.example.log_server.sensor.domain.SensorReading;
import com.example.log_server.sensor.writer.SensorReadingWriter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.atomic.AtomicInteger;

@Slf4j
@Component
@RequiredArgsConstructor
@Profile("queued")
public class SensorReadingBuffer {

    private final SensorReadingWriter writer;
    // 몇 개 모이면 flush할지 기준
    // flush: 버퍼(임시 저장 공간)에 쌓여있던 데이터를 최종 목적지(현재는 DB)에 밀어내는 동작
    private static final int BATCH_SIZE = 200;

    private final BlockingQueue<SensorReading> buffer = new LinkedBlockingQueue<>();
    // 큐가 꽉 차서(bounded로 바꿨을 때) 못 넣고 버린 개수 카운트
    private final AtomicInteger droppedCount = new AtomicInteger(0);

    public boolean offer(SensorReading sensorReading){
        // 데이터를 큐에 넣으려고 시도
        // 넣기 성공 -> true 큐 꽉 차서 못 넣음 false
        boolean accepted = buffer.offer(sensorReading);
        if (!accepted) {
            droppedCount.incrementAndGet();
            log.warn("Buffer full, dropping reading: deviceId={}", sensorReading.getDeviceId());
        }
        return accepted;
    }

    private synchronized void flush(){
        if (buffer.isEmpty()) return;

        List<SensorReading> batch  = new ArrayList<>();
        //큐에서 데이터를 꺼내서 빈 리스트에 옮겨 담는데 최대 BATCH_SIZE까지만
        buffer.drainTo(batch, BATCH_SIZE);

        if (batch.isEmpty()) return;

        try {
            writer.writeBatch(batch);
            log.info("Flushed {} readings", batch.size());
        } catch (Exception e){
            // TODO: 실패한 배치를 dead-letter 컬렉션에 저장하거나 재시도 큐로 보내는 처리 추가 예정
            log.error("Bulk insert failed for batch size={}", batch.size(), e);
        }
    }

    @Scheduled(fixedDelay = 500)
    public void flushByTime(){
        flush();
    }

    /**
     * 개수 기준 flush: 큐에 BATCH_SIZE(200개) 이상 쌓이면 바로 저장
     * 핸들러(SensorMessageHandler)에서 offer() 직후 호출해줌
     */
    public void flushFull(){
        if (buffer.size() >= BATCH_SIZE) flush();
    }

    /** 모니터링용: 지금 큐에 몇 개 쌓여있는지 */
    public int getBufferSize() {
        return buffer.size();
    }

    /** 모니터링용: 지금까지 몇 개 버려졌는지 */
    public int getDroppedCount() {
        return droppedCount.get();
    }

}
