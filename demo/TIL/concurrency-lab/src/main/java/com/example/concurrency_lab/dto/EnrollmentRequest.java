package com.example.concurrency_lab.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class EnrollmentRequest {
    private Long studentId;
    private Long courseId;
}