import { Link } from "react-router-dom";
import { getTechnicalLabel } from "../../../domain/recommendationLabels";
import {
  LEAD_STATUSES,
  formatDateTime,
  formatEuro,
  statusBadgeClass,
  statusLabel,
} from "../../../utils/adminLeads";

/* eslint-disable react/prop-types */
export function AdminLeadPipeline({
  lead,
  status,
  saving,
  onPipelineClick,
}) {
  const activeStatusIndex = LEAD_STATUSES.indexOf(status);

  return (
    <section className="admin-card">
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "0.75rem",
          marginBottom: "1rem",
        }}
      >
        <h2 className="admin-card-title" style={{ margin: 0 }}>
          Pipeline
        </h2>
        <span className={statusBadgeClass(lead.status)}>
          {statusLabel(lead.status)}
        </span>
      </div>
      <div className="admin-pipeline" role="group" aria-label="Statut du lead">
        {LEAD_STATUSES.map((item, index) => (
          <button
            key={item}
            type="button"
            className={`admin-pipeline-step${
              item === status ? " is-active" : ""
            }${
              item !== status &&
              index < activeStatusIndex &&
              status !== "LOST"
                ? " is-past"
                : ""
            }`}
            disabled={saving}
            onClick={() => onPipelineClick(item)}
          >
            {statusLabel(item)}
          </button>
        ))}
      </div>
    </section>
  );
}

export function AdminLeadContactForm({
  lead,
  name,
  email,
  phone,
  company,
  message,
  saving,
  onNameChange,
  onEmailChange,
  onPhoneChange,
  onCompanyChange,
  onMessageChange,
  onSubmit,
  onOpenMail,
}) {
  return (
    <section className="admin-card">
      <h2 className="admin-card-title">Coordonnees</h2>
      <form className="admin-form" onSubmit={onSubmit} style={{ maxWidth: "none" }}>
        <label htmlFor="lead-name">
          Nom
          <input
            id="lead-name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            required
          />
        </label>
        <label htmlFor="lead-email">
          Email
          <input
            id="lead-email"
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            required
          />
        </label>
        <label htmlFor="lead-phone">
          Telephone
          <input
            id="lead-phone"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
          />
        </label>
        <label htmlFor="lead-company">
          Entreprise
          <input
            id="lead-company"
            value={company}
            onChange={(e) => onCompanyChange(e.target.value)}
          />
        </label>
        <label htmlFor="lead-message">
          Message
          <textarea
            id="lead-message"
            rows={10}
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
          />
        </label>
        <button className="admin-btn" type="submit" disabled={saving}>
          {saving ? "Enregistrement..." : "Enregistrer les infos"}
        </button>
      </form>
      <div className="admin-contact-actions">
        <button
          type="button"
          className="admin-btn admin-btn-primary admin-btn-sm"
          disabled={!lead.email}
          onClick={onOpenMail}
        >
          Envoyer un email
        </button>
        {lead.phone ? (
          <a
            className="admin-btn admin-btn-secondary admin-btn-sm"
            href={`tel:${lead.phone}`}
          >
            Appeler
          </a>
        ) : null}
        <Link
          className="admin-btn admin-btn-secondary admin-btn-sm"
          to={`/admin/documents/new?type=QUOTE&leadId=${lead.id}`}
        >
          Creer un devis
        </Link>
        <Link
          className="admin-btn admin-btn-secondary admin-btn-sm"
          to={`/admin/documents/new?type=INVOICE&leadId=${lead.id}`}
        >
          Creer une facture
        </Link>
      </div>
    </section>
  );
}

