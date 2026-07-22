package com.example.concurrency_lab.repository;

import com.example.concurrency_lab.domain.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {

    // 후보1(무지성 비관적 락)용 - Course도 SELECT FOR UPDATE로 잠금
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT c FROM Course c WHERE c.id = :id")
    Optional<Course> findByIdForUpdate(@Param("id") Long id);

    // 아이디어1용 - 조건부 원자적 UPDATE (짧은 락)
    @Modifying
    @Query("UPDATE Course c SET c.enrolled = c.enrolled + 1 WHERE c.id = :id AND c.enrolled < c.capacity")
    int enrollIfAvailable(@Param("id") Long id);

    // 후보2(낙관적 락)용 - version 기반 CAS
    @Modifying
    @Query("UPDATE Course c SET c.enrolled = c.enrolled + 1, c.version = c.version + 1 " +
            "WHERE c.id = :id AND c.version = :version AND c.enrolled < c.capacity")
    int enrollWithVersionCheck(@Param("id") Long id, @Param("version") Long version);

    // 후보2용 - 재시도 시 최신 값 재조회 (락 없이 그냥 조회)
    Optional<Course> findById(Long id);   // JpaRepository 기본 제공, 명시적으로 재확인용

    // 후보3(분산 락)용 - Redis 락을 이미 획득한 상태에서 호출, DB에는 단순 조건부 UPDATE
    // (아이디어1의 enrollIfAvailable을 그대로 재사용 가능)
}