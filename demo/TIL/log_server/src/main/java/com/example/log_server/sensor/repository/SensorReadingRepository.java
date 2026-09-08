package com.example.log_server.sensor.repository;

import com.example.log_server.sensor.domain.SensorReading;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SensorReadingRepository extends MongoRepository<SensorReading, String> {
}
