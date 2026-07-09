package com.example.cahsetest.config;


import org.springframework.context.annotation.Bean;
import tools.jackson.databind.ObjectMapper;
import tools.jackson.databind.SerializationFeature;

@Configuration
public class RedisConfig {
    /**
     * Redis에 캐시 값을 저장/조회할 때 쓰는 전용 ObjectMapper.
     * StringRedisTemplate + 이 ObjectMapper 조합으로 수동 JSON 직렬화를 합니다
     * (GenericJackson2JsonRedisSerializer의 @class 타입 정보 임베딩 방식에 기대지 않기 위함 —
     *  record 같은 final 클래스는 타입 정보가 정확히 안 붙는 경우가 있어서 역직렬화가 깨질 수 있음).
     */
    @Bean
    public ObjectMapper redisObjectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());          // LocalDateTime 직렬화 지원
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS); // 타임스탬프(숫자) 대신 ISO 문자열로
        return mapper;
    }
}
