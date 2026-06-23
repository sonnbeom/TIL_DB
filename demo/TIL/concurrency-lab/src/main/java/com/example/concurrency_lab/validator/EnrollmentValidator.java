package com.example.concurrency_lab.validator;

import com.example.concurrency_lab.domain.Course;
import com.example.concurrency_lab.domain.CourseTimeSlot;
import com.example.concurrency_lab.domain.Enrollment;
import com.example.concurrency_lab.repository.CourseRepository;
import com.example.concurrency_lab.repository.CourseTimeSlotRepository;
import com.example.concurrency_lab.repository.EnrollmentRepository;
import com.example.concurrency_lab.repository.StudentScheduleSlotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class EnrollmentValidator {

    private final EnrollmentRepository enrollmentRepository;
    private final StudentScheduleSlotRepository studentScheduleSlotRepository;
    private final CourseTimeSlotRepository courseTimeSlotRepository;
    private final CourseRepository courseRepository;
    // 조건2: 중복 신청 체크
    public void validateNotDuplicate(Long studentId, Long courseId) {
        if (enrollmentRepository.existsByStudentIdAndCourseId(studentId, courseId)) {
            throw new DuplicateEnrollmentException("이미 신청한 강의입니다.");
        }
    }

    // 조건3: 시간 충돌 체크
    public void validateNoTimeConflict(Long studentId, Long courseId) {
        List<CourseTimeSlot> targetSlots = courseTimeSlotRepository.findByCourseId(courseId);

        for (CourseTimeSlot slot : targetSlots) {
            boolean conflict = studentScheduleSlotRepository
                    .existsByStudentIdAndTimeSlotId(studentId, slot.getTimeSlotId());
            if (conflict) {
                throw new TimeConflictException("시간이 겹치는 강의가 있습니다.");
            }
        }
    }

    // 조건1: 18학점 초과 체크
    public void validateCreditLimit(Long studentId, Integer newCourseCredit) {
        List<Enrollment> enrollments = enrollmentRepository.findByStudentId(studentId);

        int currentCredit = 0;
        for (Enrollment enrollment : enrollments) {
            Course course = courseRepository.findById(enrollment.getCourseId())
                    .orElseThrow(() -> new IllegalStateException("강의 정보를 찾을 수 없습니다."));
            currentCredit = currentCredit + course.getCredit();
        }

        if (currentCredit + newCourseCredit > 18) {
            throw new CreditLimitExceededException("18학점을 초과할 수 없습니다.");
        }
    }
}