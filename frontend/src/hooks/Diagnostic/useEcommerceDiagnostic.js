import { useDiagnostic } from "./useDiagnostic";
import { DIAGNOSTIC_STEPS } from "../../domain/ecommerce/questions";
import {
  buildContactDraftMessage,
  computeEcommerceRecommendation,
  getRecommendationCopy,
} from "../../domain/ecommerce/recommendation";

const INITIAL_ANSWERS = {
  currentSolution: "",
  objective: "",
  catalogSize: "",
  needs: [],
  business: [],
  budget: "",
  timeline: "",
};

/**
 * Logique du parcours diagnostic e-commerce (sans rendu).
 */
export function useEcommerceDiagnostic() {
  return useDiagnostic({
    projectType: "ecommerce",
    source: "diagnostic_ecommerce",
    steps: DIAGNOSTIC_STEPS,
    initialAnswers: INITIAL_ANSWERS,
    computeRecommendation: computeEcommerceRecommendation,
    getRecommendationCopy,
    buildContactDraftMessage,
  });
}
