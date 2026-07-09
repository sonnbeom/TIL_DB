package com.example.cahsetest.repository;

import com.example.cahsetest.domain.ContentLikeStat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface ContentLikeStatRepository extends JpaRepository<ContentLikeStat, Long> {

    /** 좋아요 upsert(있으면 +1) 하기 전에, 해당 콘텐츠+시점의 집계 row가 있는지 조회 */
    Optional<ContentLikeStat> findByContentIdAndLikedAt(Long contentId, LocalDateTime likedAt);
}