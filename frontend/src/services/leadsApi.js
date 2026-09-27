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
  tracking = {},
}) {
  return {
    name: contact.name,
    email: contact.email,
    phone: contact.phone || undefined,
    company: contact.company || undefined,
    message: contact.message || undefined,
    projectType: "ecommerce",
    source: tracking.source || "diagnostic_ecommerce",
    utmSource: tracking.utmSource || undefined,
    utmMedium: tracking.utmMedium || undefined,
    utmCampaign: tracking.utmCampaign || undefined,
    landingPage: tracking.landingPage || window.location.href,
    referrer: tracking.referrer || document.referrer || undefined,
    diagnostic: {
      currentSolution: answers.currentSolution,
      objective: answers.objective,
      catalogSize: answers.catalogSize,
      needs: answers.needs,
      business: answers.business,
      budget: answers.budget,
      timeline: answers.timeline,
    },
  };
}
