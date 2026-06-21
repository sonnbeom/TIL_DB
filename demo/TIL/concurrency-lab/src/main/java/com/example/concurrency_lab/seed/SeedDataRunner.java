package com.example.concurrency_lab.seed;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.stereotype.Component;

import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

/**
 * 실습용 시드 데이터 생성기.
 * 실행 예: --spring.profiles.active=seed
 *
 * 생성 대상: Student(1만명), TimeSlot(45개), Course(500개), CourseTimeSlot
 * 생성하지 않는 것: Enrollment, StudentScheduleSlot (JMeter가 채워나갈 초기 상태이므로 비워둠)
 */
@Slf4j
@Component
@Profile("seed")
@RequiredArgsConstructor
public class SeedDataRunner implements CommandLineRunner {

    private final JdbcTemplate jdbcTemplate;

    private static final int STUDENT_COUNT = 10_000;
    private static final int COURSE_COUNT = 500;
    private static final int TIGHT_CAPACITY_COURSE_COUNT = 20; // 정원 타이트한 "핫스팟" 강좌 개수
    private static final int PERIODS_PER_DAY = 9;
    private static final int BATCH_SIZE = 1000;

    private final Random random = new Random();

    @Override
    public void run(String... args) {
        log.info("=== 시드 데이터 생성 시작 ===");

        seedStudents();
        List<Long> timeSlotIds = seedTimeSlots();
        List<Long> courseIds = seedCourses();
        seedCourseTimeSlots(courseIds, timeSlotIds);

        log.info("=== 시드 데이터 생성 완료 ===");
    }

    private void seedStudents() {
        log.info("학생 {}명 생성 중...", STUDENT_COUNT);

        String sql = "INSERT INTO student (name, student_number) VALUES (?, ?)";

        for (int batchStart = 0; batchStart < STUDENT_COUNT; batchStart += BATCH_SIZE) {
            int batchEnd = Math.min(batchStart + BATCH_SIZE, STUDENT_COUNT);
            int currentBatchSize = batchEnd - batchStart;
            int finalBatchStart = batchStart;

            jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
                @Override
                public void setValues(java.sql.PreparedStatement ps, int i) throws java.sql.SQLException {
                    int studentNo = finalBatchStart + i + 1;
                    ps.setString(1, "학생" + studentNo);
                    ps.setString(2, String.format("S%08d", studentNo));
                }

                @Override
                public int getBatchSize() {
                    return currentBatchSize;
                }
            });
        }

        log.info("학생 생성 완료");
    }

    private List<Long> seedTimeSlots() {
        log.info("TimeSlot 생성 중... (5일 x {}교시)", PERIODS_PER_DAY);

        DayOfWeek[] weekdays = {
                DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY,
                DayOfWeek.THURSDAY, DayOfWeek.FRIDAY
        };

        String sql = "INSERT INTO time_slot (day_of_week, period) VALUES (?, ?)";

        for (DayOfWeek day : weekdays) {
            for (int period = 1; period <= PERIODS_PER_DAY; period++) {
                // day_of_week 컬럼은 TINYINT이므로 문자열("MONDAY")이 아닌 숫자(1~7)로 변환해서 삽입
                jdbcTemplate.update(sql, day.getValue(), period);
            }
        }

        List<Long> ids = jdbcTemplate.queryForList("SELECT id FROM time_slot", Long.class);
        log.info("TimeSlot {}개 생성 완료", ids.size());
        return ids;
    }

    private List<Long> seedCourses() {
        log.info("강좌 {}개 생성 중... (타이트 정원 {}개 포함)", COURSE_COUNT, TIGHT_CAPACITY_COURSE_COUNT);

        String sql = "INSERT INTO course (name, capacity, enrolled, credit, version) VALUES (?, ?, ?, ?, ?)";

        for (int batchStart = 0; batchStart < COURSE_COUNT; batchStart += BATCH_SIZE) {
            int batchEnd = Math.min(batchStart + BATCH_SIZE, COURSE_COUNT);
            int currentBatchSize = batchEnd - batchStart;
            int finalBatchStart = batchStart;

            jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
                @Override
                public void setValues(java.sql.PreparedStatement ps, int i) throws java.sql.SQLException {
                    int courseNo = finalBatchStart + i + 1;

                    boolean isTightCapacity = courseNo <= TIGHT_CAPACITY_COURSE_COUNT;
                    int capacity = isTightCapacity
                            ? 1 + random.nextInt(5)      // 1~5명 (극단적 경쟁용 핫스팟)
                            : 30 + random.nextInt(21);   // 30~50명 (일반 강좌)

                    int credit = 1 + random.nextInt(3);  // 1~3학점

                    ps.setString(1, "강좌" + courseNo);
                    ps.setInt(2, capacity);
                    ps.setInt(3, 0);       // enrolled 초기값
                    ps.setInt(4, credit);
                    ps.setLong(5, 0L);     // version 초기값
                }

                @Override
                public int getBatchSize() {
                    return currentBatchSize;
                }
            });
        }

        List<Long> ids = jdbcTemplate.queryForList("SELECT id FROM course", Long.class);
        log.info("강좌 생성 완료 (id 1~{}이 타이트 정원 핫스팟)", TIGHT_CAPACITY_COURSE_COUNT);
        return ids;
    }

    private void seedCourseTimeSlots(List<Long> courseIds, List<Long> timeSlotIds) {
        log.info("강좌-시간대 매핑 생성 중...");

        List<Object[]> batchArgs = new ArrayList<>();

        for (Long courseId : courseIds) {
            int slotCount = 1 + random.nextInt(2); // 강좌당 1~2개 시간대
            Set<Long> assignedSlots = new HashSet<>();

            int attempts = 0;
            while (assignedSlots.size() < slotCount && attempts < 10) {
                Long slotId = timeSlotIds.get(random.nextInt(timeSlotIds.size()));
                assignedSlots.add(slotId); // Set이라 중복 자동 방지
                attempts++;
            }

            for (Long slotId : assignedSlots) {
                batchArgs.add(new Object[]{courseId, slotId});
            }
        }

        String sql = "INSERT INTO course_time_slot (course_id, time_slot_id) VALUES (?, ?)";

        for (int i = 0; i < batchArgs.size(); i += BATCH_SIZE) {
            List<Object[]> chunk = batchArgs.subList(i, Math.min(i + BATCH_SIZE, batchArgs.size()));
            jdbcTemplate.batchUpdate(sql, chunk);
        }

        log.info("강좌-시간대 매핑 {}건 생성 완료", batchArgs.size());
    }
}