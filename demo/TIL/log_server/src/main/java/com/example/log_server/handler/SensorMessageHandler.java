package com.example.log_server.handler;

import com.example.log_server.domain.SensorReading;
import com.example.log_server.repository.SensorReadingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.integration.mqtt.support.MqttHeaders;
import org.springframework.messaging.Message;
import org.springframework.stereotype.Service;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

/**
 * Topic:   sensor/{sensorType}/{deviceId}/data
 * Payload:
 * {
 *   "schemaVersion": 1,
 *   "sensorType": "temperature",
 *   "deviceId": "dev-001",
 *   "timestamp": "2026-07-30T13:24:52.159Z",
 *   "data": { "value": 23.5, "unit": "celsius" }
 * }
 *
 * topic과 payload 둘 다에 sensorType/deviceId가 있는데, payload 쪽을 신뢰 소스로 사용.
 * (topic은 라우팅/구독 필터링용, payload는 실제 데이터 검증용)
 *
 * 아직 반영 안 한 것 (다음 단계 예정):
 * - 파싱 실패 시 dead-letter 처리
 * - 중복 수신(QoS1) 멱등성 처리
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class SensorMessageHandler {

    private final SensorReadingRepository repository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @SuppressWarnings("unchecked")
    public void handleMessage(Message<?> message) {
        try {
            String topic = (String) message.getHeaders().get(MqttHeaders.RECEIVED_TOPIC);
            String payload = (String) message.getPayload();

            JsonNode json = objectMapper.readTree(payload);

            Integer schemaVersion = json.hasNonNull("schemaVersion") ? json.get("schemaVersion").asInt() : 1;
            String sensorType = json.hasNonNull("sensorType") ? json.get("sensorType").asString() : "unknown";
            String deviceId = json.hasNonNull("deviceId") ? json.get("deviceId").asString() : "unknown";
            Instant deviceTimestamp = json.hasNonNull("timestamp")
                    ? Instant.parse(json.get("timestamp").asString())
                    : null;

            // fieldNames() 순회 대신, data 노드를 통째로 Map으로 변환 (Jackson 3 API 변경 이슈 회피)
            Map<String, Object> data = json.hasNonNull("data")
                    ? objectMapper.convertValue(json.get("data"), Map.class)
                    : new HashMap<>();

            SensorReading reading = SensorReading.builder()
                    .schemaVersion(schemaVersion)
                    .sensorType(sensorType)
                    .deviceId(deviceId)
                    .deviceTimestamp(deviceTimestamp)
                    .receivedAt(Instant.now())
                    .data(data)
                    .build();

            repository.save(reading);
            log.info("Saved reading: topic={}, sensorType={}, deviceId={}, data={}",
                    topic, sensorType, deviceId, data);

        } catch (Exception e) {
            // TODO: dead-letter 컬렉션/재처리 큐로 개선 예정
            log.error("Failed to handle message: {}", message, e);
        }
    }
}
