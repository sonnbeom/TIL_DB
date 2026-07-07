package com.example.cahsetest.controller;

import com.example.cahsetest.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LikeController {
    private final LikeService likeService;

    /** POST /api/contents/1/like?userId=100&year=2026 — 누르기/취소 토글 */
    @PostMapping("/api/contents/{contentId}/like")
    public ResponseEntity<Void> toggleLike(
            @PathVariable Long contentId,
            @RequestParam Long userId,
            @RequestParam int year
    ) {
        likeService.toggleLike(userId, contentId, year);
        return ResponseEntity.ok().build();
    }
}
