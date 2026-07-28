package com.example.concurrency_lab.repository;

import com.example.concurrency_lab.domain.Enrollment;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    // 조건2(중복신청) 애플리케이션 레벨 1차 체크
    boolean existsByStudentIdAndCourseId(Long studentId, Long courseId);

    // 조건1(18학점 계산)용 - 학생의 신청 강의 목록 조회
    List<Enrollment> findByStudentId(Long studentId);

//    @Query("SELECT COALESCE(SUM(c.credit), 0) FROM Enrollment e " +
//            "JOIN Course c ON e.courseId = c.id " +
//            "WHERE e.studentId = :studentId")
//    Integer sumCreditByStudentId(@Param("studentId") Long studentId);


    @Query(
            value = """
                SELECT COALESCE(SUM(c.credit, 0))
                FROM enrollment e
                JOIN course c ON e.course_id = c.id
                WHERE e.student_id = :studentId
                """,
            nativeQuery = true
    )
    Integer sumCreditsByStudentId(@Param("studentId") long studentId);

}