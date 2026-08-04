package com.example.log_server.sensor.sink;

import com.example.log_server.sensor.domain.SensorReading;

public interface SensorReadingSink {
    void accept(SensorReading reading);

}
