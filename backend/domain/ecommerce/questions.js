/**
 * Définition des questions du diagnostic e-commerce (MVP).
 * Valeurs stables utilisées par le moteur de recommandation.
 */

export const DIAGNOSTIC_STEPS = [
  {
    id: "currentSolution",
    title: "Situation actuelle",
    description: "Quelle est votre situation e-commerce aujourd'hui ?",
    type: "single",
    options: [
      { value: "NONE", label: "Pas encore de boutique" },
      { value: "SHOPIFY", label: "Shopify" },
      { value: "WOOCOMMERCE", label: "WooCommerce" },
      { value: "OTHER_SAAS", label: "Autre SaaS" },
      { value: "CUSTOM", label: "Solution custom" },
    ],
  },
  {
    id: "objective",
    title: "Objectif principal",
    description: "Quel est l'objectif prioritaire de votre projet ?",
    type: "single",
    options: [
      { value: "LAUNCH_FAST", label: "Lancer rapidement" },
      { value: "BUILD_BRAND", label: "Construire / développer une marque" },
      { value: "INCREASE_CONVERSIONS", label: "Augmenter les conversions" },
      { value: "REPLACE_LIMITED", label: "Remplacer une solution devenue limitée" },
      { value: "AUTOMATE_PROCESSES", label: "Automatiser des processus métier" },
      { value: "SPECIFIC_EXPERIENCE", label: "Créer une expérience d'achat spécifique" },
    ],
  },
  {
    id: "catalogSize",
    title: "Taille du catalogue",
    description: "Combien de produits environ ?",
    type: "single",
    options: [
      { value: "UNDER_20", label: "Moins de 20 produits" },
      { value: "FROM_20_TO_100", label: "20–100" },
      { value: "FROM_100_TO_1000", label: "100–1000" },
      { value: "OVER_1000", label: "1000+" },
    ],
  },
  {
    id: "needs",
    title: "Fonctionnalités / contraintes",
    description: "Quels besoins spécifiques s'appliquent à votre projet ? (plusieurs choix possibles)",
    type: "multi",
    options: [
      { value: "SUBSCRIPTION", label: "Abonnement" },
      { value: "B2B_PRICING", label: "B2B / tarification spécifique" },
      { value: "MARKETPLACE", label: "Marketplace" },
      { value: "ADVANCED_ACCOUNT", label: "Espace client avancé" },
      { value: "CONFIGURATOR", label: "Configurateur" },
      { value: "INTERNATIONAL", label: "International / multi-pays" },
      { value: "ERP_CRM_API", label: "ERP / CRM / API externe" },
      { value: "SPECIAL_LOGISTICS", label: "Règles logistiques particulières" },
      { value: "OTHER_SPECIFIC", label: "Autre besoin spécifique" },
      { value: "NONE", label: "Aucun de ces besoins" },
    ],
  },
  {
    id: "business",
    title: "Maturité business",
    description: "Quels éléments sont déjà définis chez vous ? (plusieurs choix possibles)",
    type: "multi",
    options: [
      { value: "BRANDING", label: "Identité visuelle / branding défini" },
      { value: "SEGMENTATION", label: "Segmentation client définie" },
      { value: "ACQUISITION", label: "Stratégie d'acquisition définie" },
      { value: "CONVERSION", label: "Parcours de conversion travaillé" },
      { value: "NONE", label: "Aucun de ces éléments pour l'instant" },
    ],
  },
  {
    id: "budget",
    title: "Budget indicatif",
    description: "Quelle enveloppe envisagez-vous pour démarrer ?",
    type: "single",
    options: [
      { value: "UNDER_2K", label: "Moins de 2 000 €" },
      { value: "FROM_2K_TO_5K", label: "2–5 k€" },
      { value: "FROM_5K_TO_10K", label: "5–10 k€" },
      { value: "FROM_10K_TO_20K", label: "10–20 k€" },
      { value: "OVER_20K", label: "20 k€+" },
    ],
  },
  {
    id: "timeline",
    title: "Délai",
    description: "Dans quel délai souhaitez-vous avancer ?",
    type: "single",
    options: [
      { value: "UNDER_1_MONTH", label: "Moins d'1 mois" },
      { value: "FROM_1_TO_3_MONTHS", label: "1–3 mois" },
      { value: "FROM_3_TO_6_MONTHS", label: "3–6 mois" },
      { value: "OVER_6_MONTHS", label: "6 mois+" },
    ],
  },
];

export const TECHNICAL_RECOMMENDATIONS = {
  SAAS_LIKELY: "SAAS_LIKELY",
  CUSTOM_REVIEW: "CUSTOM_REVIEW",
  NEEDS_DISCOVERY: "NEEDS_DISCOVERY",
};

export const CONTACT_DRAFT_STORAGE_KEY = "portfolio_diagnostic_contact_draft";
