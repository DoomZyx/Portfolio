import { DIAGNOSTIC_STEPS } from "../../domain/visibility/questions";
import {
  buildContactDraftMessage,
  computeVisibilityRecommendation,
  getRecommendationCopy,
} from "../../domain/visibility/recommendation";
import { useDiagnostic } from "./useDiagnostic";

const INITIAL_ANSWERS = {
  currentPresence: "",
  objective: "",
  contentReady: [],
  pagesNeeded: "",
  budget: "",
  timeline: "",
};

export function useVisibilityDiagnostic() {
  return useDiagnostic({
    projectType: "visibility",
    source: "diagnostic_visibility",
    steps: DIAGNOSTIC_STEPS,
    initialAnswers: INITIAL_ANSWERS,
    computeRecommendation: computeVisibilityRecommendation,
    getRecommendationCopy,
    buildContactDraftMessage,
  });
}
