package com.example.ojt_ui.data;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

/** S07 자산 상세조회 화면의 예시 호선(S06Data.EXAMPLE과 동일 호선)에 대한, 검사기준 서류별 제출 상태. */
public final class S07Data {

    /** 서류유형ID(S03Data.DOCTYPES 키) → {상태 라벨, 상태 CSS 클래스}. 서류 정의 자체는 S03Data를 그대로 조회해서 쓴다. */
    public static final Map<String, String[]> CHECKLIST_STATUS;
    static {
        Map<String, String[]> m = new LinkedHashMap<>();
        m.put("doc_msds", new String[]{"제출완료", "done"});
        m.put("doc_layout", new String[]{"승인완료", "done"});
        m.put("doc_midsection", new String[]{"승인완료", "done"});
        m.put("doc_lamination", new String[]{"제출대기", "pending"});
        m.put("doc_stability", new String[]{"제출완료", "done"});
        m.put("doc_frptest", new String[]{"제출완료", "done"});
        m.put("doc_strength", new String[]{"미착수", "waiting"});
        CHECKLIST_STATUS = Collections.unmodifiableMap(m);
    }

    private S07Data() {
    }
}
