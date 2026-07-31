package com.example.concurrency_lab.service;

import com.example.concurrency_lab.domain.Course;
import com.example.concurrency_lab.domain.CourseTimeSlot;
import com.example.concurrency_lab.domain.Enrollment;
import com.example.concurrency_lab.domain.StudentScheduleSlot;
import com.example.concurrency_lab.exception.CapacityExceededException;
import com.example.concurrency_lab.repository.CourseRepository;
import com.example.concurrency_lab.repository.CourseTimeSlotRepository;
import com.example.concurrency_lab.repository.EnrollmentRepository;
import com.example.concurrency_lab.repository.StudentScheduleSlotRepository;
import com.example.concurrency_lab.validator.EnrollmentValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
public class OptimisticEnrollmentExecutor {

    private final CourseRepository courseRepository;
    private final EnrollmentValidator enrollmentValidator;
    private final EnrollmentRepository enrollmentRepository;
    private final CourseTimeSlotRepository courseTimeSlotRepository;
    private final StudentScheduleSlotRepository studentScheduleSlotRepository;

    @Transactional
    public boolean tryEnrollOnce(Long studentId, Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalArgumentException(
                        String.format("해당 id(%d)를 가진 강의를 찾을 수 없습니다.", courseId)
                ));
        enrollmentValidator.validateNotDuplicate(studentId, courseId);
        enrollmentValidator.validateNoTimeConflict(studentId, courseId);
        enrollmentValidator.validateCreditLimit(studentId, course.getCredit());

        if (course.getEnrolled() >= course.getCapacity()) {
            throw new CapacityExceededException("정원이 마감되었습니다.");
        }

        int updatedRows = courseRepository.enrollWithVersionCheck(courseId, course.getVersion());
        if (updatedRows == 0) {
            return false;
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
        return true;
    }
}