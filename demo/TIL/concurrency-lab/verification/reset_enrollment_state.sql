UPDATE course SET enrolled = 0, version = 0;
DELETE FROM student_schedule_slot;
DELETE FROM enrollment;

-- 초기화 확인용
SELECT id, capacity, enrolled FROM course WHERE id <= 20;
SELECT COUNT(*) AS enrollment_count FROM enrollment;
