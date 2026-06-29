#!/bin/bash
# before/after 결과를 모아서 markdown 비교표로 출력합니다.

RESULTS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/results"

extract_response_time() {
  local jtl_file=$1
  awk -F',' 'NR>1 {sum+=$2; if(min==""||$2<min) min=$2; if($2>max) max=$2; n++} END {printf "%.2f,%d,%d", sum/n, min, max}' "$jtl_file"
}

echo "| 라벨 | 요청수 | Avg(ms) | Min | Max | DB쿼리 | 전체요청 | 캐시히트율 | DB쿼리감소율 |"
echo "|---|---|---|---|---|---|---|---|---|"

for label in before after; do
  for case in 100 1000 10000; do
    jtl="$RESULTS_DIR/$label/result_$case.jtl"
    stats="$RESULTS_DIR/$label/stats_$case.json"

    if [[ ! -f "$jtl" || ! -f "$stats" ]]; then
      echo "| $label | $case | (파일 없음) | | | | | | |"
      continue
    fi

    rt=$(extract_response_time "$jtl")
    avg=$(echo "$rt" | cut -d',' -f1)
    min=$(echo "$rt" | cut -d',' -f2)
    max=$(echo "$rt" | cut -d',' -f3)

    total=$(grep -o '"totalRequests":[0-9]*' "$stats" | cut -d':' -f2)
    dbq=$(grep -o '"dbQueryCount":[0-9]*' "$stats" | cut -d':' -f2)
    hitrate=$(grep -o '"cacheHitRatePercent":[0-9.]*' "$stats" | cut -d':' -f2)
    reduction=$(grep -o '"dbQueryReductionRatePercent":[0-9.]*' "$stats" | cut -d':' -f2)

    echo "| $label | $case | $avg | $min | $max | $dbq | $total | ${hitrate}% | ${reduction}% |"
  done
done