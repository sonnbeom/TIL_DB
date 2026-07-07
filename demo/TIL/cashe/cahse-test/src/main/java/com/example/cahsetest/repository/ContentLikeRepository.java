package com.example.cahsetest.repository;

import com.example.cahsetest.domain.ContentLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContentLikeRepository extends JpaRepository<ContentLike, Long> {

    /** 이미 좋아요 눌렀는지 체크 (중복 방지) */
    boolean existsByUserIdAndContentId(Long userId, Long contentId);

    /** 좋아요 취소 시 원본 기록 삭제 */
    void deleteByUserIdAndContentId(Long userId, Long contentId);
}
