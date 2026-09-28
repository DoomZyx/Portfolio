export const sendMessageToGPT = async (
  messages,
  { captureLead = true, tracking = {} } = {},
) => {
  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:3001/api/chat";

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages,
      captureLead,
      tracking: {
        landingPage: tracking.landingPage || window.location.href,
        referrer: tracking.referrer || document.referrer || undefined,
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Erreur API: ${response.status}`);
  }

  const data = await response.json();
  return {
    message: data.message || "Désolé, je n'ai pas pu générer de réponse.",
    leadCreated: Boolean(data.leadCreated),
    lead: data.lead || null,
  };
};
