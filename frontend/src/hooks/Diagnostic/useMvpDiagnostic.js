import { DIAGNOSTIC_STEPS } from "../../domain/mvp/questions";
import {
  buildContactDraftMessage,
  computeMvpRecommendation,
  getRecommendationCopy,
} from "../../domain/mvp/recommendation";
import { useDiagnostic } from "./useDiagnostic";

const INITIAL_ANSWERS = {
  productStage: "",
  objective: "",
  maturity: [],
  scopeClarity: "",
  constraints: [],
  budget: "",
  timeline: "",
};

export function useMvpDiagnostic() {
  return useDiagnostic({
    projectType: "mvp",
    source: "diagnostic_mvp",
    steps: DIAGNOSTIC_STEPS,
    initialAnswers: INITIAL_ANSWERS,
    computeRecommendation: computeMvpRecommendation,
    getRecommendationCopy,
    buildContactDraftMessage,
  });
}
