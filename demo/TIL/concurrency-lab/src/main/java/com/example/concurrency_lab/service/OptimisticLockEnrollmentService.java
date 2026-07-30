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
public class OptimisticLockEnrollmentService implements EnrollmentService{

    private final int MAX_RETRY = 5;
    private final long BASE_BACKOFF_MS = 5;

    private final CourseRepository courseRepository;
    private final EnrollmentValidator enrollmentValidator;
    private final EnrollmentRepository enrollmentRepository;
    private final CourseTimeSlotRepository courseTimeSlotRepository;
    private final StudentScheduleSlotRepository studentScheduleSlotRepository;

    @Override
    public EnrollmentResult enroll(EnrollmentRequest enrollmentRequest) {
        Long studentId = enrollmentRequest.getStudentId();
        Long courseId = enrollmentRequest.getCourseId();

        try {
            for (int attempt = 1; attempt <= MAX_RETRY ; attempt++) {
                boolean success = tryEnrollOnce(studentId, courseId);
                if (success) {
                    return EnrollmentResult.builder()
                            .message("수강신청이 완료되었습니다.")
                            .success(true)
                            .build();
                }
                sleepWithBackoff(attempt);

            }
        }
        catch (RuntimeException e){
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
        }
        catch (InterruptedException e){
            Thread.currentThread().interrupt();
        }
    }

    @Transactional
    public boolean tryEnrollOnce(Long studentId, Long courseId) {

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalArgumentException(
                        String.format("해당 id(%d)를 가진 강의를 찾을 수 없습니다.", courseId)
                ));
        enrollmentValidator.validateNotDuplicate(studentId, courseId);
        enrollmentValidator.validateNoTimeConflict(studentId, courseId);
        enrollmentValidator.validateCreditLimit(studentId, course.getCredit());

        if (course.getEnrolled() >= course.getCapacity()){
            throw new CapacityExceededException("정원이 마감되었습니다.");
        }

        // 3. version 기반 낙관적 락
        int updatedRows = courseRepository.enrollWithVersionCheck(courseId, course.getVersion());
        if (updatedRows == 0){
            return false;
        }
        // 4. 성공시 Enrollment, StudentScheduleSlot 기록
        enrollmentRepository.save(
                Enrollment.builder()
                        .studentId(studentId)
                        .courseId(courseId)
                        .build()
        );

        List<CourseTimeSlot> slots = courseTimeSlotRepository.findByCourseId(courseId);
        for (CourseTimeSlot slot : slots){
            studentScheduleSlotRepository.save(
                    StudentScheduleSlot.builder()
                            .studentId(studentId)
                            .timeSlotId(slot.getTimeSlotId())
                            .build()
            );
        }
        return true;
    }
}
