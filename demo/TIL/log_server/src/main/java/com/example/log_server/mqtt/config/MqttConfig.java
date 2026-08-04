package com.example.log_server.mqtt.config;

import com.example.log_server.mqtt.handler.SensorMessageHandler;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.integration.channel.DirectChannel;
import org.springframework.integration.channel.ExecutorChannel;
import org.springframework.integration.mqtt.core.DefaultMqttPahoClientFactory;
import org.springframework.integration.mqtt.core.MqttPahoClientFactory;
import org.springframework.integration.mqtt.inbound.MqttPahoMessageDrivenChannelAdapter;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageHandler;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.ThreadPoolExecutor;

@Configuration
public class MqttConfig {
    @Value("${mqtt.broker-url}")
    private String brokerUrl;

    @Value("${mqtt.client-id}")
    private String clientId;

    @Value("${mqtt.topic-filter}")
    private String topicFilter;

    @Value("${mqtt.qos}")
    private int qos;

    @Bean
    public MqttPahoClientFactory mqttClientFactory() {
        DefaultMqttPahoClientFactory factory = new DefaultMqttPahoClientFactory();
        MqttConnectOptions options = new MqttConnectOptions();
        options.setServerURIs(new String[]{brokerUrl});
        options.setCleanSession(true); // TODO: persistent session 검토 (네트워크 단절 처리 항목에서 false로 전환 예정)
        options.setAutomaticReconnect(true);
        factory.setConnectionOptions(options);
        return factory;
    }

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
    @Bean
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

    @Bean
    public MqttPahoMessageDrivenChannelAdapter mqttInbound() {
        MqttPahoMessageDrivenChannelAdapter adapter =
                new MqttPahoMessageDrivenChannelAdapter(
                        clientId, mqttClientFactory(), topicFilter);
        adapter.setCompletionTimeout(5000);
        adapter.setQos(qos);
        adapter.setOutputChannel(mqttInputChannel());
        return adapter;
    }
    @Bean
    // 채널 설정 코드 mqttInputChannel 채널을 구독하겠다 메시지가 도착했을 때 실제로 뭘 할지 여기서는 handleMessage를 실행하겠다 선언
    @ServiceActivator(inputChannel = "mqttInputChannel")
    // Spring이 SensorMessageHandler 타입의 빈을 찾아서 DI
    public MessageHandler handler(SensorMessageHandler sensorMessageHandler) {
        return sensorMessageHandler::handleMessage;
    }
}
