import { OpenAIService } from "./openaiService.js";
import { leadModel } from "../models/leadModel.js";
import { validatePublicLeadPayload } from "./leadValidation.js";
import { computeEcommerceRecommendation } from "../domain/ecommerce/recommendation.js";
import { computeMvpRecommendation } from "../domain/mvp/recommendation.js";
import { computeVisibilityRecommendation } from "../domain/visibility/recommendation.js";
import { computeChatRecommendation } from "../domain/chat/recommendation.js";

const EMAIL_HINT_RE = /[^\s@]+@[^\s@]+\.[^\s@]+/;

function computeRecommendation(projectType, diagnostic) {
  if (projectType === "mvp") return computeMvpRecommendation(diagnostic);
  if (projectType === "visibility") {
    return computeVisibilityRecommendation(diagnostic);
  }
  if (projectType === "chat") return computeChatRecommendation(diagnostic);
  return computeEcommerceRecommendation(diagnostic);
}

export function conversationMayContainLead(messages) {
  if (!Array.isArray(messages) || messages.length < 3) return false;
  const transcript = messages.map((m) => m?.text || "").join("\n");
  return EMAIL_HINT_RE.test(transcript);
}

/**
 * Persiste un lead déjà validé (recommandation recalculée serveur).
 */
export async function createValidatedLead(payload) {
  const recommendation = computeRecommendation(
    payload.projectType,
    payload.diagnostic,
  );

  const lead = await leadModel.create({
    ...payload,
    recommendationTechnical: recommendation.technical,
    strategicSupportRecommended: recommendation.strategicSupportRecommended,
  });

  return {
    id: lead.id,
    recommendation: {
      technical: lead.recommendation_technical,
      strategicSupportRecommended: lead.strategic_support_recommended,
    },
  };
}

/**
 * Extrait un lead JSON depuis la conversation et l'enregistre si prêt.
 * @returns {Promise<{ created: boolean, lead?: object, error?: string }>}
 */
export async function captureLeadFromChatMessages(messages, tracking = {}) {
  if (!conversationMayContainLead(messages)) {
    return { created: false };
  }

  const openAI = new OpenAIService();
  const extracted = await openAI.extractLeadCandidate(messages);
  if (!extracted?.ready) {
    return { created: false };
  }

  const body = {
    name: extracted.name,
    email: extracted.email,
    phone: extracted.phone || undefined,
    company: extracted.company || undefined,
    message: extracted.message || extracted.projectSummary || undefined,
    projectType: "chat",
    source: tracking.source || "chatbot",
    utmSource: tracking.utmSource || "chatbot",
    utmMedium: tracking.utmMedium || "portfolio",
    utmCampaign: tracking.utmCampaign || "conversation",
    landingPage: tracking.landingPage,
    referrer: tracking.referrer,
    diagnostic: {
      intent: extracted.intent || "unknown",
      projectSummary: extracted.projectSummary || "",
    },
  };

  const parsed = validatePublicLeadPayload(body);
  if (parsed.error) {
    return { created: false, error: parsed.error };
  }

  const lead = await createValidatedLead(parsed.value);
  return { created: true, lead };
}

export { computeRecommendation };
