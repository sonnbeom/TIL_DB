package com.example.cahsetest.datagen;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class DataGenController {
    private final DummyDataGenerationService dummyDataGenerationService;
    private final JdbcTemplate jdbcTemplate;

    @PostMapping("/generate-dummy-data")
    public ResponseEntity<String> generate(@RequestParam(defaultValue = "1000000") int count) {
        dummyDataGenerationService.generateAsync(count);
        return ResponseEntity.ok("더미데이터 생성 시작: " + count + "건. GET /api/admin/status 로 진행 확인");
    }

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> status() {
        return ResponseEntity.ok(dummyDataGenerationService.getStatus());
    }

    @PostMapping("/truncate")
    public ResponseEntity<String> truncate() {
        jdbcTemplate.execute("SET FOREIGN_KEY_CHECKS=0");
        jdbcTemplate.execute("TRUNCATE TABLE content_like_stat");
        jdbcTemplate.execute("TRUNCATE TABLE content_like");
        jdbcTemplate.execute("TRUNCATE TABLE content");
        jdbcTemplate.execute("SET FOREIGN_KEY_CHECKS=1");
        return ResponseEntity.ok("초기화 완료");
    }
}
