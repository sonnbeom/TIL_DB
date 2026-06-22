package com.example.concurrency_lab.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "student_schedule_slot")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentScheduleSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;
    private Long timeSlotId;
}
/*
* 이건 **"학생이 어떤 시간대를 이미 점유했는가"**를 저장하는 테이블입니다.
StudentScheduleSlot(studentId=1, timeSlotId=1)  → "학생1은 월요일 3교시를 이미 쓰고 있다"
*
* 이건 학생이 실제로 신청 행위를 해야만 생기는 데이터입니다 (즉 Enrollment가 생길 때 같이 생김).
*  새로운 강의를 신청하려 할 때,
*  이 테이블을 보고 "그 학생이 이미 이 시간대를 쓰고 있나?"를 확인해서 시간 충돌을 판단합니다.
*
 */