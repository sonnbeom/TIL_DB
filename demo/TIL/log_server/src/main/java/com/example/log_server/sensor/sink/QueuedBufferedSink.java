package com.example.log_server.sensor.sink;


import com.example.log_server.sensor.buffer.SensorReadingBuffer;
import com.example.log_server.sensor.domain.SensorReading;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("queued")
@RequiredArgsConstructor
public class QueuedBufferedSink implements SensorReadingSink {

    private final SensorReadingBuffer buffer;

    @Override
    public void accept(SensorReading reading) {
        buffer.offer(reading);
        buffer.flushFull();
    }
}