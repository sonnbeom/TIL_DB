package com.example.concurrency_lab.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "course_time_slot")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseTimeSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long courseId;
    private Long timeSlotId;
}

/*
* 강의가 어떤 시간대에 열리는가"를 저장하는 테이블
* 강의 자체가 원래 갖고 있는 시간표 정보예요.
*
CourseTimeSlot(courseId=101, timeSlotId=1)  → "자료구조(101)는 월요일 3교시에 열린다"
CourseTimeSlot(courseId=101, timeSlotId=5)  → "자료구조(101)는 수요일 3교시에도 열린다" (주 2회 수업)
* */