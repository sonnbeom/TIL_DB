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
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FullPessimisticLockEnrollmentService implements EnrollmentService{

    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;
    private final EnrollmentValidator enrollmentValidator;
    private final CourseTimeSlotRepository courseTimeSlotRepository;
    private final StudentScheduleSlotRepository studentScheduleSlotRepository;
    private final EnrollmentRepository enrollmentRepository;

    @Override
    @Transactional
    public EnrollmentResult enroll(EnrollmentRequest enrollmentRequest) {
        Long studentId = enrollmentRequest.getStudentId();
        Long courseId = enrollmentRequest.getCourseId();

        try {
            // 1. Student 락
            studentRepository.findByIdForUpdate(studentId)
                    .orElseThrow(() -> new IllegalArgumentException(
                            String.format("해당 id(%d)를 가진 학생을 찾을 수 없습니다.", studentId)
                    ));
            // 2. Course 락
            Course course = courseRepository.findByIdForUpdate(courseId)
                    .orElseThrow(() -> new IllegalArgumentException(
                            String.format("해당 id(%d)를 가진 강의를 찾을 수 없습니다.", courseId)
                    ));

            // 3. 검증
            enrollmentValidator.validateNotDuplicate(studentId, courseId);
            enrollmentValidator.validateNoTimeConflict(studentId, courseId);
            enrollmentValidator.validateCreditLimit(studentId, course.getCredit());

            // 4. 등록 가능한지 체크
            if (course.getEnrolled() >= course.getCapacity()){
                throw new CapacityExceededException("정원이 마감되었습니다");
            }

            course.setEnrolled(course.getEnrolled() + 1);


            enrollmentRepository.save(
                    Enrollment.builder()
                            .studentId(studentId)
                            .courseId(courseId)
                            .build()
            );
            List<CourseTimeSlot> slots = courseTimeSlotRepository.findByCourseId(courseId);
            for (CourseTimeSlot courseTimeSlot: slots){
                studentScheduleSlotRepository.save(
                        StudentScheduleSlot.builder()
                                .timeSlotId(courseTimeSlot.getTimeSlotId())
                                .studentId(studentId)
                                .build()
                );
            }
            return EnrollmentResult.builder()
                    .success(true)
                    .message("수강신청이 완료되엇습니다")
                    .build();
        }
        catch (RuntimeException e){
            return EnrollmentResult.builder()
                    .success(false)
                    .message(e.getMessage())
                    .build();
        }
    }
}
