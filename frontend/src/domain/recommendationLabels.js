import { getTechnicalLabel as getEcommerceLabel } from "./ecommerce/recommendation.js";
import { getTechnicalLabel as getMvpLabel } from "./mvp/recommendation.js";
import { getTechnicalLabel as getVisibilityLabel } from "./visibility/recommendation.js";

/**
 * Libellé d'orientation technique selon le type de projet.
 */
export function getTechnicalLabel(technical, projectType = "ecommerce") {
  if (projectType === "mvp") return getMvpLabel(technical);
  if (projectType === "visibility") return getVisibilityLabel(technical);
  return getEcommerceLabel(technical);
}
