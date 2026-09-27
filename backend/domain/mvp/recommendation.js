import { DIAGNOSTIC_STEPS, TECHNICAL_RECOMMENDATIONS } from "./questions.js";

const MATURITY_KEYS = [
  "BUSINESS_MODEL",
  "GO_TO_MARKET",
  "PRICING",
  "TARGET_USERS",
  "COMPETITORS",
];

const HEAVY_CONSTRAINTS = new Set([
  "PAYMENTS",
  "INTEGRATIONS",
  "REALTIME",
  "MOBILE",
  "DATA_HEAVY",
]);

export function normalizeMulti(values) {
  if (!Array.isArray(values) || values.length === 0) return [];
  if (values.includes("NONE")) return [];
  return [...new Set(values.filter((item) => item !== "NONE"))];
}

export function shouldRecommendStrategicSupport(maturity) {
  const defined = new Set(normalizeMulti(maturity));
  return MATURITY_KEYS.some((key) => !defined.has(key));
}

/**
 * @returns {{ technical: string, strategicSupportRecommended: boolean, reasons: string[] }}
 */
export function computeMvpRecommendation(answers) {
  const reasons = [];

  if (!answers || typeof answers !== "object") {
    return {
      technical: TECHNICAL_RECOMMENDATIONS.NEEDS_DISCOVERY,
      strategicSupportRecommended: true,
      reasons: ["Réponses insuffisantes"],
    };
  }

  const required = [
    "productStage",
    "objective",
    "scopeClarity",
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

  const maturity = normalizeMulti(answers.maturity);
  const constraints = normalizeMulti(answers.constraints);
  const strategicSupportRecommended = shouldRecommendStrategicSupport(
    answers.maturity,
  );
  const heavyCount = constraints.filter((c) => HEAVY_CONSTRAINTS.has(c)).length;

  if (strategicSupportRecommended) {
    reasons.push(
      "Cadrage business incomplet (modèle, go-to-market, pricing ou cible)",
    );
  }

  if (answers.productStage === "IDEA" || answers.scopeClarity === "UNCLEAR") {
    reasons.push("Idée ou périmètre encore trop ouverts pour construire");
    return {
      technical: TECHNICAL_RECOMMENDATIONS.NEEDS_DISCOVERY,
      strategicSupportRecommended,
      reasons,
    };
  }

  if (
    maturity.length >= 3 &&
    answers.scopeClarity === "CLEAR_CORE" &&
    (answers.objective === "BUILD_MVP" ||
      answers.objective === "EXTEND_PRODUCT" ||
      answers.objective === "REBUILD") &&
    answers.productStage !== "IDEA"
  ) {
    reasons.push(
      "Projet mature avec business model / plan et périmètre MVP clair",
    );
    if (heavyCount >= 2) {
      reasons.push("Plusieurs contraintes techniques à cadrer dans le build");
    }
    return {
      technical: TECHNICAL_RECOMMENDATIONS.MVP_BUILD,
      strategicSupportRecommended,
      reasons,
    };
  }

  if (
    answers.scopeClarity === "PARTIAL" ||
    maturity.length < 3 ||
    answers.objective === "VALIDATE_MARKET"
  ) {
    reasons.push(
      "Le besoin est réel mais le cadrage MVP mérite un atelier de scoping",
    );
    return {
      technical: TECHNICAL_RECOMMENDATIONS.MVP_SCOPING,
      strategicSupportRecommended,
      reasons,
    };
  }

  reasons.push(
    "Profil mixte : une découverte courte permettra d'affiner le périmètre",
  );
  return {
    technical: TECHNICAL_RECOMMENDATIONS.NEEDS_DISCOVERY,
    strategicSupportRecommended,
    reasons,
  };
}

export function getTechnicalLabel(technical) {
  if (technical === TECHNICAL_RECOMMENDATIONS.MVP_BUILD) {
    return "Conception / build MVP recommandé";
  }
  if (technical === TECHNICAL_RECOMMENDATIONS.MVP_SCOPING) {
    return "Atelier de cadrage MVP recommandé";
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

  if (technical === TECHNICAL_RECOMMENDATIONS.MVP_BUILD) {
    return {
      headline: "Votre projet semble prêt pour une conception / un build MVP",
      body: strategicSupportRecommended
        ? "Le niveau de maturité et le périmètre permettent d'envisager une conception concrète. Certains points business restent à clarifier pour sécuriser le livrable."
        : "Business model, plan et périmètre sont suffisamment établis pour démarrer une conception MVP orientée valeur et time-to-market.",
    };
  }

  if (technical === TECHNICAL_RECOMMENDATIONS.MVP_SCOPING) {
    return {
      headline: "Un atelier de cadrage MVP est le meilleur prochain pas",
      body: "L'intention produit est claire, mais le périmètre ou le cadrage business méritent d'être verrouillés avant d'investir dans le développement.",
    };
  }

  return {
    headline: "Une découverte courte permettra d'affiner l'orientation",
    body: strategicSupportRecommended
      ? "Les éléments partagés ne suffisent pas encore pour trancher entre un cadrage et un build. Un échange clarifiera maturité produit, business model et priorités."
      : "Les éléments partagés ne suffisent pas encore pour trancher. Un échange court permettra de clarifier le besoin et les priorités.",
  };
}

export function buildContactDraftMessage(answers, recommendation) {
  const copy = getRecommendationCopy(recommendation);
  const maturity = labelsForMulti("maturity", normalizeMulti(answers.maturity));
  const constraints = labelsForMulti(
    "constraints",
    normalizeMulti(answers.constraints),
  );

  return [
    "Bonjour Axel,",
    "",
    "Je viens de réaliser le diagnostic MVP de votre portfolio.",
    "",
    `Orientation reçue : ${copy.headline}`,
    `Recommandation technique : ${getTechnicalLabel(recommendation.technical)}`,
    `Accompagnement stratégique recommandé : ${
      recommendation.strategicSupportRecommended ? "oui" : "non"
    }`,
    "",
    "Résumé de mes réponses :",
    `- Maturité produit : ${labelForAnswer("productStage", answers.productStage)}`,
    `- Objectif : ${labelForAnswer("objective", answers.objective)}`,
    `- Cadrage business : ${maturity.length ? maturity.join(", ") : "peu défini"}`,
    `- Périmètre MVP : ${labelForAnswer("scopeClarity", answers.scopeClarity)}`,
    `- Contraintes : ${constraints.length ? constraints.join(", ") : "aucune déclarée"}`,
    `- Budget : ${labelForAnswer("budget", answers.budget)}`,
    `- Délai : ${labelForAnswer("timeline", answers.timeline)}`,
    "",
    "Je souhaite étudier mon projet avec vous.",
  ].join("\n");
}
