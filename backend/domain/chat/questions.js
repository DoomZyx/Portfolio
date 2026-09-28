/**
 * Questions / champs du lead issu du chatbot (affichage admin).
 */

export const DIAGNOSTIC_STEPS = [
  {
    id: "intent",
    title: "Intention",
    description: "Intention détectée dans la conversation",
    type: "single",
    options: [
      { value: "create", label: "Créer un produit" },
      { value: "improve", label: "Améliorer / refondre" },
      { value: "services", label: "Services / devis" },
      { value: "general", label: "Général" },
      { value: "unknown", label: "Non déterminée" },
    ],
  },
  {
    id: "projectSummary",
    title: "Résumé projet",
    description: "Synthèse extraite de la conversation",
    type: "text",
    options: [],
  },
];

export const TECHNICAL_RECOMMENDATIONS = {
  CHAT_QUALIFIED: "CHAT_QUALIFIED",
  NEEDS_DISCOVERY: "NEEDS_DISCOVERY",
};
