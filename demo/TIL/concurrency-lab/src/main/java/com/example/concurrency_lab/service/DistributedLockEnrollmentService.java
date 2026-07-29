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
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class DistributedLockEnrollmentService implements EnrollmentService{
    private static final long LOCK_TTL_MS = 3000L;
    private static final int MAX_LOCK_RETRY = 10;
    private static final long LOCK_RETRY_INTERVAL_MS = 50L;

    private final RedisLockService redisLockService;
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final StudentScheduleSlotRepository studentScheduleSlotRepository;
    private final CourseTimeSlotRepository courseTimeSlotRepository;
    private final EnrollmentValidator validator;

    @Override
    public EnrollmentResult enroll(EnrollmentRequest request) {
        Long studentId = request.getStudentId();
        Long courseId = request.getCourseId();
        String lockValue = UUID.randomUUID().toString();

        boolean locked = false;
        try {
            locked = acquireLockWithRetry(courseId, lockValue);
            if (!locked) {
                return EnrollmentResult.builder()
                        .success(false)
                        .message("현재 요청이 많아 처리할 수 없습니다. 다시 시도해주세요.")
                        .build();
            }

            return doEnroll(studentId, courseId);

        } catch (RuntimeException e) {
            return EnrollmentResult.builder()
                    .success(false)
                    .message(e.getMessage())
                    .build();
        } finally {
            if (locked) {
                redisLockService.unlock(courseId, lockValue);
            }
        }
    }

    private boolean acquireLockWithRetry(Long courseId, String lockValue) {
        for (int i = 0; i < MAX_LOCK_RETRY; i++) {
            if (redisLockService.tryLock(courseId, lockValue, LOCK_TTL_MS)) {
                return true;
            }
            try {
                Thread.sleep(LOCK_RETRY_INTERVAL_MS);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                return false;
            }
        }
        return false;
    }

    @Transactional
    public EnrollmentResult doEnroll(Long studentId, Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalArgumentException("강의를 찾을 수 없습니다."));

        validator.validateNotDuplicate(studentId, courseId);
        validator.validateNoTimeConflict(studentId, courseId);
        validator.validateCreditLimit(studentId, course.getCredit());

        int updatedRows = courseRepository.enrollIfAvailable(courseId);
        if (updatedRows == 0) {
            throw new CapacityExceededException("정원이 마감되었습니다.");
        }

        enrollmentRepository.save(
                Enrollment.builder()
                        .studentId(studentId)
                        .courseId(courseId)
                        .build()
        );

        List<CourseTimeSlot> slots = courseTimeSlotRepository.findByCourseId(courseId);
        for (CourseTimeSlot slot : slots) {
            studentScheduleSlotRepository.save(
                    StudentScheduleSlot.builder()
                            .studentId(studentId)
                            .timeSlotId(slot.getTimeSlotId())
                            .build()
            );
        }

        return EnrollmentResult.builder()
                .success(true)
                .message("수강신청이 완료되었습니다.")
                .build();
    }

}
