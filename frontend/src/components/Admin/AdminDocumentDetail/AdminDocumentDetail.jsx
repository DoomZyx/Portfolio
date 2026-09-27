import { Link } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import { useAdminDocumentDetail } from "../../../hooks/Admin/useAdminDocumentDetail";
import {
  DOCUMENT_STATUSES,
  computeLineTotal,
  documentStatusBadgeClass,
  documentStatusLabel,
  documentTypeLabel,
  documentsListPath,
  formatDate,
  formatEuro,
} from "../../../utils/adminDocuments";

/* eslint-disable react/prop-types */
function AdminDocumentToolbar({ doc, busy, onStatus, onPdf, onConvert }) {
  return (
    <section className="admin-card admin-doc-toolbar">
      <div className="admin-doc-header">
        <div>
          <div className="admin-doc-type-row">
            <span className="admin-doc-type-pill">
              {documentTypeLabel(doc.type)}
            </span>
            <span className={documentStatusBadgeClass(doc.status)}>
              {documentStatusLabel(doc.status)}
            </span>
          </div>
          <p className="admin-muted" style={{ marginTop: "0.5rem" }}>
            Cree le {formatDate(doc.createdAt)}
            {doc.leadId ? (
              <>
                {" · "}
                <Link to={`/admin/leads/${doc.leadId}`}>Lead #{doc.leadId}</Link>
              </>
            ) : null}
            {doc.sourceQuoteId ? (
              <>
                {" · "}
                <Link to={`/admin/documents/${doc.sourceQuoteId}`}>
                  Devis source
                </Link>
              </>
            ) : null}
          </p>
        </div>
        <div className="admin-contact-actions">
          <label className="admin-doc-status-field">
            Statut
            <select
              value={doc.status}
              disabled={busy}
              onChange={(e) => onStatus(e.target.value)}
            >
              {DOCUMENT_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {documentStatusLabel(status)}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            className="admin-btn admin-btn-secondary admin-btn-sm"
            disabled={busy}
            onClick={onPdf}
          >
            Telecharger PDF
          </button>
          {doc.type === "QUOTE" ? (
            <button
              type="button"
              className="admin-btn admin-btn-primary admin-btn-sm"
              disabled={busy}
              onClick={onConvert}
            >
              Convertir en facture
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function AdminDocumentSheet({ doc }) {
  return (
    <article className="admin-doc-sheet" aria-label="Apercu document">
      <header className="admin-doc-sheet-top">
        <div>
          <p className="admin-doc-sheet-kicker">Axel Cella</p>
          <h2 className="admin-doc-sheet-title">{doc.number}</h2>
        </div>
        <div className="admin-doc-sheet-meta">
          <div>
            <span>Date</span>
            <strong>{formatDate(doc.createdAt)}</strong>
          </div>
          <div>
            <span>{doc.type === "QUOTE" ? "Valable jusqu'au" : "Echeance"}</span>
            <strong>
              {formatDate(doc.type === "QUOTE" ? doc.validUntil : doc.dueDate)}
            </strong>
          </div>
          <div>
            <span>Total TTC</span>
            <strong className="admin-doc-sheet-total">
              {formatEuro(doc.totalTtc)}
            </strong>
          </div>
        </div>
      </header>

      <div className="admin-doc-parties">
        <section>
          <h3>Client</h3>
          <p>Madame, Monsieur</p>
          <p>
            <strong>{doc.clientName}</strong>
          </p>
          {doc.clientCompany ? <p>{doc.clientCompany}</p> : null}
          {doc.clientAddress ? <p>{doc.clientAddress}</p> : null}
          <p>{doc.clientEmail}</p>
        </section>
        <section>
          <h3>Synthese</h3>
          <dl className="admin-kv">
            <div>
              <dt>Sous-total HT</dt>
              <dd>{formatEuro(doc.subtotalHt)}</dd>
            </div>
            <div>
              <dt>TVA ({doc.taxRate}%)</dt>
              <dd>{formatEuro(doc.taxAmount)}</dd>
            </div>
            <div>
              <dt>Total TTC</dt>
              <dd>
                <strong>{formatEuro(doc.totalTtc)}</strong>
              </dd>
            </div>
          </dl>
        </section>
      </div>

      <div className="admin-table-wrap admin-doc-sheet-table">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Prestation</th>
              <th>Qte</th>
              <th>PU HT</th>
              <th>Total HT</th>
            </tr>
          </thead>
          <tbody>
            {(doc.lines || []).map((line) => (
              <tr key={line.id}>
                <td>{line.label}</td>
                <td>{line.quantity}</td>
                <td>{formatEuro(line.unitPriceHt)}</td>
                <td>{formatEuro(computeLineTotal(line))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {doc.notes ? <p className="admin-doc-sheet-notes">{doc.notes}</p> : null}
    </article>
  );
}

function AdminDocumentEmailSection({
  doc,
  toEmail,
  markLeadQuoteSent,
  busy,
  onToEmailChange,
  onMarkLeadChange,
  onSend,
}) {
  return (
    <section className="admin-card" style={{ marginTop: "1rem" }}>
      <h2 className="admin-card-title">Envoyer par email</h2>
      <form className="admin-form-grid" onSubmit={onSend}>
        <label>
          Destinataire
          <input
            type="email"
            value={toEmail}
            onChange={(e) => onToEmailChange(e.target.value)}
            required
          />
        </label>
        {doc.type === "QUOTE" && doc.leadId ? (
          <label className="admin-checkbox">
            <input
              type="checkbox"
              checked={markLeadQuoteSent}
              onChange={(e) => onMarkLeadChange(e.target.checked)}
            />
            Passer le lead en &quot;Devis envoye&quot;
          </label>
        ) : null}
        <div className="admin-contact-actions">
          <button
            type="submit"
            className="admin-btn admin-btn-primary"
            disabled={busy}
          >
            {busy ? "Envoi..." : "Envoyer avec PDF"}
          </button>
        </div>
      </form>

      {(doc.emails || []).length > 0 ? (
        <>
          <h3 className="admin-card-title" style={{ marginTop: "1.25rem" }}>
            Historique d&apos;envois
          </h3>
          <ul className="admin-notes-list">
            {(doc.emails || []).map((email) => (
              <li key={email.id}>
                <div>
                  {email.toEmail} · {formatDate(email.sentAt)} ·{" "}
                  {email.ok ? "OK" : `Echec: ${email.error || "?"}`}
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </section>
  );
}

function AdminDocumentDetail({ documentId }) {
  const {
    doc,
    loading,
    error,
    success,
    busy,
    toEmail,
    setToEmail,
    markLeadQuoteSent,
    setMarkLeadQuoteSent,
    handleStatus,
    handlePdf,
    handleSend,
    handleConvert,
  } = useAdminDocumentDetail(documentId);

  return (
    <AdminLayout
      title={doc ? doc.number : "Document"}
      subtitle={
        doc
          ? `${documentTypeLabel(doc.type)} · ${doc.clientName}`
          : "Fiche document"
      }
    >
      <nav className="admin-breadcrumb" aria-label="Fil d'Ariane">
        <Link to="/admin">Dashboard</Link>
        <span>/</span>
        <Link to={documentsListPath(doc?.type || "QUOTE")}>
          {documentTypeLabel(doc?.type || "QUOTE")}
        </Link>
        <span>/</span>
        <span aria-current="page">{doc?.number || "..."}</span>
      </nav>

      {error ? (
        <p className="admin-error" role="alert">
          {error}
        </p>
      ) : null}
      {success ? (
        <p className="admin-success" role="status">
          {success}
        </p>
      ) : null}

      {loading ? (
        <p className="admin-muted">Chargement...</p>
      ) : !doc ? (
        <p className="admin-muted">Document introuvable.</p>
      ) : (
        <>
          <AdminDocumentToolbar
            doc={doc}
            busy={busy}
            onStatus={handleStatus}
            onPdf={handlePdf}
            onConvert={handleConvert}
          />
          <AdminDocumentSheet doc={doc} />
          <AdminDocumentEmailSection
            doc={doc}
            toEmail={toEmail}
            markLeadQuoteSent={markLeadQuoteSent}
            busy={busy}
            onToEmailChange={setToEmail}
            onMarkLeadChange={setMarkLeadQuoteSent}
            onSend={handleSend}
          />
        </>
      )}
    </AdminLayout>
  );
}

export default AdminDocumentDetail;
