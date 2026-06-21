-- 반복 실행 안전성을 위해 FK 의존 역순으로 삭제
DROP TABLE IF EXISTS student_schedule_slot;
DROP TABLE IF EXISTS enrollment;
DROP TABLE IF EXISTS course_time_slot;
DROP TABLE IF EXISTS time_slot;
DROP TABLE IF EXISTS course;
DROP TABLE IF EXISTS student;

CREATE TABLE student (
                         id BIGINT AUTO_INCREMENT PRIMARY KEY,
                         name VARCHAR(50) NOT NULL,
                         student_number VARCHAR(20) NOT NULL,
                         CONSTRAINT uq_student_number UNIQUE (student_number)
);

CREATE TABLE course (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        name VARCHAR(100) NOT NULL,
                        capacity INT NOT NULL,
                        enrolled INT NOT NULL DEFAULT 0,
                        credit INT NOT NULL,
                        version BIGINT NOT NULL DEFAULT 0
);

CREATE TABLE time_slot (
                           id BIGINT AUTO_INCREMENT PRIMARY KEY,
                           day_of_week TINYINT NOT NULL,
                           period INT NOT NULL
);

CREATE TABLE course_time_slot (
                                  id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                  course_id BIGINT NOT NULL,
                                  time_slot_id BIGINT NOT NULL,
                                  CONSTRAINT fk_cts_course FOREIGN KEY (course_id) REFERENCES course(id),
                                  CONSTRAINT fk_cts_time_slot FOREIGN KEY (time_slot_id) REFERENCES time_slot(id),
                                  CONSTRAINT uq_course_time_slot UNIQUE (course_id, time_slot_id)
);

CREATE TABLE enrollment (
                            id BIGINT AUTO_INCREMENT PRIMARY KEY,
                            student_id BIGINT NOT NULL,
                            course_id BIGINT NOT NULL,
                            CONSTRAINT fk_enrollment_student FOREIGN KEY (student_id) REFERENCES student(id),
                            CONSTRAINT fk_enrollment_course FOREIGN KEY (course_id) REFERENCES course(id),
                            CONSTRAINT uq_student_course UNIQUE (student_id, course_id)
);

CREATE TABLE student_schedule_slot (
                                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                       student_id BIGINT NOT NULL,
                                       time_slot_id BIGINT NOT NULL,
                                       CONSTRAINT fk_sss_student FOREIGN KEY (student_id) REFERENCES student(id),
                                       CONSTRAINT fk_sss_time_slot FOREIGN KEY (time_slot_id) REFERENCES time_slot(id),
                                       CONSTRAINT uq_student_time_slot UNIQUE (student_id, time_slot_id)
);