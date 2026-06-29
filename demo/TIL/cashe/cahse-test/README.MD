# Redis Cache-Aside 패턴 성능 검증 프로젝트

Spring Boot 3 + Spring Data JPA + MyBatis + MySQL 8 + Redis 7로,
"인기 콘텐츠 TOP10" 조회 API를 **MySQL 인덱스만 쓴 경우(Before)**와
**MySQL 인덱스 + Redis Cache-Aside(After)**로 나눠 성능을 비교 검증한 프로젝트입니다.

## 1. 시나리오

콘텐츠 서비스에서, 유저가 콘텐츠에 좋아요를 누르고 홈 화면에서 "인기 콘텐츠 TOP10"을 조회합니다.

- 좋아요를 원본 그대로 기록(`content_like`)하면서, 동시에 조회용 집계 테이블(`content_like_stat`)에
  비정규화하여 저장합니다.
- 조회는 집계 테이블만 보기 때문에 매번 COUNT/GROUP BY를 할 필요가 없습니다.
- 이 조회 API에 Redis Cache-Aside를 적용해서, 캐시 유무에 따른 성능 차이를 JMeter로 측정합니다.

## 2. 테이블 구조

| 테이블 | 역할 |
|---|---|
| `content` | 콘텐츠 원본 (id, title, created_at) |
| `content_like` | 좋아요 원본 기록. `(user_id, content_id)` UNIQUE — 중복 방지 + 좋아요 취소 + "내가 눌렀는지" 체크용 |
| `content_like_stat` | 조회 전용 집계 롤업. `(content_id, liked_at)` UNIQUE — 좋아요 발생 시 upsert(+1)되는 비정규화 테이블 |

```sql
CREATE INDEX idx_liked_at_like_count
    ON content_like_stat (liked_at, like_count DESC);
```

`WHERE liked_at = ? ORDER BY like_count DESC LIMIT 10`을 인덱스 하나로 처리하기 위한 복합 인덱스입니다.

## 3. Cache-Aside 동작 방식

**읽기 (`PopularContentService.getPopular`)**
```
요청 도착
  │
  ▼
Redis에 "popular:{year}" 있나?
  ├─ 있음(HIT)  → 그 값 바로 반환, MySQL 안 감
  └─ 없음(MISS) → MySQL(MyBatis) 조회 → 결과를 Redis에 저장(TTL 24h) → 반환
```

**쓰기 (`LikeService.toggleLike`)**
```
좋아요 요청
  │
  ▼
이미 눌렀는지 체크(content_like)
  ├─ 안 눌렀음 → INSERT + content_like_stat +1
  └─ 이미 눌렀음 → DELETE + content_like_stat -1
  │
  ▼
Redis의 "popular:{year}" 캐시 삭제 (evict)
  → 다음 조회 때 자연스럽게 MISS 나서 최신 데이터로 재캐싱됨
```

`app.cache.enabled` (env `APP_CACHE_ENABLED`) 하나로 Before(`false`)/After(`true`)를 전환합니다. 코드는
동일하고 이 설정값만 바뀝니다.

## 4. 프로젝트 구조

```
cahse-test/
├── build.gradle
├── settings.gradle
├── docker-compose.yml
├── .gitignore
├── README.md
├── jmeter/popular-test-plan.jmx
├── scripts/
│   ├── run-jmeter.sh      # 100/1,000/10,000회 자동 실행 + 결과 저장
│   └── compare.sh         # before/after 결과를 표로 요약
└── src/main/
    ├── resources/
    │   ├── application.yml
    │   ├── schema.sql
    │   └── mapper/PopularContentMapper.xml
    └── java/com/example/cahsetest/
        ├── CacheAsideDemoApplication.java   (@MapperScan 포함)
        ├── domain/         Content, ContentLike, ContentLikeStat
        ├── dto/            PopularContentResponse, StatsResponse
        ├── repository/     ContentRepository, ContentLikeRepository,
        │                   ContentLikeStatRepository (JPA) / PopularContentMapper (MyBatis)
        ├── config/         RedisConfig
        ├── metrics/        CacheMetrics
        ├── service/        PopularContentService, LikeService
        ├── controller/      PopularContentController, LikeController, StatsController
        └── datagen/        DummyDataGenerationService, DataGenController
```

JPA와 MyBatis를 같이 씁니다 — 단순 CRUD(좋아요 등록/취소, 집계 upsert)는 JPA로, TOP10 조회처럼
정확한 SQL과 인덱스 사용 여부 검증이 중요한 쿼리는 MyBatis로 분리했습니다.

## 5. 실행 방법

### 5.1 사전 준비 (Windows 기준)

- JDK 17
- Gradle Wrapper (`./gradlew`)
- Docker Desktop
- Apache JMeter (설치 후 `bin` 폴더를 PATH에 등록, `JAVA_HOME`도 별도 등록 필요)

```bash
# ~/.bashrc 에 등록 (Git Bash 기준, 본인 설치 경로에 맞게 수정)
export PATH="$PATH:/c/apache-jmeter-5.6.3/bin"
export JAVA_HOME="$(cygpath -w "/c/Users/{내계정}/.jdks/{jdk버전}")"
```

