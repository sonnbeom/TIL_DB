package com.example.concurrency_lab.repository;

import com.example.concurrency_lab.domain.TimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimeSlotRepository extends JpaRepository<TimeSlot, Long> {
    // 기본 CRUD로 충분 (시드 데이터 생성 시에만 주로 사용)
}