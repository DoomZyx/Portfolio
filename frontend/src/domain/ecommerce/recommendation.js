import { DIAGNOSTIC_STEPS, TECHNICAL_RECOMMENDATIONS } from "./questions.js";

/** Besoins qui poussent clairement vers une revue custom / architecture. */
const STRONG_CUSTOM_NEEDS = new Set([
  "MARKETPLACE",
  "CONFIGURATOR",
  "ERP_CRM_API",
  "SPECIAL_LOGISTICS",
  "B2B_PRICING",
]);

/** Besoins compatibles SaaS mais à prendre en compte. */
const SOFT_CUSTOM_NEEDS = new Set([
  "SUBSCRIPTION",
  "ADVANCED_ACCOUNT",
  "INTERNATIONAL",
  "OTHER_SPECIFIC",
]);

const MATURITY_KEYS = ["BRANDING", "SEGMENTATION", "ACQUISITION", "CONVERSION"];

/**
 * Normalise les besoins multi-choix :
 * "NONE" exclut les autres ; liste vide = aucun besoin déclaré.
 */
export function normalizeNeeds(needs) {
  if (!Array.isArray(needs) || needs.length === 0) {
    return [];
  }
  if (needs.includes("NONE")) {
    return [];
  }
  return [...new Set(needs.filter((n) => n !== "NONE"))];
}

/**
 * Normalise la maturité business.
 */
export function normalizeBusiness(business) {
  if (!Array.isArray(business) || business.length === 0) {
    return [];
  }
  if (business.includes("NONE")) {
    return [];
  }
  return [...new Set(business.filter((b) => b !== "NONE"))];
}

/**
 * Accompagnement stratégique si branding, segmentation,
 * acquisition ou parcours de conversion sont insuffisamment définis.
 */
export function shouldRecommendStrategicSupport(business) {
  const defined = new Set(normalizeBusiness(business));
  return MATURITY_KEYS.some((key) => !defined.has(key));
}

function countStrongCustomNeeds(needs) {
  return needs.filter((n) => STRONG_CUSTOM_NEEDS.has(n)).length;
}

function countSoftCustomNeeds(needs) {
  return needs.filter((n) => SOFT_CUSTOM_NEEDS.has(n)).length;
}

function isSmallCatalog(catalogSize) {
  return catalogSize === "UNDER_20" || catalogSize === "FROM_20_TO_100";
}

function isLargeCatalog(catalogSize) {
  return catalogSize === "OVER_1000";
}

function isFastTimeline(timeline) {
  return timeline === "UNDER_1_MONTH" || timeline === "FROM_1_TO_3_MONTHS";
}

function isTightBudget(budget) {
  return budget === "UNDER_2K" || budget === "FROM_2K_TO_5K";
}

function hasStandardLaunchObjective(objective) {
  return (
    objective === "LAUNCH_FAST" ||
    objective === "BUILD_BRAND" ||
    objective === "INCREASE_CONVERSIONS"
  );
}

function hasCustomLeaningObjective(objective) {
  return (
    objective === "AUTOMATE_PROCESSES" ||
    objective === "SPECIFIC_EXPERIENCE" ||
    objective === "REPLACE_LIMITED"
  );
}

/**
 * Détecte les cas contradictoires ou trop ambigus pour une orientation nette.
 */
export function hasContradictorySignals(answers, needs) {
  const { objective, budget, timeline, catalogSize } = answers;
  const strong = countStrongCustomNeeds(needs);

  if (
    objective === "LAUNCH_FAST" &&
    timeline === "UNDER_1_MONTH" &&
    budget === "UNDER_2K" &&
    strong >= 2
  ) {
    return true;
  }

  if (
    isLargeCatalog(catalogSize) &&
    timeline === "UNDER_1_MONTH" &&
    isTightBudget(budget)
  ) {
    return true;
  }

  if (
    objective === "REPLACE_LIMITED" &&
    strong === 0 &&
    countSoftCustomNeeds(needs) === 0 &&
    answers.currentSolution === "NONE"
  ) {
    return true;
  }

  return false;
}

