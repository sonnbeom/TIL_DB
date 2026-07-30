package com.example.log_server.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

/**
 * MVP 단계 스키마.
 * - deviceTimestamp: 센서가 찍은 시각 (센서 시계 오차 이슈 대비, 추후 반영 예정)
 * - receivedAt: 서버가 메시지를 받은 시각
 * 지금은 receivedAt만 채우고, deviceTimestamp는 payload에 필드가 오면 채우도록
 * 다음 단계에서 확장할 예정.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "sensor_readings")
public class SensorReading {

    @Id
    private String id;

    private String deviceId;

    private Double value;

    private Instant receivedAt;
}
