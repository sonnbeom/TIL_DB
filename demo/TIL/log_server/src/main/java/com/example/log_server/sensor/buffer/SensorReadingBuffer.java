package com.example.log_server.sensor.buffer;

import com.example.log_server.sensor.domain.SensorReading;
import com.example.log_server.sensor.writer.SensorReadingWriter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

@Slf4j
@Component
@RequiredArgsConstructor
public class SensorReadingBuffer {

    private final SensorReadingWriter writer;
    private static final int BATCH_SIZE = 200;

    private final BlockingQueue<SensorReading> buffer = new LinkedBlockingQueue<>();

}
