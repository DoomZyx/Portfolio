export const sendMessageToGPT = async (messages) => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api/chat";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Erreur API: ${response.status}`);
    }

    const data = await response.json();
    return data.message || "Désolé, je n'ai pas pu générer de réponse.";
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API GPT:", error);
    throw error;
  }
};

