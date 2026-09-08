package com.example.study_os_sql.cofig;

import org.apache.hc.core5.http.HttpHost;
import org.opensearch.client.json.jackson.JacksonJsonpMapper;
import org.opensearch.client.opensearch.OpenSearchClient;
import org.opensearch.client.transport.OpenSearchTransport;
import org.opensearch.client.transport.httpclient5.ApacheHttpClient5TransportBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * OpenSearch 연결 설정만 담당하는 클래스.
 * 여기엔 쿼리 로직이 전혀 없음 - 오직 "연결"까지만 책임진다.
 *
 * 공식 기본 transport인 ApacheHttpClient5TransportBuilder를 사용.
 * (저수준 RestClient 방식은 버전에 따라 HttpHost 타입 충돌이 날 수 있어 지양)
 */
@Configuration
public class OpenSearchConfig {

    @Value("${opensearch.host}")
    private String host;


    @Value("${opensearch.port}")
    private int port;

    @Value("${opensearch.scheme}")
    private String scheme;

    @Bean
    public OpenSearchClient openSearchClient() {
        HttpHost httpHost = new HttpHost(scheme, host, port);

        OpenSearchTransport transport = ApacheHttpClient5TransportBuilder
                .builder(httpHost)
                .setMapper(new JacksonJsonpMapper())
                .build();

        return new OpenSearchClient(transport);
    }
}

