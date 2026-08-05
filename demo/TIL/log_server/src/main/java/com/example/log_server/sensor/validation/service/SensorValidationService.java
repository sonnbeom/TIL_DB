package com.example.log_server.sensor.validation.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.util.Map;


@Slf4j
@Component
@RequiredArgsConstructor
public class SensorValidationService {

    private final StringRedisTemplate redisTemplate;

    // 센서 타입별 정상 범위를 상수로 고정 (디바이스별 메타데이터 조회 없이, "타입만 알면 범위가 정해진다"는 가벼운 조건)
    private static final double TEMP_MIN = -50, TEMP_MAX = 150;
    private static final double HUMIDITY_MIN = 0, HUMIDITY_MAX = 100;

    // 이상치 판단 기준: "직전 값 대비 이만큼 이상 차이나면 이상치로 본다"는 임계값
    // 센서 타입마다 정상적인 변화 폭이 다르므로 따로 기준을 둠
    private static final double TEMP_SPIKE_THRESHOLD = 15.0;
    private static final double HUMIDITY_SPIKE_THRESHOLD = 20.0;

    /**
     * 유효성 검증만 담당하는 메서드.
     * sensorType에 따라 어떤 검증 로직을 탈지 분기(switch)한다.
     * 검증 통과하면 true, 실패하면 false를 반환 → 호출부(handler)가 false면 저장을 건너뜀
     */
    public boolean isValid(String sensorType, Map<String, Object> data) {
        switch (sensorType) {
            case "temperature":
                // temperature 타입이면 온도 범위(-50~150) 안에 있는지 체크
                return checkRange(data, TEMP_MIN, TEMP_MAX);
            case "humidity":
                // humidity 타입이면 습도 범위(0~100) 안에 있는지 체크
                return checkRange(data, HUMIDITY_MIN, HUMIDITY_MAX);
            case "behavior":
            case "safety":
                // 아직 데이터 스펙이 정해지지 않은 타입들이라,
                // 일단 data 자체가 null이 아니고 비어있지 않은지만 최소한으로 검증
                return data != null && !data.isEmpty();
            default:
                // 정의되지 않은 sensorType이 오면 알 수 없는 타입이라는 경고 로그를 남기고 검증 실패 처리
                log.warn("Unknown sensorType: {}", sensorType);
                return false;
        }
    }
    /**
     * 이상치 탐지 메서드.
     * "이 디바이스의 방금 전 값"을 Redis에서 가져와서, 지금 값과 비교해 급격한 변화가 있는지 판단한다.
     * 이 메서드 안에서 Redis 조회(GET) 1번 + 갱신(SET) 1번, 총 두 번의 네트워크 I/O가 발생한다.
     */
    public boolean isAnomaly(String deviceId, String sensorType, Map<String, Object> data) {
        Object rawValue = data.get("value");

        // value가 숫자 타입이 아니면(예: 없거나 문자열이면) 비교 자체가 불가능하므로 이상치 아님으로 처리하고 종료
        if (!(rawValue instanceof Number)) {
            return false;
        }

        double currentValue = ((Number) rawValue).doubleValue();

        // Redis에 저장할 때 쓸 키. 디바이스마다 각자의 "최근 값"을 구분해서 저장하기 위해 deviceId를 포함시킴
        // 처음 들어오는 디바이스라면 Redis에 값이 없어서 null이 반환됨
        String redisKey = "last-value:" + deviceId;

        sleepMs(2); // Redis GET 전 지연

        String lastValueStr = redisTemplate.opsForValue().get(redisKey); // Redis 조회 (I/O)

        // 이상치 여부를 담을 변수, 기본값은 false(정상)
        boolean anomaly = false;

        // 직전 값이 있을 때만(=처음 들어온 디바이스가 아닐 때만) 비교 수행
        if (lastValueStr != null) {
            // Redis는 문자열로 저장되므로, 비교하려면 다시 숫자(double)로 변환
            double lastValue = Double.parseDouble(lastValueStr);

            // 센서 타입에 따라 다른 임계값 사용 (temperature면 15도, 그 외는 습도 기준 20)
            double threshold = "temperature".equals(sensorType) ? TEMP_SPIKE_THRESHOLD : HUMIDITY_SPIKE_THRESHOLD;


            // 직전 값과 현재 값의 차이(절댓값)가 임계값을 넘으면 이상치로 판단
            if (Math.abs(currentValue - lastValue) > threshold) {
                anomaly = true;
                log.warn("Anomaly detected: deviceId={}, last={}, current={}", deviceId, lastValue, currentValue);
            }
        }

        // 이번에 받은 값을 "최신 값"으로 Redis에 갱신 (I/O 발생 지점 ②)
        // 다음 메시지가 올 때 이 값과 비교하기 위해 항상 최신 상태로 유지해야 함
        sleepMs(2); // Redis SET 전 지연
        redisTemplate.opsForValue().set(redisKey, String.valueOf(currentValue)); // Redis 갱신 (I/O)

        // 최종적으로 이상치였는지 여부를 호출부에 알려줌
        return anomaly;
    }

    private boolean checkRange(Map<String, Object> data, double min, double max) {
        Object rawValue = data.get("value");
        if (!(rawValue instanceof Number)) {
            return false;
        }
        double value = ((Number) rawValue).doubleValue();
        return value >= min && value <= max;
    }
    private void sleepMs(long ms) {
        try {
            Thread.sleep(ms);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
