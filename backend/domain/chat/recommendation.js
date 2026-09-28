import { TECHNICAL_RECOMMENDATIONS } from "./questions.js";

/**
 * @returns {{ technical: string, strategicSupportRecommended: boolean, reasons: string[] }}
 */
export function computeChatRecommendation(diagnostic) {
  const reasons = [];
  const intent = diagnostic?.intent;
  const summary =
    typeof diagnostic?.projectSummary === "string"
      ? diagnostic.projectSummary.trim()
      : "";

  if (!intent || intent === "unknown" || summary.length < 20) {
    reasons.push("Informations encore partielles dans la conversation");
    return {
      technical: TECHNICAL_RECOMMENDATIONS.NEEDS_DISCOVERY,
      strategicSupportRecommended: true,
      reasons,
    };
  }

  reasons.push("Lead qualifié via conversation chatbot");
  return {
    technical: TECHNICAL_RECOMMENDATIONS.CHAT_QUALIFIED,
    strategicSupportRecommended: true,
    reasons,
  };
}

export function getTechnicalLabel(technical) {
  if (technical === TECHNICAL_RECOMMENDATIONS.CHAT_QUALIFIED) {
    return "Lead chatbot qualifié";
  }
  return "Découverte courte recommandée";
}
