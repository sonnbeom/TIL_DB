package com.example.cahsetest.domain;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "content_like_stat")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContentLikeStat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "content_id", nullable = false)
    private Long contentId;

    @Column(name = "liked_at", nullable = false)
    private LocalDateTime likedAt;

    @Column(name = "like_count", nullable = false)
    private Long likeCount;
}
