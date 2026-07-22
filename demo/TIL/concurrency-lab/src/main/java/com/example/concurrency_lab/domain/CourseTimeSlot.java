package com.example.concurrency_lab.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "course_time_slot")
public class CourseTimeSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long courseId;
    private Long timeSlotId;
}