/**
 * Moteur déterministe de recommandation e-commerce.
 * Ne pousse pas artificiellement vers du custom.
 *
 * @param {object} answers
 * @returns {{ technical: string, strategicSupportRecommended: boolean, reasons: string[] }}
 */
export function computeEcommerceRecommendation(answers) {
  const reasons = [];

  if (!answers || typeof answers !== "object") {
    return {
      technical: TECHNICAL_RECOMMENDATIONS.NEEDS_DISCOVERY,
      strategicSupportRecommended: true,
      reasons: ["Réponses insuffisantes"],
    };
  }

  const required = [
    "currentSolution",
    "objective",
    "catalogSize",
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

  const needs = normalizeNeeds(answers.needs);
  const strategicSupportRecommended = shouldRecommendStrategicSupport(
    answers.business,
  );

  if (strategicSupportRecommended) {
    reasons.push(
      "Maturité business incomplète (branding, segmentation, acquisition ou conversion)",
    );
  }

  if (hasContradictorySignals(answers, needs)) {
    reasons.push(
      "Signaux contradictoires ou insuffisants pour une orientation nette",
    );
    return {
      technical: TECHNICAL_RECOMMENDATIONS.NEEDS_DISCOVERY,
      strategicSupportRecommended,
      reasons,
    };
  }

  const strong = countStrongCustomNeeds(needs);
  const soft = countSoftCustomNeeds(needs);

  if (strong >= 2) {
    reasons.push("Plusieurs contraintes métier spécifiques détectées");
    return {
      technical: TECHNICAL_RECOMMENDATIONS.CUSTOM_REVIEW,
      strategicSupportRecommended,
      reasons,
    };
  }

  if (
    strong === 1 &&
    (hasCustomLeaningObjective(answers.objective) ||
      isLargeCatalog(answers.catalogSize) ||
      soft >= 2)
  ) {
    reasons.push(
      "Contrainte spécifique combinée à un objectif ou un catalogue exigeant",
    );
    return {
      technical: TECHNICAL_RECOMMENDATIONS.CUSTOM_REVIEW,
      strategicSupportRecommended,
      reasons,
    };
  }

  if (
    answers.objective === "SPECIFIC_EXPERIENCE" &&
    (strong >= 1 || soft >= 2 || isLargeCatalog(answers.catalogSize))
  ) {
    reasons.push("Expérience d'achat spécifique avec contraintes associées");
    return {
      technical: TECHNICAL_RECOMMENDATIONS.CUSTOM_REVIEW,
      strategicSupportRecommended,
      reasons,
    };
  }

  const saasFriendly =
    hasStandardLaunchObjective(answers.objective) &&
    isSmallCatalog(answers.catalogSize) &&
    strong === 0 &&
    soft <= 1 &&
    isFastTimeline(answers.timeline);

  if (saasFriendly) {
    reasons.push(
      "Besoin standard, catalogue contenu et peu d'intégrations spécifiques",
    );
    return {
      technical: TECHNICAL_RECOMMENDATIONS.SAAS_LIKELY,
      strategicSupportRecommended,
      reasons,
    };
  }

  if (
    strong === 0 &&
    soft <= 1 &&
    isSmallCatalog(answers.catalogSize) &&
    (answers.objective === "LAUNCH_FAST" ||
      answers.objective === "BUILD_BRAND" ||
      answers.objective === "INCREASE_CONVERSIONS")
  ) {
    reasons.push("Profil compatible avec une plateforme e-commerce existante");
    return {
      technical: TECHNICAL_RECOMMENDATIONS.SAAS_LIKELY,
      strategicSupportRecommended,
      reasons,
    };
  }

  if (strong === 0 && soft <= 2 && answers.objective === "LAUNCH_FAST") {
    reasons.push("Lancement rapide avec contraintes encore gérables en SaaS");
    return {
      technical: TECHNICAL_RECOMMENDATIONS.SAAS_LIKELY,
      strategicSupportRecommended,
      reasons,
    };
  }

  if (strong === 1 && soft === 0 && isSmallCatalog(answers.catalogSize)) {
    reasons.push(
      "Une contrainte spécifique isolée : une découverte courte est préférable",
    );
    return {
      technical: TECHNICAL_RECOMMENDATIONS.NEEDS_DISCOVERY,
      strategicSupportRecommended,
      reasons,
    };
  }

  reasons.push(
    "Profil mixte : une discussion courte permettra d'affiner l'orientation",
  );
  return {
    technical: TECHNICAL_RECOMMENDATIONS.NEEDS_DISCOVERY,
    strategicSupportRecommended,
    reasons,
  };
}

/**
 * Libellé affiché pour une orientation technique (jamais le code interne).
 */
export function getTechnicalLabel(technical) {
  if (technical === TECHNICAL_RECOMMENDATIONS.SAAS_LIKELY) {
    return "Plateforme e-commerce existante adaptée";
  }
  if (technical === TECHNICAL_RECOMMENDATIONS.CUSTOM_REVIEW) {
    return "Étude d'architecture recommandée";
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

/**
 * Textes utilisateur (pas d'audit gratuit complet).
 */
export function getRecommendationCopy(recommendation) {
  const { technical, strategicSupportRecommended } = recommendation;

  if (technical === TECHNICAL_RECOMMENDATIONS.SAAS_LIKELY) {
    return {
      headline: "Une plateforme e-commerce existante semble adaptée",
      body: strategicSupportRecommended
        ? "Une plateforme e-commerce existante semble pouvoir couvrir une grande partie de votre besoin. Certains enjeux de stratégie, branding ou conversion méritent néanmoins d'être travaillés."
        : "Une plateforme e-commerce existante (type Shopify ou SaaS adapté) semble pouvoir couvrir une grande partie de votre besoin, avec un time-to-market favorable.",
    };
  }

  if (technical === TECHNICAL_RECOMMENDATIONS.CUSTOM_REVIEW) {
    return {
      headline: "Des contraintes spécifiques méritent une étude d'architecture",
      body: "Votre projet présente plusieurs contraintes spécifiques. Une solution standard pourrait nécessiter plusieurs extensions ou adaptations. Une étude permettrait de déterminer l'architecture offrant le meilleur rapport valeur / coût / évolutivité.",
    };
  }

  return {
    headline: "Une découverte courte permettra d'affiner l'orientation",
    body: strategicSupportRecommended
      ? "Les éléments partagés ne suffisent pas encore pour trancher entre une solution SaaS et une approche plus sur-mesure. Un échange permettra de clarifier le besoin business et les priorités, y compris stratégie, branding ou conversion si nécessaire."
      : "Les éléments partagés ne suffisent pas encore pour trancher entre une solution SaaS et une approche plus sur-mesure. Un échange court permettra de clarifier le besoin et les priorités.",
  };
}

/**
 * Message prérempli pour le formulaire de contact.
 */
export function buildContactDraftMessage(answers, recommendation) {
  const copy = getRecommendationCopy(recommendation);
  const needs = labelsForMulti("needs", normalizeNeeds(answers.needs));
  const business = labelsForMulti("business", normalizeBusiness(answers.business));

  return [
    "Bonjour Axel,",
    "",
    "Je viens de réaliser le diagnostic e-commerce de votre portfolio.",
    "",
    `Orientation reçue : ${copy.headline}`,
    `Recommandation technique : ${getTechnicalLabel(recommendation.technical)}`,
    `Accompagnement stratégique recommandé : ${
      recommendation.strategicSupportRecommended ? "oui" : "non"
    }`,
    "",
    "Résumé de mes réponses :",
    `- Situation actuelle : ${labelForAnswer("currentSolution", answers.currentSolution)}`,
    `- Objectif : ${labelForAnswer("objective", answers.objective)}`,
    `- Catalogue : ${labelForAnswer("catalogSize", answers.catalogSize)}`,
    `- Besoins : ${needs.length ? needs.join(", ") : "aucun déclaré"}`,
    `- Maturité business : ${business.length ? business.join(", ") : "peu définie"}`,
    `- Budget : ${labelForAnswer("budget", answers.budget)}`,
    `- Délai : ${labelForAnswer("timeline", answers.timeline)}`,
    "",
    "Je souhaite étudier mon projet avec vous.",
  ].join("\n");
}
