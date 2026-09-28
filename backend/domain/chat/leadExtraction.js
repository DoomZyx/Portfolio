export const LEAD_EXTRACTION_SCHEMA = {
  type: "object",
  properties: {
    ready: {
      type: "boolean",
      description:
        "true seulement si le prospect a fourni un nom ET un email valides",
    },
    name: { type: "string" },
    email: { type: "string" },
    phone: { type: "string" },
    company: { type: "string" },
    intent: {
      type: "string",
      enum: ["create", "improve", "services", "general", "unknown"],
    },
    projectSummary: {
      type: "string",
      description: "Résumé court du besoin projet (2-4 phrases max)",
    },
    message: {
      type: "string",
      description: "Message de suivi pour Axel, prêt à stocker en lead",
    },
  },
  required: [
    "ready",
    "name",
    "email",
    "phone",
    "company",
    "intent",
    "projectSummary",
    "message",
  ],
  additionalProperties: false,
};

export const LEAD_EXTRACTION_PROMPT = `Tu extrais un lead commercial depuis une conversation chatbot.
Règles strictes :
- ready=true UNIQUEMENT si name non vide ET email valide (format email).
- Ne invente jamais d'email ni de nom. Si absent, laisse "" et ready=false.
- phone et company : "" si absents.
- intent : create | improve | services | general | unknown.
- projectSummary : synthèse factuelle du besoin.
- message : paragraphe court pour le CRM (contexte + besoin).
Réponds uniquement avec le JSON du schéma.`;
