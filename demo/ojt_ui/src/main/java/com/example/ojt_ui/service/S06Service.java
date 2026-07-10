package com.example.ojt_ui.service;

import com.example.ojt_ui.data.S03Data;
import com.example.ojt_ui.data.S06Data;
import com.example.ojt_ui.model.Criteria;
import com.example.ojt_ui.model.CriteriaDoc;
import com.example.ojt_ui.model.CriteriaVersion;
import com.example.ojt_ui.model.FilterOption;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class S06Service {

    private static final int JUDGE_DOC_PREVIEW_COUNT = 4;

    public Map<String, Object> buildModel() {
        Criteria criteria = S03Data.CRITERIA.get(S06Data.JUDGE_CRITERIA_KEY);
        List<CriteriaDoc> docs = criteria.getDocs();
        long approvalCount = docs.stream().filter(CriteriaDoc::isApproval).count();
        long referenceCount = docs.size() - approvalCount;
        CriteriaVersion latestVersion = criteria.getVersions().get(criteria.getVersions().size() - 1);

        String[] keyParts = criteria.getKey().split("\\|");
        String applicableRuleId = keyParts[keyParts.length - 1];
        String ruleLabel = S03Data.STEPS.stream()
                .filter(step -> "applicableRule".equals(step.getKey()))
                .findFirst()
                .flatMap(step -> step.getOptions().stream()
                        .filter(option -> option.getId().equals(applicableRuleId))
                        .findFirst())
                .map(FilterOption::getLabel)
                .orElse(applicableRuleId);

        List<String> docTags = docs.stream()
                .limit(JUDGE_DOC_PREVIEW_COUNT)
                .map(d -> S03Data.DOCTYPES.get(d.getDoctypeId()).getName())
                .collect(Collectors.toList());

        Map<String, Object> model = new LinkedHashMap<>();
        model.put("vessel", S06Data.EXAMPLE);
        model.put("judgeRuleLabel", ruleLabel);
        model.put("judgeVersion", latestVersion.getVersion());
        model.put("judgeDate", latestVersion.getDate());
        model.put("judgeApprovalCount", approvalCount);
        model.put("judgeReferenceCount", referenceCount);
        model.put("judgeDocTotal", docs.size());
        model.put("judgeDocTags", docTags);
        model.put("judgeMoreCount", docs.size() - docTags.size());
        return model;
    }
}
