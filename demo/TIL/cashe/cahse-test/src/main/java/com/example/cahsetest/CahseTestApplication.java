package com.example.cahsetest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class CahseTestApplication {

    public static void main(String[] args) {
        SpringApplication.run(CahseTestApplication.class, args);
    }

}
