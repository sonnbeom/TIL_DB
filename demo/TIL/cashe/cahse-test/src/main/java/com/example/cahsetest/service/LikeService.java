package com.example.cahsetest.service;

import com.example.cahsetest.domain.ContentLike;
import com.example.cahsetest.domain.ContentLikeStat;
import com.example.cahsetest.repository.ContentLikeRepository;
import com.example.cahsetest.repository.ContentLikeStatRepository;
import org.springframework.data.redis.core.StringRedisTemplate;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

/**
 * 좋아요 토글(누르기/취소) + 집계 갱신 + 캐시 evict.
 * (userId, contentId) 기준으로 이미 눌렀으면 취소, 안 눌렀으면 등록합니다.
 */
@Service
@RequiredArgsConstructor
public class LikeService {
    private static final String CACHE_KEY_PREFIX = "popular:";

    private final ContentLikeRepository contentLikeRepository;
    private final ContentLikeStatRepository contentLikeStatRepository;
    private final StringRedisTemplate redisTemplate;

    @Value("${app.cache.enabled:true}")
    private boolean cacheEnabled;

    @Transactional
    public void toggleLike(Long userId, Long contentId, int year) {
        LocalDateTime bucket = LocalDateTime.of(year, 1, 1, 0, 0);
        boolean alreadyLiked = contentLikeRepository.existsByUserIdAndContentId(userId, contentId);

        if (alreadyLiked) {
            contentLikeRepository.deleteByUserIdAndContentId(userId, contentId);
            decreaseStat(contentId, bucket);
        } else {
            contentLikeRepository.save(
                    ContentLike.builder()
                            .userId(userId)
                            .contentId(contentId)
                            .likedAt(LocalDateTime.now())
                            .build()
            );
            increaseStat(contentId, bucket);
        }

        if (cacheEnabled) {
            redisTemplate.delete(CACHE_KEY_PREFIX + year);
        }
    }

    private void increaseStat(Long contentId, LocalDateTime bucket) {
        Optional<ContentLikeStat> existing = contentLikeStatRepository.findByContentIdAndLikedAt(contentId, bucket);
        if (existing.isPresent()) {
            ContentLikeStat stat = existing.get();
            stat.setLikeCount(stat.getLikeCount() + 1);
            contentLikeStatRepository.save(stat);
        } else {
            contentLikeStatRepository.save(
                    ContentLikeStat.builder()
                            .contentId(contentId)
                            .likedAt(bucket)
                            .likeCount(1L)
                            .build()
            );
        }
    }

    private void decreaseStat(Long contentId, LocalDateTime bucket) {
        contentLikeStatRepository.findByContentIdAndLikedAt(contentId, bucket)
                .ifPresent(stat -> {
                    stat.setLikeCount(Math.max(0, stat.getLikeCount() - 1));
                    contentLikeStatRepository.save(stat);
                });
    }
}
