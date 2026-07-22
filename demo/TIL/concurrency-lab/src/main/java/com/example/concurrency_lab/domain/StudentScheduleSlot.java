package com.example.concurrency_lab.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "student_schedule_slot")
public class StudentScheduleSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;
    private Long timeSlotId;
}
