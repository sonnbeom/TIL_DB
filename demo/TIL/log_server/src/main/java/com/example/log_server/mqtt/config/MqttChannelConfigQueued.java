package com.example.log_server.mqtt.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.integration.channel.ExecutorChannel;
import org.springframework.messaging.MessageChannel;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@Configuration
@Profile("queued")
public class MqttChannelConfigQueued {

    // 메시지가 도착하면 어떤 경로로 어떤 스레드가 처리하게 할지 정리하는
    /*
    * "경로"라는 표현이 가리키는 것

    채널(Channel) 자체가 여러 종류가 있고, 그 종류에 따라 메시지가 흘러가는 방식이 다르다.
    * 스프링 인티그레이션에는 MessageChannel의 구현체가 여러 개 있는데, 대표적으로:

    DirectChannel	보낸 스레드가 그대로 이어서 받는 쪽 로직까지 직접 실행 (동기)
    ExecutorChannel	보낸 스레드는 큐에 넣고 끝, 별도 스레드풀이 나중에 꺼내서 실행 (비동기)
    QueueChannel	메시지를 큐에 쌓아두고, 누군가 명시적으로 꺼내가야만(poll) 처리됨
    PublishSubscribeChannel	하나의 메시지를 여러 구독자에게 동시에 전달
    *
    * */

    @Bean(name = "mqttInputChannel")
    @Profile("queued")
    public MessageChannel mqttInputChannel() {

        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();

        // 기본으로 항상 대기시켜 둘 워커 스레드 수 (메시지가 없어도 4개는 항상 살아있음)
        executor.setCorePoolSize(4);

        // 트래픽이 몰릴 때 최대 몇개까지 워커 스레드를 늘릴 수 있는지
        executor.setMaxPoolSize(8);

        //워커가 처리하기 전 메시지를 대기시켜줄 큐의 최대 크기
        //최대 크기만큼 꽉 차면 maxPoolSize까지 스레드가 늘어남
        executor.setQueueCapacity(2000);

        // 이 스레드풀이 만드는 워커 스레드들의 이름 접두사
        // 로그/스레드 덤프에서 식별하기 쉽게 하는 용도, 동작에는 영향 없음
        executor.setThreadNamePrefix("sensor-worker-");

        // 지금까지 설정한 값으로 실제 스레드풀을 생성(초기화) 생략하면 동작 안함
        executor.initialize();

        // 만든 스레드풀(executor)을 스프링 안티그레이션의 ExecutorChannel로 감싸서 반환
        return new ExecutorChannel(executor);
    }
}
