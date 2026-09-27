import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  computeEcommerceRecommendation,
  shouldRecommendStrategicSupport,
  normalizeNeeds,
} from "./recommendation.js";
import { TECHNICAL_RECOMMENDATIONS } from "./questions.js";

const baseAnswers = {
  currentSolution: "NONE",
  objective: "LAUNCH_FAST",
  catalogSize: "UNDER_20",
  needs: ["NONE"],
  business: ["BRANDING", "SEGMENTATION", "ACQUISITION", "CONVERSION"],
  budget: "FROM_2K_TO_5K",
  timeline: "FROM_1_TO_3_MONTHS",
};

describe("normalizeNeeds", () => {
  it("traite NONE comme aucun besoin", () => {
    assert.deepEqual(normalizeNeeds(["NONE", "B2B_PRICING"]), []);
  });

  it("déduplique les besoins", () => {
    assert.deepEqual(normalizeNeeds(["B2B_PRICING", "B2B_PRICING"]), [
      "B2B_PRICING",
    ]);
  });
});

describe("shouldRecommendStrategicSupport", () => {
  it("active le support si un pilier manque", () => {
    assert.equal(
      shouldRecommendStrategicSupport(["BRANDING", "SEGMENTATION"]),
      true,
    );
  });

  it("désactive le support si tous les piliers sont présents", () => {
    assert.equal(
      shouldRecommendStrategicSupport([
        "BRANDING",
        "SEGMENTATION",
        "ACQUISITION",
        "CONVERSION",
      ]),
      false,
    );
  });
});

describe("computeEcommerceRecommendation", () => {
  it("retourne une orientation plateforme existante pour un lancement standard simple", () => {
    const result = computeEcommerceRecommendation(baseAnswers);
    assert.equal(result.technical, TECHNICAL_RECOMMENDATIONS.SAAS_LIKELY);
    assert.equal(result.strategicSupportRecommended, false);
  });

  it("active strategicSupportRecommended si maturité incomplète", () => {
    const result = computeEcommerceRecommendation({
      ...baseAnswers,
      business: ["NONE"],
    });
    assert.equal(result.technical, TECHNICAL_RECOMMENDATIONS.SAAS_LIKELY);
    assert.equal(result.strategicSupportRecommended, true);
  });

  it("retourne une étude architecture pour plusieurs contraintes métier", () => {
    const result = computeEcommerceRecommendation({
      ...baseAnswers,
      objective: "AUTOMATE_PROCESSES",
      needs: ["MARKETPLACE", "ERP_CRM_API", "B2B_PRICING"],
      catalogSize: "FROM_100_TO_1000",
      budget: "OVER_20K",
      timeline: "FROM_3_TO_6_MONTHS",
    });
    assert.equal(result.technical, TECHNICAL_RECOMMENDATIONS.CUSTOM_REVIEW);
  });

  it("retourne une étude architecture pour configurateur + expérience spécifique", () => {
    const result = computeEcommerceRecommendation({
      ...baseAnswers,
      objective: "SPECIFIC_EXPERIENCE",
      needs: ["CONFIGURATOR"],
      catalogSize: "FROM_20_TO_100",
      timeline: "FROM_3_TO_6_MONTHS",
      budget: "FROM_10K_TO_20K",
    });
    assert.equal(result.technical, TECHNICAL_RECOMMENDATIONS.CUSTOM_REVIEW);
  });

  it("retourne une découverte si réponses manquantes", () => {
    const result = computeEcommerceRecommendation({ objective: "LAUNCH_FAST" });
    assert.equal(result.technical, TECHNICAL_RECOMMENDATIONS.NEEDS_DISCOVERY);
  });

  it("retourne une découverte en cas de signaux contradictoires", () => {
    const result = computeEcommerceRecommendation({
      ...baseAnswers,
      objective: "LAUNCH_FAST",
      timeline: "UNDER_1_MONTH",
      budget: "UNDER_2K",
      needs: ["MARKETPLACE", "ERP_CRM_API"],
    });
    assert.equal(result.technical, TECHNICAL_RECOMMENDATIONS.NEEDS_DISCOVERY);
  });

  it("ne force pas le custom pour un besoin SaaS classique", () => {
    const result = computeEcommerceRecommendation({
      ...baseAnswers,
      currentSolution: "SHOPIFY",
      objective: "INCREASE_CONVERSIONS",
      needs: ["SUBSCRIPTION"],
      business: ["NONE"],
    });
    assert.equal(result.technical, TECHNICAL_RECOMMENDATIONS.SAAS_LIKELY);
    assert.equal(result.strategicSupportRecommended, true);
  });
});
