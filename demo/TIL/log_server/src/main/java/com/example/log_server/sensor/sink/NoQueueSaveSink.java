package com.example.log_server.sensor.sink;

import com.example.log_server.sensor.domain.SensorReading;
import com.example.log_server.sensor.repository.SensorReadingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("no-queue")
@RequiredArgsConstructor
public class NoQueueSaveSink implements SensorReadingSink {

    private final SensorReadingRepository repository;

    @Override
    public void accept(SensorReading reading) {
        try {
            Thread.sleep(5);
            repository.save(reading);
        } catch (InterruptedException e){
            Thread.currentThread().interrupt();
        }
    }
}