export function AdminLeadInfoCards({
  lead,
  diagnosticRows,
  status,
  estimatedValue,
  finalValue,
  saving,
  onStatusChange,
  onEstimatedChange,
  onFinalChange,
  onSavePilot,
}) {
  return (
    <>
      <section className="admin-card">
        <h2 className="admin-card-title">Origine & recommandation</h2>
        <dl className="admin-kv">
          <div>
            <dt>Source</dt>
            <dd>{lead.source || "-"}</dd>
          </div>
          <div>
            <dt>
              <span className="admin-kv-label">
                UTM
                <details className="admin-help">
                  <summary
                    className="admin-help-trigger"
                    aria-label="Explication UTM"
                  >
                    ?
                  </summary>
                  <div className="admin-help-panel" role="note">
                    <p>
                      <strong>UTM</strong> (Urchin Tracking Module) : parametres
                      ajoutes a une URL pour identifier la provenance d&apos;un
                      lead.
                    </p>
                    <ul>
                      <li>
                        <strong>source</strong> : origine (Google, LinkedIn,
                        newsletter…)
                      </li>
                      <li>
                        <strong>medium</strong> : canal (cpc, email, social…)
                      </li>
                      <li>
                        <strong>campaign</strong> : nom de la campagne
                      </li>
                    </ul>
                    <p>
                      Affiche ici : source / medium / campaign, ou « - » si
                      absents.
                    </p>
                  </div>
                </details>
              </span>
            </dt>
            <dd>
              {[lead.utmSource, lead.utmMedium, lead.utmCampaign]
                .filter(Boolean)
                .join(" / ") || "-"}
            </dd>
          </div>
          <div>
            <dt>Landing</dt>
            <dd>{lead.landingPage || "-"}</dd>
          </div>
          <div>
            <dt>Orientation</dt>
            <dd>
              {lead.recommendation?.technical
                ? getTechnicalLabel(
                    lead.recommendation.technical,
                    lead.projectType,
                  )
                : "-"}
              {lead.recommendation?.strategicSupportRecommended
                ? " · accompagnement stratégique recommandé"
                : ""}
            </dd>
          </div>
          <div>
            <dt>Valeur estimée</dt>
            <dd>{formatEuro(lead.estimatedValue)}</dd>
          </div>
          <div>
            <dt>Valeur finale</dt>
            <dd>{formatEuro(lead.finalValue)}</dd>
          </div>
        </dl>
      </section>

      <section className="admin-card">
        <h2 className="admin-card-title">Réponses au diagnostic</h2>
        <dl className="admin-kv">
          {diagnosticRows.map((row) => (
            <div key={row.id}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="admin-card">
        <h2 className="admin-card-title">Pilot / valeurs</h2>
        <form
          className="admin-form"
          onSubmit={onSavePilot}
          style={{ maxWidth: "none" }}
        >
          <label htmlFor="lead-status">
            Statut
            <select
              id="lead-status"
              value={status}
              onChange={(e) => onStatusChange(e.target.value)}
            >
              {LEAD_STATUSES.map((item) => (
                <option key={item} value={item}>
                  {statusLabel(item)}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="lead-estimated">
            Valeur estimée (€)
            <input
              id="lead-estimated"
              type="number"
              min="0"
              step="100"
              value={estimatedValue}
              onChange={(e) => onEstimatedChange(e.target.value)}
            />
          </label>
          <label htmlFor="lead-final">
            Valeur finale (€)
            <input
              id="lead-final"
              type="number"
              min="0"
              step="100"
              value={finalValue}
              onChange={(e) => onFinalChange(e.target.value)}
            />
          </label>
          <button className="admin-btn" type="submit" disabled={saving}>
            {saving ? "Enregistrement..." : "Enregistrer"}
          </button>
        </form>
      </section>
    </>
  );
}

export function AdminLeadNotes({
  lead,
  note,
  onNoteChange,
  onAddNote,
}) {
  return (
    <section className="admin-card" style={{ marginTop: "1rem" }}>
      <h2 className="admin-card-title">Notes internes</h2>
      <form
        className="admin-form"
        onSubmit={onAddNote}
        style={{ maxWidth: "none" }}
      >
        <label htmlFor="lead-note">
          Nouvelle note
          <textarea
            id="lead-note"
            rows={4}
            value={note}
            onChange={(e) => onNoteChange(e.target.value)}
            required
            placeholder="Compte-rendu d'appel, prochaines étapes, points d'attention..."
          />
        </label>
        <button className="admin-btn" type="submit">
          Ajouter la note
        </button>
      </form>
      {(lead.notes || []).length === 0 ? (
        <p className="admin-muted" style={{ marginTop: "1rem" }}>
          Aucune note pour le moment.
        </p>
      ) : (
        <ul className="admin-notes" style={{ marginTop: "1rem" }}>
          {(lead.notes || []).map((n) => (
            <li key={n.id}>
              <p className="admin-muted">{formatDateTime(n.createdAt)}</p>
              <p style={{ margin: 0 }}>{n.body}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function AdminSendEmailModal({
  lead,
  mailSubject,
  mailBody,
  mailError,
  sendingMail,
  onSubjectChange,
  onBodyChange,
  onClose,
  onSubmit,
}) {
  return (
    <div
      className="admin-modal-backdrop"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="admin-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-mail-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="admin-modal-header">
          <h2 id="lead-mail-title">Envoyer un email</h2>
          <button
            type="button"
            className="admin-btn admin-btn-secondary admin-btn-sm"
            onClick={onClose}
            disabled={sendingMail}
          >
            Fermer
          </button>
        </div>
        <p className="admin-muted">
          Destinataire : <strong>{lead.email}</strong>
        </p>
        {mailError ? (
          <p className="admin-error" role="alert">
            {mailError}
          </p>
        ) : null}
        <form className="admin-form" onSubmit={onSubmit}>
          <label htmlFor="lead-mail-subject">
            Sujet
            <input
              id="lead-mail-subject"
              value={mailSubject}
              onChange={(e) => onSubjectChange(e.target.value)}
              required
              maxLength={200}
              autoFocus
              placeholder="Suite a votre demande..."
            />
          </label>
          <label htmlFor="lead-mail-body">
            Message
            <textarea
              id="lead-mail-body"
              rows={7}
              value={mailBody}
              onChange={(e) => onBodyChange(e.target.value)}
              required
              maxLength={10000}
            />
          </label>
          <div className="admin-contact-actions">
            <button
              className="admin-btn admin-btn-primary"
              type="submit"
              disabled={sendingMail || !lead.email}
            >
              {sendingMail ? "Envoi..." : "Envoyer"}
            </button>
            <button
              type="button"
              className="admin-btn admin-btn-secondary"
              onClick={onClose}
              disabled={sendingMail}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
