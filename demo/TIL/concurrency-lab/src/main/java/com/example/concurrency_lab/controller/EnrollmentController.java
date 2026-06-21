package com.example.concurrency_lab.controller;

import com.example.concurrency_lab.dto.EnrollmentRequest;
import com.example.concurrency_lab.dto.EnrollmentResult;
import com.example.concurrency_lab.service.EnrollmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    @PostMapping("/enroll")
    public ResponseEntity<EnrollmentResult> enroll(@RequestBody EnrollmentRequest request) {
        EnrollmentResult result = enrollmentService.enroll(request);

        if (result.isSuccess()) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(result);
        }
    }
}
