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

/**
 * MVP 단계.
 * payload 예시: {"value": 23.5}
 * topic 예시:   sensor/dev-001/data  -> deviceId = dev-001
 *
 * 아직 반영 안 한 것 (다음 단계에서 하나씩 추가 예정):
 * - 파싱 실패 시 dead-letter 처리
 * - 중복 수신(QoS1) 멱등성 처리
 * - deviceTimestamp(센서가 보낸 시각) 파싱
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class SensorMessageHandler {

    private final SensorReadingRepository repository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public void handleMessage(Message<?> message) {
        try {
            String topic = (String) message.getHeaders().get(MqttHeaders.RECEIVED_TOPIC);
            String payload = (String) message.getPayload();

            String deviceId = extractDeviceId(topic);
            JsonNode json = objectMapper.readTree(payload);
            double value = json.get("value").asDouble();

            SensorReading reading = SensorReading.builder()
                    .deviceId(deviceId)
                    .value(value)
                    .receivedAt(Instant.now())
                    .build();

            repository.save(reading);
            log.info("Saved reading: device={}, value={}", deviceId, value);

        } catch (Exception e) {
            // TODO: MVP라 일단 로그만 남김. 이후 dead-letter 컬렉션/재처리 큐로 개선 예정
            log.error("Failed to handle message: {}", message, e);
        }
    }

    private String extractDeviceId(String topic) {
        // topic 형식: sensor/{device_id}/data
        String[] parts = topic.split("/");
        return parts.length >= 2 ? parts[1] : "unknown";
    }
}