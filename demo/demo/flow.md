# 샤딩 전체 흐름 정리

## 정적인 부분 — 서버가 켜질 때 딱 한 번 일어나는 일

```
① application.yml 파일
       ↓  (Spring이 자동으로 읽어서)
② ShardingDataSourceProperty, ShardingProperty 객체에 값 채워짐
       ↓  (FriendConfig가 이 값들을 갖고)
③ 실제 DB 커넥션(DataSource)들을 만들어서
       ↓
④ DataSourceRouter에 등록 ("샤드 0엔 이 DB들, 샤드 1엔 이 DB들")
       ↓
⑤ ShardingConfig에 "샤딩 규칙(모듈러? 레인지?)"도 등록
```

## 동적인 부분 — 요청이 올 때마다 매번 일어나는 일

```
① 클라이언트가 "userId=105 저장해줘" 요청
       ↓
② Controller → Service 호출
       ↓
③ (AOP가 자동으로) UserHolder(ThreadLocal)에 "샤딩키=105" 저장
       ↓
④ Repository.save() 호출 → 내부적으로 실제 DB 커넥션이 필요한 순간
       ↓
⑤ DataSourceRouter.determineCurrentLookupKey() 자동 호출됨
       ↓
⑥ UserHolder에서 105를 꺼내서 → 105 % 2 = 1 → "1번 샤드"라고 판단
       ↓
⑦ ④에서 미리 등록해둔 "1번 샤드의 DB"로 실제 연결
       ↓
⑧ 그 DB에 INSERT 쿼리 실행
       ↓
⑨ (AOP가 자동으로) UserHolder 초기화
```

## 구성요소 ↔ 흐름 매칭표

| 구성요소 | 위 흐름에서 위치 | 역할 한 줄 요약 |
|---|---|---|
| `ShardingStrategy` (enum) | 정적 ⑤에서 쓰이는 판단 기준 | RANGE/MODULAR 중 뭘 쓸지 타입으로 못박음 |
| `application.yml` | 정적 ① | 실제 설정값(DB 주소, 샤딩 규칙)을 적어두는 곳 |
| `ShardingDataSourceProperty` | 정적 ② | yaml의 `datasource.friend` 매핑 그릇 (DB 접속 정보) |
| `ShardingProperty` | 정적 ② | yaml의 `sharding.friend` 매핑 그릇 (샤딩 판단 규칙) |
| `Shard` (내부 클래스) | 정적 ②의 일부 | 샤드 1개(계정+master+slave)의 정보 |
| `Property` (내부 클래스) | 정적 ②의 일부 | DB 서버 1개(이름+주소)의 정보 |
| `FriendConfig` | 정적 ③④ | Property 값으로 실제 DataSource(커넥션풀) 조립 + Router 등록 |
| `DataSourceRouter` | 정적 ④ + 동적 ⑤⑥⑦ | 실제 라우팅 판단 (교환원 역할) |
| `ShardingConfig` | 정적 ⑤ | 타겟(FRIEND 등)별 샤딩 규칙을 보관하는 저장소 |
| `UserHolder` (ThreadLocal) | 동적 ③⑥⑨ | 요청 하나 처리 동안 샤딩키를 임시로 들고 있는 포스트잇 |
| `@Sharding` + `RepositoryServiceAspect` (AOP) | 동적 ③⑨ | UserHolder에 값 넣고 빼는 걸 자동화 |
| `FriendRepositoryService` | 동적 ②③④ | 실제 DB 접근 진입점, 첫 파라미터가 샤딩키라는 팀 규약 적용 |

## 핵심 포인트

- **정적인 부분** = "샤드가 몇 개고, 각각 어디 붙어있고, 어떤 규칙으로 나눌지"를 서버 시작 시점에 미리 준비해두는 것
- **동적인 부분** = 매 요청마다 "이번엔 몇 번 샤드로 가야 하지?"를 실시간으로 계산해서 올바른 DB로 연결하는 것
- `UserHolder`(ThreadLocal)가 필요한 이유: `DataSourceRouter.determineCurrentLookupKey()`는 Spring이 정해놓은 콜백이라 파라미터를 받을 수 없음 → 미리 스레드에 값을 꽂아두고 콜백 안에서 몰래 꺼내 쓰는 우회 방법이 필요함