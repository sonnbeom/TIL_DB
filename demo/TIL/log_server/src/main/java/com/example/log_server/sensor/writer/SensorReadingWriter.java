package com.example.log_server.sensor.writer;

import com.example.log_server.sensor.domain.SensorReading;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
@Profile("queued")
public class SensorReadingWriter {
    private final MongoTemplate mongoTemplate;

    public void writeBatch(List<SensorReading> sensorReadings){
        if (sensorReadings.isEmpty()) return;
        mongoTemplate.insert(sensorReadings, SensorReading.class);
    }

}
