package com.example.cahsetest.repository;

import com.example.cahsetest.domain.Content;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContentRepository extends JpaRepository<Content, Long> {
}
