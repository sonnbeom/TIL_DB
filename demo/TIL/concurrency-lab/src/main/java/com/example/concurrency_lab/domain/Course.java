package com.example.concurrency_lab.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Integer capacity;
    private Integer enrolled;
    private Integer credit;
    private Long version;
}