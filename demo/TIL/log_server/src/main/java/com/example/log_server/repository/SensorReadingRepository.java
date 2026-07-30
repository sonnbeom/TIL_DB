package com.example.log_server.repository;

import com.example.log_server.domain.SensorReading;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SensorReadingRepository extends MongoRepository<SensorReading, String> {
}
