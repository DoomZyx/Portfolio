const API_BASE = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace(/\/api\/chat\/?$/, "")
  : "";

export async function createLead(payload) {
  const response = await fetch(`${API_BASE}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || `Erreur API: ${response.status}`);
  }
  return data;
}

export function buildLeadPayloadFromDiagnostic({
  contact,
  answers,
  projectType = "ecommerce",
  tracking = {},
}) {
  const defaultSource =
    projectType === "mvp"
      ? "diagnostic_mvp"
      : projectType === "visibility"
        ? "diagnostic_visibility"
        : "diagnostic_ecommerce";

  return {
    name: contact.name,
    email: contact.email,
    phone: contact.phone || undefined,
    company: contact.company || undefined,
    message: contact.message || undefined,
    projectType,
    source: tracking.source || defaultSource,
    utmSource: tracking.utmSource || undefined,
    utmMedium: tracking.utmMedium || undefined,
    utmCampaign: tracking.utmCampaign || undefined,
    landingPage: tracking.landingPage || window.location.href,
    referrer: tracking.referrer || document.referrer || undefined,
    diagnostic: { ...answers },
  };
}
