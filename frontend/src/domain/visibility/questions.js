/**
 * Questions du diagnostic visibilité / présence en ligne (valeurs stables).
 */

export const DIAGNOSTIC_STEPS = [
  {
    id: "currentPresence",
    title: "Présence actuelle",
    description: "Quelle est votre situation en ligne aujourd'hui ?",
    type: "single",
    options: [
      { value: "NONE", label: "Pas encore de site" },
      { value: "SOCIAL_ONLY", label: "Réseaux sociaux uniquement" },
      { value: "OUTDATED_SITE", label: "Site existant mais daté / peu clair" },
      { value: "ACTIVE_SITE", label: "Site déjà en place" },
    ],
  },
  {
    id: "objective",
    title: "Objectif principal",
    description: "Que voulez-vous obtenir en priorité ?",
    type: "single",
    options: [
      { value: "CREDIBILITY", label: "Gagner en crédibilité" },
      { value: "GENERATE_LEADS", label: "Générer des prises de contact" },
      { value: "BRAND_IMAGE", label: "Améliorer l'image de marque" },
      { value: "ANNOUNCE", label: "Annoncer une offre / un lancement" },
    ],
  },
  {
    id: "contentReady",
    title: "Contenus disponibles",
    description: "Quels éléments avez-vous déjà ? (plusieurs choix possibles)",
    type: "multi",
    options: [
      { value: "TEXTS", label: "Textes / messages clés" },
      { value: "VISUALS", label: "Visuels / identité visuelle" },
      { value: "OFFER_CLEAR", label: "Offre / services clairement définis" },
      { value: "REFERENCES", label: "Références / cas clients" },
      { value: "NONE", label: "Peu ou pas de contenus prêts" },
    ],
  },
  {
    id: "pagesNeeded",
    title: "Format souhaité",
    description: "Quel format vous semble le plus adapté ?",
    type: "single",
    options: [
      { value: "LANDING", label: "Une landing page ciblée" },
      { value: "MULTI_PAGE", label: "Un site multi-pages" },
      { value: "REDESIGN", label: "Une refonte du site existant" },
      { value: "UNSURE", label: "Je ne sais pas encore" },
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
  LANDING: "LANDING",
  CORPORATE_SITE: "CORPORATE_SITE",
  REDESIGN: "REDESIGN",
  NEEDS_DISCOVERY: "NEEDS_DISCOVERY",
};
