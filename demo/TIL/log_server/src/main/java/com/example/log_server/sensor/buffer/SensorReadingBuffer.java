package com.example.log_server.sensor.buffer;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class SensorReadingBuffer {
    private final MongoTemplate mongoTemplate;

    private static final int BATCH_SIZE = 200;
}
