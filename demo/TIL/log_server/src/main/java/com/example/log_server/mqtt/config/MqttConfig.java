package com.example.log_server.mqtt.config;

import com.example.log_server.mqtt.handler.SensorMessageHandler;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.integration.channel.DirectChannel;
import org.springframework.integration.mqtt.core.DefaultMqttPahoClientFactory;
import org.springframework.integration.mqtt.core.MqttPahoClientFactory;
import org.springframework.integration.mqtt.inbound.MqttPahoMessageDrivenChannelAdapter;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageHandler;

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

    @Bean
    public MessageChannel mqttInputChannel() {
        return new DirectChannel();
        // TODO: 트래픽 늘어나면 ExecutorChannel로 교체해서 컨슈머 스레드 블로킹 방지 (서버쪽 부하 항목)
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
    // 채널 설정 코드 mqttInputChannel 채널을 구독하겠다
    @ServiceActivator(inputChannel = "mqttInputChannel")
    // Spring이 SensorMessageHandler 타입의 빈을 찾아서 DI
    public MessageHandler handler(SensorMessageHandler sensorMessageHandler) {
        return sensorMessageHandler::handleMessage;
    }
}
