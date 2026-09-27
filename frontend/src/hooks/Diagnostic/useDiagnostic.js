import { useState } from "react";
import { buildLeadPayloadFromDiagnostic, createLead } from "../../services/leadsApi";

const INITIAL_CONTACT = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
};

/**
 * Parcours diagnostic générique (sans rendu).
 */
export function useDiagnostic({
  projectType,
  source,
  steps,
  initialAnswers,
  computeRecommendation,
  getRecommendationCopy,
  buildContactDraftMessage,
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState(initialAnswers);
  const [contact, setContact] = useState(INITIAL_CONTACT);
  const [error, setError] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [recommendation, setRecommendation] = useState(null);

  const totalSteps = steps.length;
  const currentStep = steps[stepIndex];
  const progressPercent = Math.round(
    ((stepIndex + (isComplete ? 1 : 0)) / totalSteps) * 100,
  );

  function setSingleAnswer(stepId, value) {
    setAnswers((prev) => ({ ...prev, [stepId]: value }));
    setError("");
  }

  function toggleMultiAnswer(stepId, value) {
    setAnswers((prev) => {
      const current = Array.isArray(prev[stepId]) ? prev[stepId] : [];

      if (value === "NONE") {
        return { ...prev, [stepId]: ["NONE"] };
      }

      const withoutNone = current.filter((item) => item !== "NONE");
      const next = withoutNone.includes(value)
        ? withoutNone.filter((item) => item !== value)
        : [...withoutNone, value];

      return { ...prev, [stepId]: next };
    });
    setError("");
  }

  function updateContactField(field, value) {
    setContact((prev) => ({ ...prev, [field]: value }));
    setError("");
  }

  function validateCurrentStep() {
    if (!currentStep) return false;

    if (currentStep.type === "single") {
      if (!answers[currentStep.id]) {
        setError("Veuillez sélectionner une option pour continuer.");
        return false;
      }
      return true;
    }

    const selected = answers[currentStep.id];
    if (!Array.isArray(selected) || selected.length === 0) {
      setError("Veuillez sélectionner au moins une option pour continuer.");
      return false;
    }
    return true;
  }

  function goNext() {
    if (!validateCurrentStep()) return;

    if (stepIndex >= totalSteps - 1) {
      const result = computeRecommendation(answers);
      setRecommendation(result);
      setIsComplete(true);
      setError("");
      return;
    }

    setStepIndex((prev) => prev + 1);
    setError("");
  }

  function goBack() {
    if (showContactForm) {
      setShowContactForm(false);
      setError("");
      return;
    }
    if (isComplete) {
      setIsComplete(false);
      setRecommendation(null);
      return;
    }
    if (stepIndex === 0) return;
    setStepIndex((prev) => prev - 1);
    setError("");
  }

  function restart() {
    setStepIndex(0);
    setAnswers(initialAnswers);
    setContact(INITIAL_CONTACT);
    setError("");
    setIsComplete(false);
    setShowContactForm(false);
    setIsSubmittingLead(false);
    setLeadSubmitted(false);
    setRecommendation(null);
  }

  function openContactForm() {
    if (!recommendation) return;
    const draftMessage = buildContactDraftMessage(answers, recommendation);
    setContact((prev) => ({
      ...prev,
      message: draftMessage,
    }));
    setShowContactForm(true);
    setError("");
  }

  async function submitLead() {
    if (!contact.name.trim() || !contact.email.trim()) {
      setError("Le nom et l'email sont obligatoires.");
      return false;
    }

    setIsSubmittingLead(true);
    setError("");
    try {
      const payload = buildLeadPayloadFromDiagnostic({
        contact: {
          name: contact.name.trim(),
          email: contact.email.trim(),
          phone: contact.phone.trim(),
          company: contact.company.trim(),
          message: contact.message.trim(),
        },
        answers,
        projectType,
        tracking: {
          source,
          landingPage: window.location.href,
          referrer: document.referrer || undefined,
        },
      });
      await createLead(payload);
      setLeadSubmitted(true);
      setShowContactForm(false);
      return true;
    } catch (err) {
      setError(err.message || "Envoi impossible pour le moment.");
      return false;
    } finally {
      setIsSubmittingLead(false);
    }
  }

  const recommendationCopy = recommendation
    ? getRecommendationCopy(recommendation)
    : null;

  return {
    stepIndex,
    totalSteps,
    currentStep,
    answers,
    contact,
    error,
    isComplete,
    showContactForm,
    isSubmittingLead,
    leadSubmitted,
    recommendation,
    recommendationCopy,
    progressPercent,
    setSingleAnswer,
    toggleMultiAnswer,
    updateContactField,
    goNext,
    goBack,
    restart,
    openContactForm,
    submitLead,
  };
}
