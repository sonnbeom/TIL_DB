package com.example.concurrency_lab.service;

import com.example.concurrency_lab.domain.Course;
import com.example.concurrency_lab.domain.CourseTimeSlot;
import com.example.concurrency_lab.domain.Enrollment;
import com.example.concurrency_lab.domain.StudentScheduleSlot;
import com.example.concurrency_lab.dto.EnrollmentRequest;
import com.example.concurrency_lab.dto.EnrollmentResult;
import com.example.concurrency_lab.exception.CapacityExceededException;
import com.example.concurrency_lab.repository.CourseRepository;
import com.example.concurrency_lab.repository.CourseTimeSlotRepository;
import com.example.concurrency_lab.repository.EnrollmentRepository;
import com.example.concurrency_lab.repository.StudentScheduleSlotRepository;
import com.example.concurrency_lab.validator.EnrollmentValidator;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OptimisticLockEnrollmentService implements EnrollmentService {

    private final OptimisticEnrollmentExecutor optimisticEnrollmentExecutor;
    private static final int MAX_RETRY = 20;
    private static final long BASE_BACKOFF_MS = 50;

    @Override
    public EnrollmentResult enroll(EnrollmentRequest enrollmentRequest) {
        Long studentId = enrollmentRequest.getStudentId();
        Long courseId = enrollmentRequest.getCourseId();

        try {
            for (int attempt = 1; attempt <= MAX_RETRY; attempt++) {
                boolean success = optimisticEnrollmentExecutor.tryEnrollOnce(studentId, courseId);  // ← 외부 빈 호출
                if (success) {
                    return EnrollmentResult.builder()
                            .message("수강신청이 완료되었습니다.")
                            .success(true)
                            .build();
                }
                sleepWithBackoff(attempt);
            }
        }
        catch (RuntimeException e) {
            return EnrollmentResult.builder()
                    .success(false)
                    .message(e.getMessage())
                    .build();
        }
        return EnrollmentResult.builder()
                .success(false)
                .message("재시도 횟수를 초과했습니다. 잠시 후 다시 시도해주세요.")
                .build();
    }

    private void sleepWithBackoff(int attempt) {
        try {
            long jitter = (long) (Math.random() * 10);
            long delay = BASE_BACKOFF_MS * attempt + jitter;
            Thread.sleep(delay);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}