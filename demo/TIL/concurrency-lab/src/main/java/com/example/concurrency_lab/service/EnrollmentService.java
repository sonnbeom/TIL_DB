package com.example.concurrency_lab.service;

import com.example.concurrency_lab.dto.EnrollmentRequest;
import com.example.concurrency_lab.dto.EnrollmentResult;

public interface EnrollmentService {
    EnrollmentResult enroll(EnrollmentRequest request);
}
