package com.example.concurrency_lab.service;

import com.example.concurrency_lab.domain.Course;
import com.example.concurrency_lab.domain.CourseTimeSlot;
import com.example.concurrency_lab.domain.Enrollment;
import com.example.concurrency_lab.domain.StudentScheduleSlot;
import com.example.concurrency_lab.dto.EnrollmentRequest;
import com.example.concurrency_lab.dto.EnrollmentResult;
import com.example.concurrency_lab.exception.CapacityExceededException;
import com.example.concurrency_lab.repository.*;
import com.example.concurrency_lab.validator.EnrollmentValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentLockConditionalUpdateEnrollmentService implements EnrollmentService{

    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;
    private final EnrollmentValidator enrollmentValidator;
    private final EnrollmentRepository enrollmentRepository;
    private final CourseTimeSlotRepository courseTimeSlotRepository;
    private final StudentScheduleSlotRepository studentScheduleSlotRepository;

    @Override
    @Transactional
    public EnrollmentResult enroll(EnrollmentRequest enrollmentRequest) {
        Long studentId = enrollmentRequest.getStudentId();
        Long courseId = enrollmentRequest.getCourseId();
        try {
            studentRepository.findById(studentId)
                    .orElseThrow(() -> new IllegalArgumentException(
                            String.format("학생 id(%d)를 가진 학생을 찾을 수 없습니다.", studentId)));
            Course course = courseRepository.findById(courseId)
                    .orElseThrow(() -> new IllegalArgumentException(
                            String.format("강의 id(%d)를 가진 강의를 찾을 수 없습니다.", courseId)));
            enrollmentValidator.validateNotDuplicate(studentId, courseId);
            enrollmentValidator.validateNoTimeConflict(studentId, courseId);
            enrollmentValidator.validateCreditLimit(studentId, course.getCredit());

            int updateRows = courseRepository.enrollIfAvailable(courseId);
            if (updateRows == 0){
                throw new CapacityExceededException(
                        String.format("강의 id(%d)를 가진 정원이 마감되었습니다.", courseId));
            }
            enrollmentRepository.save(
                    Enrollment.builder()
                            .studentId(studentId)
                            .courseId(courseId)
                            .build()
            );

            List<CourseTimeSlot> slots = courseTimeSlotRepository.findByCourseId(courseId);

            for(CourseTimeSlot courseTimeSlot : slots){
                studentScheduleSlotRepository.save(
                        StudentScheduleSlot.builder()
                                .studentId(studentId)
                                .timeSlotId(courseTimeSlot.getTimeSlotId())
                                .build()
                );
            }
            return EnrollmentResult.builder()
                    .success(true)
                    .message("수강신청이 완료되었습니다.")
                    .build();
        }
        catch (RuntimeException e) {
            return EnrollmentResult.builder()
                    .success(false)
                    .message(e.getMessage())
                    .build();
        }
    }
}