### 5.2 MySQL, Redis 기동

```bash
docker compose up -d
docker compose ps   # mysql, redis 둘 다 healthy 될 때까지 대기
```

### 5.3 앱 실행

IntelliJ에서 `CacheAsideDemoApplication` 실행, 또는:

```bash
./gradlew bootRun
```

### 5.4 더미데이터 생성 (콘텐츠 100만 건 × 3개년 = 집계 300만 row)

```bash
curl -X POST "http://localhost:8080/api/admin/generate-dummy-data?count=1000000"
curl http://localhost:8080/api/admin/status   # 진행 확인, running:false 될 때까지 반복 조회
```

### 5.5 Before / After 테스트

```bash
# Before: 캐시 끄고 재기동
APP_CACHE_ENABLED=false ./gradlew bootRun
```
```bash
chmod +x scripts/run-jmeter.sh
LABEL=before HOST=localhost PORT=8080 YEAR=2026 ./scripts/run-jmeter.sh
```

```bash
# After: 캐시 켜고 재기동
APP_CACHE_ENABLED=true ./gradlew bootRun
```
```bash
LABEL=after HOST=localhost PORT=8080 YEAR=2026 ./scripts/run-jmeter.sh
```

각 실행마다 100 → 1,000 → 10,000건이 순서대로 진행되며, 케이스 시작 전 Redis 캐시를 `FLUSHALL`하고
`/api/stats`를 리셋해서 케이스마다 공정하게 측정합니다.

### 5.6 결과 비교

```bash
chmod +x scripts/compare.sh
./scripts/compare.sh
```

## 6. 측정 결과

| 라벨 | 요청수 | Avg(ms) | Min | Max | DB쿼리 | 전체요청 | 캐시히트율 | DB쿼리감소율 |
|---|---|---|---|---|---|---|---|---|
| before | 100 | 25.37 | 15 | 423 | 100 | 100 | 0.0% | 0.0% |
| before | 1,000 | 22.30 | 12 | 35 | 1000 | 1000 | 0.0% | 0.0% |
| before | 10,000 | 134.85 | 13 | 459 | 10000 | 10000 | 0.0% | 0.0% |
| after | 100 | 4.04 | 1 | 121 | 1 | 100 | 99.0% | 99.0% |
| after | 1,000 | 1.41 | 0 | 33 | 1 | 1000 | 99.9% | 99.9% |
| after | 10,000 | 0.99 | 0 | 28 | 1 | 10000 | 99.99% | 99.99% |

### 응답시간 개선율

| 요청수 | Before → After | 개선율 |
|---|---|---|
| 100 | 25.37ms → 4.04ms | 84.1% 감소 |
| 1,000 | 22.30ms → 1.41ms | 93.7% 감소 |
| 10,000 | 134.85ms → 0.99ms | 99.3% 감소 |

### 왜 이런 결과가 나왔는지

**Before**: 요청마다 매번 `커넥션 풀 획득 → MySQL로 SQL 전송 → 인덱스 스캔 + JOIN → 결과 반환`을
그대로 반복합니다. 인덱스를 타긴 하지만, 요청이 몰릴수록(10,000건, 동시 스레드 50개) 커넥션 풀 경합까지
겹쳐서 평균 응답시간이 134ms까지 늘어났습니다.

**After**: 캐시 키(`popular:{year}`) 기준으로 **처음 1번만** MySQL을 조회하고, 그 결과를 Redis에
TTL 24시간으로 저장합니다. 이후 요청은 전부 메모리 기반의 Redis에서 key로 값을 바로 꺼내기만 하므로
JOIN/인덱스 스캔/커넥션 경합이 전혀 없고, 요청이 몰려도(10,000건) 오히려 더 빨라졌습니다
(0.99ms, Before 대비 약 136배 차이).

**MySQL 쿼리 감소율**: Before는 요청 수만큼 MySQL을 그대로 쳤지만(`dbQueryCount == totalRequests`),
After는 TTL 동안 딱 1번만 MySQL을 치고 나머지는 전부 Redis가 흡수해서 `dbQueryReductionRatePercent`가
99.99%까지 나왔습니다. 즉 Cache-Aside는 응답시간뿐 아니라 **MySQL이 받는 실제 부하 자체를 줄여준다**는
게 이번 측정으로 확인됐습니다.

## 7. 알아둘 점 / 한계

- `LikeService`의 집계 upsert(`findByContentIdAndLikedAt` → +1 → `save`)는 원자적이지 않습니다.
  동시에 여러 요청이 같은 콘텐츠에 좋아요를 누르면 race condition으로 카운트가 유실될 수 있습니다.
  실무라면 `UPDATE ... SET like_count = like_count + 1` 형태의 SQL 레벨 증가문이나 비관적 락이 필요합니다.
- `userId`를 인증 없이 `@RequestParam`으로 받습니다. 이 프로젝트는 인증이 목적이 아니라 Cache-Aside
  성능 측정이 목적이라 단순화했습니다.
- Redis 컨테이너는 volume을 안 걸어서, 컨테이너를 내리면 캐시가 초기화됩니다(테스트 반복 시 공정한
  측정을 위한 의도된 설계).