import { DIAGNOSTIC_STEPS, TECHNICAL_RECOMMENDATIONS } from "./questions.js";

const CONTENT_KEYS = ["TEXTS", "VISUALS", "OFFER_CLEAR", "REFERENCES"];

export function normalizeMulti(values) {
  if (!Array.isArray(values) || values.length === 0) return [];
  if (values.includes("NONE")) return [];
  return [...new Set(values.filter((item) => item !== "NONE"))];
}

export function shouldRecommendStrategicSupport(contentReady) {
  const defined = new Set(normalizeMulti(contentReady));
  return CONTENT_KEYS.some((key) => !defined.has(key));
}

/**
 * @returns {{ technical: string, strategicSupportRecommended: boolean, reasons: string[] }}
 */
export function computeVisibilityRecommendation(answers) {
  const reasons = [];

  if (!answers || typeof answers !== "object") {
    return {
      technical: TECHNICAL_RECOMMENDATIONS.NEEDS_DISCOVERY,
      strategicSupportRecommended: true,
      reasons: ["Réponses insuffisantes"],
    };
  }

  const required = [
    "currentPresence",
    "objective",
    "pagesNeeded",
    "budget",
    "timeline",
  ];
  const missing = required.filter((key) => !answers[key]);
  if (missing.length > 0) {
    return {
      technical: TECHNICAL_RECOMMENDATIONS.NEEDS_DISCOVERY,
      strategicSupportRecommended: true,
      reasons: [`Informations manquantes: ${missing.join(", ")}`],
    };
  }

  const strategicSupportRecommended = shouldRecommendStrategicSupport(
    answers.contentReady,
  );

  if (strategicSupportRecommended) {
    reasons.push("Contenus ou offre encore partiellement définis");
  }

  if (answers.pagesNeeded === "UNSURE") {
    reasons.push("Format souhaité encore indéterminé");
    return {
      technical: TECHNICAL_RECOMMENDATIONS.NEEDS_DISCOVERY,
      strategicSupportRecommended,
      reasons,
    };
  }

  if (
    answers.pagesNeeded === "REDESIGN" ||
    answers.currentPresence === "OUTDATED_SITE"
  ) {
    reasons.push("Présence existante à moderniser / clarifier");
    return {
      technical: TECHNICAL_RECOMMENDATIONS.REDESIGN,
      strategicSupportRecommended,
      reasons,
    };
  }

  if (
    answers.pagesNeeded === "LANDING" ||
    answers.objective === "ANNOUNCE" ||
    (answers.objective === "GENERATE_LEADS" &&
      answers.pagesNeeded !== "MULTI_PAGE")
  ) {
    reasons.push("Besoin concentré sur une page d'entrée claire");
    return {
      technical: TECHNICAL_RECOMMENDATIONS.LANDING,
      strategicSupportRecommended,
      reasons,
    };
  }

  if (
    answers.pagesNeeded === "MULTI_PAGE" ||
    answers.objective === "CREDIBILITY" ||
    answers.objective === "BRAND_IMAGE"
  ) {
    reasons.push("Besoin de présence structurée multi-pages");
    return {
      technical: TECHNICAL_RECOMMENDATIONS.CORPORATE_SITE,
      strategicSupportRecommended,
      reasons,
    };
  }

  reasons.push(
    "Profil mixte : une découverte courte permettra d'affiner le format",
  );
  return {
    technical: TECHNICAL_RECOMMENDATIONS.NEEDS_DISCOVERY,
    strategicSupportRecommended: strategicSupportRecommended,
    reasons,
  };
}

export function getTechnicalLabel(technical) {
  if (technical === TECHNICAL_RECOMMENDATIONS.LANDING) {
    return "Landing page recommandée";
  }
  if (technical === TECHNICAL_RECOMMENDATIONS.CORPORATE_SITE) {
    return "Site vitrine multi-pages recommandé";
  }
  if (technical === TECHNICAL_RECOMMENDATIONS.REDESIGN) {
    return "Refonte légère recommandée";
  }
  return "Découverte courte recommandée";
}

function labelForAnswer(stepId, value) {
  const step = DIAGNOSTIC_STEPS.find((item) => item.id === stepId);
  if (!step) return value;
  const option = step.options.find((item) => item.value === value);
  return option ? option.label : value;
}

function labelsForMulti(stepId, values) {
  if (!Array.isArray(values) || values.length === 0) return [];
  return values.map((value) => labelForAnswer(stepId, value));
}

export function getRecommendationCopy(recommendation) {
  const { technical, strategicSupportRecommended } = recommendation;

  if (technical === TECHNICAL_RECOMMENDATIONS.LANDING) {
    return {
      headline: "Une landing page ciblée semble adaptée",
      body: strategicSupportRecommended
        ? "Une page d'entrée claire peut couvrir votre besoin de visibilité. Préparer messages et contenus en amont accélérera le résultat."
        : "Une landing page ciblée peut couvrir votre besoin de visibilité avec un time-to-market favorable.",
    };
  }

  if (technical === TECHNICAL_RECOMMENDATIONS.CORPORATE_SITE) {
    return {
      headline: "Un site vitrine structuré semble adapté",
      body: "Votre besoin de présence et de crédibilité oriente vers un site multi-pages, avec une architecture simple et des messages clairs.",
    };
  }

  if (technical === TECHNICAL_RECOMMENDATIONS.REDESIGN) {
    return {
      headline: "Une refonte légère de votre présence semble pertinente",
      body: "Vous disposez déjà d'une base en ligne. Une clarification visuelle et éditoriale apportera plus de valeur qu'un nouveau site from scratch.",
    };
  }

  return {
    headline: "Une découverte courte permettra d'affiner l'orientation",
    body: strategicSupportRecommended
      ? "Les éléments partagés ne suffisent pas encore pour trancher le format. Un échange clarifiera objectifs, contenus et niveau de présence souhaité."
      : "Les éléments partagés ne suffisent pas encore pour trancher. Un échange court permettra de clarifier le besoin.",
  };
}

export function buildContactDraftMessage(answers, recommendation) {
  const copy = getRecommendationCopy(recommendation);
  const content = labelsForMulti(
    "contentReady",
    normalizeMulti(answers.contentReady),
  );

  return [
    "Bonjour Axel,",
    "",
    "Je viens de réaliser le diagnostic visibilité de votre portfolio.",
    "",
    `Orientation reçue : ${copy.headline}`,
    `Recommandation technique : ${getTechnicalLabel(recommendation.technical)}`,
    `Accompagnement stratégique recommandé : ${
      recommendation.strategicSupportRecommended ? "oui" : "non"
    }`,
    "",
    "Résumé de mes réponses :",
    `- Présence actuelle : ${labelForAnswer("currentPresence", answers.currentPresence)}`,
    `- Objectif : ${labelForAnswer("objective", answers.objective)}`,
    `- Contenus : ${content.length ? content.join(", ") : "peu prêts"}`,
    `- Format : ${labelForAnswer("pagesNeeded", answers.pagesNeeded)}`,
    `- Budget : ${labelForAnswer("budget", answers.budget)}`,
    `- Délai : ${labelForAnswer("timeline", answers.timeline)}`,
    "",
    "Je souhaite étudier mon projet avec vous.",
  ].join("\n");
}
