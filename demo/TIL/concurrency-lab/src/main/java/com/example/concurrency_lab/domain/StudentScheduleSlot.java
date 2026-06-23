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
