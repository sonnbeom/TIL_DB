package com.example.study_jvm.safelocktest;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.params.SetParams;

import java.util.Collections;
import java.util.UUID;

public class SafeUnlockTest {
    private static final String LOCK_KEY = "lock:coupon:1";

    // 소유자 확인 후 삭제를 하나의 원자적 명령으로 묶는 Lua 스크립트
    private static final String UNLOCK_SCRIPT =
            "if redis.call('get', KEYS[1]) == ARGV[1] then " +
                    "    return redis.call('del', KEYS[1]) " +
                    "else " +
                    "    return 0 " +
                    "end";

    public static void main(String[] args) {
        try(Jedis jedis = new Jedis("localhost", 6379)) {
            String lockValue = UUID.randomUUID().toString();

            String result = jedis.set(
                    LOCK_KEY,
                    lockValue,
                    SetParams.setParams().nx().ex(10)
            );
            System.out.println("락 획득 결과" + result);

            // 2. 다른 서버가 이미 새 값으로 락을 잡아버린 상황을 가정
            //    (TTL 만료 후 다른 서버가 락을 잡았다고 시뮬레이션)
            jedis.set(LOCK_KEY, "other-server-value");
            System.out.println("락 값이 다른 값으로 바뀐 상태로 변경됨 (다른 서버가 잡았다고 가정)");

            Object unLockResult = jedis.eval(
                    UNLOCK_SCRIPT,
                    Collections.singletonList(LOCK_KEY),
                    Collections.singletonList(lockValue)
            );
            System.out.println("해제 결과 (1=성공, 0=실패): " + unLockResult);
        }
    }
}
