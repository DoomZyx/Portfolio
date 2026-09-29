import { Link } from "react-router-dom";
import "./_diagnostic.scss";

/* eslint-disable react/prop-types -- pas de PropTypes dans ce projet */
function DiagnosticOption({ type, name, value, label, checked, onChange }) {
  const inputId = `${name}-${value}`;

  return (
    <label
      className={`diagnostic-option${checked ? " is-selected" : ""}`}
      htmlFor={inputId}
    >
      <input
        id={inputId}
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className="diagnostic-option-label">{label}</span>
    </label>
  );
}

/**
 * UI commune des parcours diagnostic.
 */
function DiagnosticWizard({
  kicker,
  title,
  lead,
  hubLink = true,
  diagnostic,
}) {
  const {
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
  } = diagnostic;

  return (
    <div className="diagnostic-page">
      <div className="diagnostic-shell">
        <div className="diagnostic-topbar">
          <Link
            className="diagnostic-back-home"
            to={hubLink ? "/diagnostic" : "/"}
          >
            {hubLink ? "Tous les diagnostics" : "Retour au portfolio"}
          </Link>
          <p className="diagnostic-kicker">{kicker}</p>
        </div>

        <section
          className="diagnostic-card"
          aria-labelledby="diagnostic-heading"
        >
          <h1 id="diagnostic-heading" className="diagnostic-title">
            {title}
          </h1>
          <p className="diagnostic-lead">{lead}</p>

          <div
            className="diagnostic-progress"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="diagnostic-progress-meta">
              <span>
                {leadSubmitted
                  ? "Demande envoyée"
                  : showContactForm
                    ? "Coordonnées"
                    : isComplete
                      ? "Résultat"
                      : `Étape ${stepIndex + 1} sur ${totalSteps}`}
              </span>
              <span>{Math.min(progressPercent, 100)} %</span>
            </div>
            <div className="diagnostic-progress-track" aria-hidden="true">
              <div
                className="diagnostic-progress-bar"
                style={{ width: `${Math.min(progressPercent, 100)}%` }}
              />
            </div>
          </div>

          {!isComplete && currentStep && !showContactForm && !leadSubmitted && (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                goNext();
              }}
              noValidate
            >
              <h2 className="diagnostic-step-title">{currentStep.title}</h2>
              <p className="diagnostic-step-description">
                {currentStep.description}
              </p>

              <fieldset className="diagnostic-options">
                <legend className="visually-hidden">{currentStep.title}</legend>
                {currentStep.options.map((option) => {
                  const selected = answers[currentStep.id];
                  const checked =
                    currentStep.type === "single"
                      ? selected === option.value
                      : Array.isArray(selected) &&
                        selected.includes(option.value);

                  return (
                    <DiagnosticOption
                      key={option.value}
                      type={
                        currentStep.type === "single" ? "radio" : "checkbox"
                      }
                      name={currentStep.id}
                      value={option.value}
                      label={option.label}
                      checked={Boolean(checked)}
                      onChange={() => {
                        if (currentStep.type === "single") {
                          setSingleAnswer(currentStep.id, option.value);
                        } else {
                          toggleMultiAnswer(currentStep.id, option.value);
                        }
                      }}
                    />
                  );
                })}
              </fieldset>

              {error ? (
                <p className="diagnostic-error" role="alert">
                  {error}
                </p>
              ) : null}

              <div className="diagnostic-actions">
                <button
                  type="button"
                  className="diagnostic-btn diagnostic-btn-secondary"
                  onClick={goBack}
                  disabled={stepIndex === 0}
                >
                  Retour
                </button>
                <button
                  type="submit"
                  className="diagnostic-btn diagnostic-btn-primary"
                >
                  {stepIndex === totalSteps - 1
                    ? "Voir mon orientation"
                    : "Continuer"}
                </button>
              </div>
            </form>
          )}

          {isComplete &&
            recommendation &&
            recommendationCopy &&
            !showContactForm &&
            !leadSubmitted && (
              <div aria-live="polite">
                <h2 className="diagnostic-step-title">
                  {recommendationCopy.headline}
                </h2>
                <p className="diagnostic-result-body">
                  {recommendationCopy.body}
                </p>
                <p className="diagnostic-result-note">
                  Cette orientation est une première lecture, pas un audit
                  complet. Elle sert à cadrer la discussion : le bon choix
                  technique dépend toujours de votre contexte métier.
                </p>
                <div className="diagnostic-actions">
                  <button
                    type="button"
                    className="diagnostic-btn diagnostic-btn-secondary"
                    onClick={goBack}
                  >
                    Modifier mes réponses
                  </button>
                  <button
                    type="button"
                    className="diagnostic-btn diagnostic-btn-primary"
                    onClick={openContactForm}
                  >
                    Étudier mon projet
                  </button>
                  <button
                    type="button"
                    className="diagnostic-btn diagnostic-btn-secondary"
                    onClick={restart}
                  >
                    Recommencer
                  </button>
                </div>
              </div>
            )}

          {showContactForm && !leadSubmitted && (
            <form
              className="diagnostic-contact-form"
              onSubmit={(event) => {
                event.preventDefault();
                submitLead();
              }}
            >
              <h2 className="diagnostic-step-title">Étudier mon projet</h2>
              <p className="diagnostic-step-description">
                Laissez vos coordonnées : le diagnostic sera transmis avec votre
                demande. La recommandation est recalculée côté serveur.
              </p>

              <label htmlFor="lead-name">
                Nom
                <input
                  id="lead-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={contact.name}
                  onChange={(e) => updateContactField("name", e.target.value)}
                />
              </label>
              <label htmlFor="lead-email">
                Email
                <input
                  id="lead-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={contact.email}
                  onChange={(e) => updateContactField("email", e.target.value)}
                />
              </label>
              <label htmlFor="lead-phone">
                Téléphone
                <input
                  id="lead-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={contact.phone}
                  onChange={(e) => updateContactField("phone", e.target.value)}
                />
              </label>
              <label htmlFor="lead-company">
                Entreprise (optionnel)
                <input
                  id="lead-company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  value={contact.company}
                  onChange={(e) =>
                    updateContactField("company", e.target.value)
                  }
                />
              </label>
              <label htmlFor="lead-message">
                Message (optionnel)
                <textarea
                  id="lead-message"
                  name="message"
                  rows={8}
                  value={contact.message}
                  onChange={(e) =>
                    updateContactField("message", e.target.value)
                  }
                />
              </label>

              {error ? (
                <p className="diagnostic-error" role="alert">
                  {error}
                </p>
              ) : null}

              <div className="diagnostic-actions">
                <button
                  type="button"
                  className="diagnostic-btn diagnostic-btn-secondary"
                  onClick={goBack}
                  disabled={isSubmittingLead}
                >
                  Retour
                </button>
                <button
                  type="submit"
                  className="diagnostic-btn diagnostic-btn-primary"
                  disabled={isSubmittingLead}
                >
                  {isSubmittingLead ? "Envoi..." : "Envoyer ma demande"}
                </button>
              </div>
            </form>
          )}

          {leadSubmitted && (
            <div aria-live="polite">
              <h2 className="diagnostic-step-title">Demande bien reçue</h2>
              <p className="diagnostic-result-body">
                Merci. Votre diagnostic a été transmis. Je vous recontacte
                rapidement pour cadrer la suite.
              </p>
              <div className="diagnostic-actions">
                <Link className="diagnostic-btn diagnostic-btn-primary" to="/">
                  Retour au portfolio
                </Link>
                <button
                  type="button"
                  className="diagnostic-btn diagnostic-btn-secondary"
                  onClick={restart}
                >
                  Nouveau diagnostic
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default DiagnosticWizard;
