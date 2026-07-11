CREATE TABLE IF NOT EXISTS content (
                                       id         BIGINT AUTO_INCREMENT PRIMARY KEY,
                                       title      VARCHAR(200) NOT NULL,
    created_at DATETIME     NOT NULL
    ) ENGINE = InnoDB;

-- 좋아요 원본 기록 (누가, 언제, 어떤 콘텐츠) : 중복 방지 + 좋아요 취소용
CREATE TABLE IF NOT EXISTS content_like (
                                            id         BIGINT AUTO_INCREMENT PRIMARY KEY,
                                            user_id    BIGINT   NOT NULL,
                                            content_id BIGINT   NOT NULL,
                                            liked_at   DATETIME NOT NULL,
                                            CONSTRAINT fk_content_like_content
                                            FOREIGN KEY (content_id) REFERENCES content (id),
    CONSTRAINT uq_user_content
    UNIQUE (user_id, content_id)
    ) ENGINE = InnoDB;

-- 좋아요 집계 롤업 (조회용 비정규화)
CREATE TABLE IF NOT EXISTS content_like_stat (
                                                 id         BIGINT AUTO_INCREMENT PRIMARY KEY,
                                                 content_id BIGINT   NOT NULL,
                                                 liked_at   DATETIME NOT NULL,
                                                 like_count BIGINT   NOT NULL DEFAULT 0,
                                                 CONSTRAINT fk_content_like_stat_content
                                                 FOREIGN KEY (content_id) REFERENCES content (id),
    CONSTRAINT uq_content_liked_at
    UNIQUE (content_id, liked_at)
    ) ENGINE = InnoDB;

-- WHERE liked_at = ? ORDER BY like_count DESC LIMIT 10 을 인덱스로 처리
CREATE INDEX idx_liked_at_like_count
    ON content_like_stat (liked_at, like_count DESC);