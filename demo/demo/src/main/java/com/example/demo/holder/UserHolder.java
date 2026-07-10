package com.example.demo.holder;

import com.example.demo.sharding.ShardingTarget;
import lombok.Getter;

public class UserHolder {
    private static final ThreadLocal<Context> userContext = ThreadLocal.withInitial(Context::new);

    public static void setSharding(ShardingTarget target, long shardKey) {
        userContext.get().setSharding(new Sharding(target, shardKey));
    }

    public static void clearSharding() {
        userContext.get().setSharding(null);
    }

    public static Sharding getSharding() {
        return userContext.get().getSharding();
    }

    @Getter
    public static class Context {
        private Sharding sharding;

        void setSharding(Sharding sharding) {
            this.sharding = sharding;
        }
    }

    @Getter
    public static class Sharding {
        private final ShardingTarget target;
        private final long shardKey;

        Sharding(ShardingTarget target, long shardKey) {
            this.target = target;
            this.shardKey = shardKey;
        }
    }


}
