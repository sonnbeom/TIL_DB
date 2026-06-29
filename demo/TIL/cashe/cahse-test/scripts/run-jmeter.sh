#!/bin/bash
set -e

HOST=${HOST:-localhost}
PORT=${PORT:-8080}
YEAR=${YEAR:-2026}
LABEL=${LABEL:-run}
REDIS_CONTAINER=${REDIS_CONTAINER:-cache-aside-redis}

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
RESULTS_DIR="$PROJECT_DIR/results/$LABEL"
mkdir -p "$RESULTS_DIR"

run_case () {
  local case_label=$1
  local threads=$2
  local loops=$3
  local total=$((threads * loops))

  echo "=== [$LABEL] $case_label 건 (threads=$threads, loops=$loops, total=$total) ==="

  echo "-> Redis 캐시 초기화 (이전 케이스 잔여 캐시 제거)"
  docker exec "$REDIS_CONTAINER" redis-cli FLUSHALL > /dev/null 2>&1 || true

  echo "-> /api/stats 리셋"
  curl -s -X POST "http://$HOST:$PORT/api/stats/reset" > /dev/null

  echo "-> JMeter 실행"
  rm -rf "$RESULTS_DIR/report_$case_label"
  jmeter -n -t "$PROJECT_DIR/jmeter/popular-test-plan.jmx" \
    -Jhost="$HOST" -Jport="$PORT" -Jyear="$YEAR" \
    -Jthreads="$threads" -Jloops="$loops" -Jrampup=5 \
    -l "$RESULTS_DIR/result_$case_label.jtl" \
    -e -o "$RESULTS_DIR/report_$case_label"

  echo "-> 앱 통계:"
  curl -s "http://$HOST:$PORT/api/stats" | tee "$RESULTS_DIR/stats_$case_label.json"
  echo ""
  echo ""
}

run_case 100    10 10
run_case 1000   20 50
run_case 10000  50 200

echo "완료. $RESULTS_DIR/report_*/index.html (응답시간) 와 $RESULTS_DIR/stats_*.json (캐시/쿼리 통계) 확인하세요."