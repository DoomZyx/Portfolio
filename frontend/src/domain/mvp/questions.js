/**
 * Questions du diagnostic MVP / produit (valeurs stables).
 */

export const DIAGNOSTIC_STEPS = [
  {
    id: "productStage",
    title: "Maturité produit",
    description: "Où en est votre projet aujourd'hui ?",
    type: "single",
    options: [
      { value: "IDEA", label: "Idée / concept" },
      { value: "PROTOTYPE", label: "Prototype ou maquettes" },
      { value: "EARLY_USERS", label: "Premiers utilisateurs" },
      { value: "REVENUE", label: "Déjà en production / revenus" },
    ],
  },
  {
    id: "objective",
    title: "Objectif principal",
    description: "Que voulez-vous accomplir en priorité ?",
    type: "single",
    options: [
      { value: "VALIDATE_MARKET", label: "Valider le marché rapidement" },
      { value: "BUILD_MVP", label: "Concevoir et livrer un MVP" },
      { value: "EXTEND_PRODUCT", label: "Étendre un produit existant" },
      { value: "REBUILD", label: "Reconstruire une base devenue limitée" },
    ],
  },
  {
    id: "maturity",
    title: "Cadrage business",
    description:
      "Quels éléments sont déjà établis ? (plusieurs choix possibles)",
    type: "multi",
    options: [
      { value: "BUSINESS_MODEL", label: "Business model défini" },
      { value: "GO_TO_MARKET", label: "Plan go-to-market établi" },
      { value: "PRICING", label: "Pricing / offre clarifiés" },
      { value: "TARGET_USERS", label: "Cible utilisateurs précise" },
      { value: "COMPETITORS", label: "Concurrents / différenciation connus" },
      { value: "NONE", label: "Aucun de ces éléments pour l'instant" },
    ],
  },
  {
    id: "scopeClarity",
    title: "Périmètre MVP",
    description: "Le périmètre du premier livrable est-il clair ?",
    type: "single",
    options: [
      { value: "CLEAR_CORE", label: "Oui : un cœur de valeur bien défini" },
      { value: "PARTIAL", label: "Partiellement : encore quelques doutes" },
      { value: "UNCLEAR", label: "Non : trop large ou flou" },
    ],
  },
  {
    id: "constraints",
    title: "Contraintes techniques",
    description: "Quels besoins s'appliquent ? (plusieurs choix possibles)",
    type: "multi",
    options: [
      { value: "AUTH_ROLES", label: "Comptes / rôles utilisateurs" },
      { value: "PAYMENTS", label: "Paiements" },
      { value: "INTEGRATIONS", label: "Intégrations tierces / API" },
      { value: "REALTIME", label: "Temps réel / notifications" },
      { value: "MOBILE", label: "Mobile natif ou app" },
      { value: "DATA_HEAVY", label: "Données / reporting avancés" },
      { value: "OTHER_SPECIFIC", label: "Autre besoin spécifique" },
      { value: "NONE", label: "Aucun de ces besoins" },
    ],
  },
  {
    id: "budget",
    title: "Budget indicatif",
    description: "Quelle enveloppe envisagez-vous pour démarrer ?",
    type: "single",
    options: [
      { value: "UNDER_2K", label: "Moins de 2 000 €" },
      { value: "FROM_2K_TO_5K", label: "2 à 5 k€" },
      { value: "FROM_5K_TO_10K", label: "5 à 10 k€" },
      { value: "FROM_10K_TO_20K", label: "10 à 20 k€" },
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
      { value: "FROM_1_TO_3_MONTHS", label: "1 à 3 mois" },
      { value: "FROM_3_TO_6_MONTHS", label: "3 à 6 mois" },
      { value: "OVER_6_MONTHS", label: "6 mois+" },
    ],
  },
];

export const TECHNICAL_RECOMMENDATIONS = {
  MVP_BUILD: "MVP_BUILD",
  MVP_SCOPING: "MVP_SCOPING",
  NEEDS_DISCOVERY: "NEEDS_DISCOVERY",
};
