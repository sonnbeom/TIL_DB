package com.example.study_os_sql.health;

import org.opensearch.client.opensearch.OpenSearchClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 연결이 잘 됐는지만 확인하는 용도.
 * 쿼리(match, bool 등)는 아직 안 씀 - 클러스터 정보 조회(info)만 호출.
 */
@RestController
public class HealthCheckController {

    @Autowired
    private OpenSearchClient client;

    @GetMapping("/health")
    public String checkConnection() throws Exception {
        var info = client.info();
        return "연결 성공! 클러스터명: " + info.clusterName()
                + ", 버전: " + info.version().number();
    }
}
