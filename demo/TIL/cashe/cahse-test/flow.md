요청 도착
│
▼
Redis에 "popular:request_year" 체크
│
├── 있음(HIT) → 그 값 바로 반환 (끝, MySQL 안 감) 
│
└── 없음(MISS) → MySQL 조회 → Redis에 저장 → 반환 (이 코드 블록 아래에 이어지는 부분)