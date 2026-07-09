package com.example.cahsetest.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "content_like")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContentLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "content_id", nullable = false)
    private Long contentId;

    @Column(name = "liked_at", nullable = false)
    private LocalDateTime likedAt;
}
