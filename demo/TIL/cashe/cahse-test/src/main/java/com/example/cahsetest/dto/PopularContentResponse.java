package com.example.cahsetest.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

public record PopularContentResponse(
        Long id,
        String title,
        LocalDateTime createdAt,
        Long likeCount
) implements Serializable {
}
