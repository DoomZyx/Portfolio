import { useState, useEffect, useCallback, useRef } from "react";
import { sendMessageToGPT } from "../../services/chatbotApi";

const INITIAL_MESSAGE = {
  id: 1,
  sender: "bot",
  text: "Bonjour ! Je suis l'assistant virtuel d'Axel Cella. Comment puis-je vous aider aujourd'hui ? Souhaitez-vous créer un nouveau produit digital, améliorer un existant, ou en savoir plus sur les services proposés ?",
};

export const useChatBot = () => {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const conversationHistoryRef = useRef([INITIAL_MESSAGE]);
  const leadCapturedRef = useRef(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const identifyUserIntent = (message) => {
    const lowerMessage = message.toLowerCase();

    if (
      lowerMessage.includes("créer") ||
      lowerMessage.includes("nouveau") ||
      lowerMessage.includes("nouvelle") ||
      lowerMessage.includes("développer") ||
      lowerMessage.includes("application") ||
      lowerMessage.includes("app") ||
      lowerMessage.includes("site")
    ) {
      return "create";
    }

    if (
      lowerMessage.includes("améliorer") ||
      lowerMessage.includes("refonte") ||
      lowerMessage.includes("optimiser") ||
      lowerMessage.includes("existant") ||
      lowerMessage.includes("modifier")
    ) {
      return "improve";
    }

    if (
      lowerMessage.includes("service") ||
      lowerMessage.includes("propose") ||
      lowerMessage.includes("offre") ||
      lowerMessage.includes("tarif") ||
      lowerMessage.includes("prix") ||
      lowerMessage.includes("devis")
    ) {
      return "services";
    }

    return "general";
  };

  const shouldShowContactCTA = (intent, messageCount) => {
    return intent === "create" || intent === "improve" || messageCount > 3;
  };

  const scrollToContact = useCallback(() => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  }, []);

  const scrollToPortfolio = useCallback(() => {
    const portfolioSection = document.getElementById("portfolio");
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  }, []);

  const sendMessage = useCallback(async (userMessage) => {
    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: userMessage,
    };

    setMessages((prev) => [...prev, userMsg]);
    conversationHistoryRef.current.push(userMsg);
    setIsLoading(true);

    try {
      const result = await sendMessageToGPT(conversationHistoryRef.current, {
        captureLead: !leadCapturedRef.current,
        tracking: {
          landingPage: window.location.href,
          referrer: document.referrer || undefined,
        },
      });

      const botMsg = {
        id: Date.now() + 1,
        sender: "bot",
        text: result.message,
      };

      setMessages((prev) => [...prev, botMsg]);
      conversationHistoryRef.current.push(botMsg);

      if (result.leadCreated && !leadCapturedRef.current) {
        leadCapturedRef.current = true;
        const confirmMsg = {
          id: Date.now() + 2,
          sender: "bot",
          text: "Merci, vos coordonnées ont bien été transmises à Axel. Il vous recontactera rapidement pour la suite.",
        };
        setMessages((prev) => [...prev, confirmMsg]);
        conversationHistoryRef.current.push(confirmMsg);
      }

      const intent = identifyUserIntent(userMessage);
      const showCTA = shouldShowContactCTA(
        intent,
        conversationHistoryRef.current.length,
      );

      if (
        showCTA &&
        !leadCapturedRef.current &&
        !conversationHistoryRef.current.some((msg) => msg.action === "contact")
      ) {
        const ctaMsg = {
          id: Date.now() + 3,
          sender: "bot",
          text: "Souhaitez-vous que nous discutions de votre projet plus en détail ?",
          action: "contact",
        };

        setTimeout(() => {
          setMessages((prev) => [...prev, ctaMsg]);
          conversationHistoryRef.current.push(ctaMsg);
        }, 1000);
      }
    } catch {
      const errorMsg = {
        id: Date.now() + 1,
        sender: "bot",
        text: "Désolé, une erreur est survenue. Veuillez réessayer ou contactez directement Axel via le formulaire de contact.",
      };
      setMessages((prev) => [...prev, errorMsg]);
      conversationHistoryRef.current.push(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    messages,
    isOpen,
    isLoading,
    sendMessage,
    toggleChat,
    scrollToContact,
    scrollToPortfolio,
    shouldShowContactCTA: shouldShowContactCTA(
      identifyUserIntent(messages[messages.length - 1]?.text || ""),
      messages.length,
    ),
  };
};
