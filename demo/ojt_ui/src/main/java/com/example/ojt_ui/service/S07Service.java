package com.example.ojt_ui.service;

import com.example.ojt_ui.data.S03Data;
import com.example.ojt_ui.data.S06Data;
import com.example.ojt_ui.data.S07Data;
import com.example.ojt_ui.dto.S07Request;
import com.example.ojt_ui.model.Criteria;
import com.example.ojt_ui.model.CriteriaDoc;
import com.example.ojt_ui.model.CriteriaVersion;
import com.example.ojt_ui.model.ChecklistItem;
import com.example.ojt_ui.model.SourceRule;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class S07Service {

    public Map<String, Object> buildModel(S07Request request) {
        Criteria criteria = S03Data.CRITERIA.get(S06Data.JUDGE_CRITERIA_KEY);

        List<ChecklistItem> checklistItems = new ArrayList<>();
        int submittedCount = 0;
        for (CriteriaDoc doc : criteria.getDocs()) {
            String name = S03Data.DOCTYPES.get(doc.getDoctypeId()).getName();
            SourceRule sourceRule = S03Data.SOURCE_RULES.get(doc.getSourceRuleId());
            String subtitle = (doc.isApproval() ? "승인용" : "참고용") + " · " + sourceRule.getLabel()
                    + ("FRP_RULE".equals(doc.getSourceRuleId()) ? " (준용)" : "");
            String[] status = S07Data.CHECKLIST_STATUS.get(doc.getDoctypeId());
            ChecklistItem item = new ChecklistItem(name, subtitle, status[0], status[1]);
            checklistItems.add(item);
            if (item.isSubmitted()) {
                submittedCount++;
            }
        }
        int totalCount = checklistItems.size();
        long progressPercent = Math.round(submittedCount * 100.0 / totalCount);

        String[] keyParts = criteria.getKey().split("\\|");
        String applicableRuleId = keyParts[keyParts.length - 1];
        String ruleLabel = S03Data.SOURCE_RULES.get(applicableRuleId).getLabel();
        CriteriaVersion latestVersion = criteria.getVersions().get(criteria.getVersions().size() - 1);
        String versionBarLabel = ruleLabel + " · " + latestVersion.getVersion() + " (" + latestVersion.getDate() + " 기준)";

        Map<String, Object> model = new LinkedHashMap<>();
        model.put("tab", request.getTab());
        model.put("vessel", S06Data.EXAMPLE);
        model.put("checklistItems", checklistItems);
        model.put("submittedCount", submittedCount);
        model.put("totalCount", totalCount);
        model.put("progressPercent", progressPercent);
        model.put("versionBarLabel", versionBarLabel);
        return model;
    }
}
