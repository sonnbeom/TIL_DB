package com.example.concurrency_lab.repository;

import com.example.concurrency_lab.domain.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    // 조건2(중복신청) 애플리케이션 레벨 1차 체크
    boolean existsByStudentIdAndCourseId(Long studentId, Long courseId);

    // 조건1(18학점 계산)용 - 학생의 신청 강의 목록 조회
    List<Enrollment> findByStudentId(Long studentId);
}