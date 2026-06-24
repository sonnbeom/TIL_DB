package com.example.concurrency_lab.repository;

import com.example.concurrency_lab.domain.StudentScheduleSlot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentScheduleSlotRepository extends JpaRepository<StudentScheduleSlot, Long> {

    // 조건3(시간충돌) 애플리케이션 레벨 1차 체크
    boolean existsByStudentIdAndTimeSlotId(Long studentId, Long timeSlotId);

    List<StudentScheduleSlot> findByStudentId(Long studentId);
}