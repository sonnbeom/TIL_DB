package com.example.concurrency_lab.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "enrollment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Enrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;
    private Long courseId;
}

/*
*
* 이건 **"학생 X가 강의 Y를 신청했다"**는 사실 하나를 저장하는 테이블
Enrollment(studentId=1, courseId=101)  → "학생1은 자료구조(101)를 신청했다
* */