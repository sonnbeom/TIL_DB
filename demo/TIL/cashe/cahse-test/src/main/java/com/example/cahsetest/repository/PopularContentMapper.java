package com.example.cahsetest.repository;

import com.example.cahsetest.dto.PopularContentResponse;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDateTime;
import java.util.List;

@Mapper
public interface PopularContentMapper {
    List<PopularContentResponse> findTop10(@Param("likedAt") LocalDateTime likedAt);
}
