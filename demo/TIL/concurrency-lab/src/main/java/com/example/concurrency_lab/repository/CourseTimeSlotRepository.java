package com.example.concurrency_lab.repository;

import com.example.concurrency_lab.domain.CourseTimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseTimeSlotRepository extends JpaRepository<CourseTimeSlot, Long> {

    // 신청하려는 강의의 시간대 목록 조회 (조건3 체크용)
    List<CourseTimeSlot> findByCourseId(Long courseId);
}