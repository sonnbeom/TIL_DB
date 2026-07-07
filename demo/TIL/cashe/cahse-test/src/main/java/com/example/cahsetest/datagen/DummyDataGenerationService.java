package com.example.cahsetest.datagen;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicLong;
/**
 * Content 100만 건 + ContentLikeStat(2024~2026년 3개년 x 100만 = 300만 row)을
 * 순수 JDBC batch insert로 생성합니다 (JPA save 대신 쓰는 이유: 100만 건 단위에서
 * 영속성 컨텍스트가 계속 커지는 JPA보다 훨씬 빠르고 메모리도 적게 씀).
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class DummyDataGenerationService {
    private static final int BATCH_SIZE = 1000;
    private static final int[] YEARS = {2024, 2025, 2026};

    private final JdbcTemplate jdbcTemplate;

    private final AtomicBoolean running = new AtomicBoolean(false);
    private final AtomicLong generatedCount = new AtomicLong(0);
    private volatile int targetCount = 0;

    @Async
    public void generateAsync(int totalCount) {
        generate(totalCount);
    }

    public void generate(int totalCount) {
        if (!running.compareAndSet(false, true)) {
            log.warn("이미 생성 중입니다. 요청 무시");
            return;
        }

        targetCount = totalCount;
        generatedCount.set(0);

        try {
            LocalDateTime baseCreatedAt = LocalDateTime.of(2024, 1, 1, 0, 0);
            ThreadLocalRandom random = ThreadLocalRandom.current();

            final String insertContentSql = "INSERT INTO content (title, created_at) VALUES (?, ?)";
            final String insertStatSql = "INSERT INTO content_like_stat (content_id, liked_at, like_count) VALUES (?, ?, ?)";

            long startedAt = System.currentTimeMillis();

            for (int done = 0; done < totalCount; done += BATCH_SIZE) {
                int currentBatchSize = Math.min(BATCH_SIZE, totalCount - done);

                // 1) Content 배치 insert
                List<Object[]> contentParams = new ArrayList<>(currentBatchSize);
                for (int i = 0; i < currentBatchSize; i++) {
                    long globalIndex = done + i;
                    contentParams.add(new Object[]{
                            "Content #" + globalIndex,
                            baseCreatedAt.plusMinutes(globalIndex % (60L * 24 * 365))
                    });
                }
                jdbcTemplate.batchUpdate(insertContentSql, contentParams);

                // 2) 방금 넣은 id들 복구 (단일 스레드 생성이라 auto-increment가 단조 증가함을 이용)
                List<Long> ids = jdbcTemplate.query(
                        "SELECT id FROM content ORDER BY id DESC LIMIT ?",
                        (rs, rowNum) -> rs.getLong("id"),
                        currentBatchSize
                );

                // 3) 콘텐츠 1개당 2024/2025/2026 3개 row 생성
                List<Object[]> statParams = new ArrayList<>(currentBatchSize * YEARS.length);
                for (Long id : ids) {
                    for (int year : YEARS) {
                        LocalDateTime bucket = LocalDateTime.of(year, 1, 1, 0, 0);
                        long likeCount = random.nextLong(0, 500_001);
                        statParams.add(new Object[]{id, bucket, likeCount});
                    }
                }
                jdbcTemplate.batchUpdate(insertStatSql, statParams);

                generatedCount.addAndGet(currentBatchSize);
                if ((done / BATCH_SIZE) % 100 == 0) {
                    log.info("더미데이터 생성 진행: {} / {}", generatedCount.get(), totalCount);
                }
            }

            log.info("더미데이터 생성 완료: {} 건, {} ms 소요", generatedCount.get(),
                    System.currentTimeMillis() - startedAt);
        } catch (Exception e) {
            log.error("더미데이터 생성 실패", e);
        } finally {
            running.set(false);
        }
    }

    public Map<String, Object> getStatus() {
        Long contentCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM content", Long.class);
        Long statCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM content_like_stat", Long.class);
        return Map.of(
                "running", running.get(),
                "targetCount", targetCount,
                "generatedCount", generatedCount.get(),
                "contentRowsInDb", contentCount,
                "contentLikeStatRowsInDb", statCount
        );
    }
}
