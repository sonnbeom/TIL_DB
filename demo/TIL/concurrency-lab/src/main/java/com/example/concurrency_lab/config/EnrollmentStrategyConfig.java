package com.example.concurrency_lab.config;

import com.example.concurrency_lab.service.EnrollmentService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class EnrollmentStrategyConfig {

    @Value("${enrollment.strategy}")
    private String strategy;

    @Bean
    @Primary
    public EnrollmentService enrollmentService(
            @Qualifier("studentLockConditionalUpdateEnrollmentService") EnrollmentService idea1,
            @Qualifier("fullPessimisticLockEnrollmentService") EnrollmentService pessimistic,
            @Qualifier("optimisticLockEnrollmentService") EnrollmentService optimistic,
            @Qualifier("distributedLockEnrollmentService") EnrollmentService distributed
    ) {
        switch (strategy) {
            case "idea1":
                return idea1;
            case "pessimistic":
                return pessimistic;
            case "optimistic":
                return optimistic;
            case "distributed":
                return distributed;
            default:
                throw new IllegalStateException("알 수 없는 전략입니다: " + strategy);
        }
    }
}
