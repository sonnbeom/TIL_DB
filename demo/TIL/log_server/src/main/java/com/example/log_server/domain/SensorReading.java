package com.example.log_server.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.Map;

/**
 * 공통 envelope + 타입별 유동적인 data 필드로 확장 가능한 스키마.
 *
 * sensorType 예: "temperature", "humidity", "power", "safety"
 * data 예:
 *   temperature -> { value: 23.5, unit: "celsius" }
 *   power       -> { voltage: 220, current: 5.2, power: 1144 }
 *   safety      -> {} (아직 필드 미정, 나중에 채움)
 *
 * DB 전략(단일 컬렉션 vs 분리)은 나중에 결정. 지금은 data를 Map으로 받아
 * 어떤 저장소로 바뀌어도 파싱 로직 자체는 재사용 가능하게 설계.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "sensor_readings")
public class SensorReading {

    @Id
    private String id;

    private Integer schemaVersion;

    private String sensorType;

    private String deviceId;

    /** 센서가 실제로 측정한 시각 (payload의 timestamp) */
    private Instant deviceTimestamp;

    /** 서버가 메시지를 수신한 시각 */
    private Instant receivedAt;

    /** 타입별로 구조가 다른 유동 필드 */
    private Map<String, Object> data;
}
