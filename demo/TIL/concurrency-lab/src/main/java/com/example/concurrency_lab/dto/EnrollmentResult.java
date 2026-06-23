package com.example.concurrency_lab.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class EnrollmentResult {
    private boolean success;
    private String message;   // 실패 사유 (정원마감, 학점초과, 중복신청, 시간충돌 등)
}