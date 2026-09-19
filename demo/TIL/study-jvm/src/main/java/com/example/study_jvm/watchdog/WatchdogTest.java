package com.example.study_jvm.watchdog;

import org.redisson.Redisson;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.redisson.config.Config;

public class WatchdogTest {

    public static void main(String[] args) throws InterruptedException {
        //이 코드는 Redisson(자바용 Redis 클라이언트 라이브러리)의 설정 코드입니다.
        // Redisson 클라이언트의 설정 객체를 따로 만듭니다. 이 객체에 어떤 Reidis를 연결할지를 담습니다.
        Config config = new Config();
        //Redis를 단일 서버로 사용하겠다고 지정합니다, 연결한 주소를 지정합니다.
        config.useSingleServer().setAddress("redis://127.0.0.1:6379");

        RedissonClient redissonClient = Redisson.create(config);
        RLock lock = redissonClient.getLock("lock");

        try {
            lock.lock();
            System.out.println("락 획득! (Watchdog 활성화됨, 기본 TTL 30초)");

            System.out.println("40초간 작업 중... (이 사이 Watchdog이 TTL을 연장하는지 확인)");
            Thread.sleep(40_000);

            System.out.println("작업 완료");
        }
        finally {
            lock.unlock();
            System.out.println("락 해제 완료");
        }
        redissonClient.shutdown();
    }
}
