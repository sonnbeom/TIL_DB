package com.example.concurrency_lab.domain;

import jakarta.persistence.*;

import java.time.DayOfWeek;

@Entity
@Table(name = "time_slot")
public class TimeSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private DayOfWeek dayOfWeek;

    private Integer period;
}
