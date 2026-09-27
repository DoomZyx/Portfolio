import { Link, useSearchParams } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import { useAdminDocumentForm } from "../../../hooks/Admin/useAdminDocumentForm";
import {
  documentTypeLabel,
  documentsListPath,
  formatEuro,
} from "../../../utils/adminDocuments";

function AdminDocumentForm() {
  const [searchParams] = useSearchParams();
  const initialType =
    searchParams.get("type") === "INVOICE" ? "INVOICE" : "QUOTE";
  const leadIdParam = searchParams.get("leadId");

  const {
    type,
    setType,
    clientName,
    setClientName,
    clientEmail,
    setClientEmail,
    clientCompany,
    setClientCompany,
    clientAddress,
    setClientAddress,
    taxRate,
    setTaxRate,
    validUntil,
    setValidUntil,
    dueDate,
    setDueDate,
    notes,
    setNotes,
    leadId,
    setLeadId,
    lines,
    totals,
    error,
    saving,
    updateLine,
    addLine,
    removeLine,
    handleSubmit,
  } = useAdminDocumentForm({ initialType, leadIdParam });

  return (
    <AdminLayout
      title={`Nouveau ${documentTypeLabel(type).toLowerCase()}`}
      subtitle="Renseignez le client et les lignes de prestation."
    >
      <nav className="admin-breadcrumb" aria-label="Fil d'Ariane">
        <Link to="/admin">Dashboard</Link>
        <span>/</span>
        <Link to={documentsListPath(type)}>{documentTypeLabel(type)}</Link>
        <span>/</span>
        <span aria-current="page">Nouveau</span>
      </nav>

      {error ? (
        <p className="admin-error" role="alert">
          {error}
        </p>
      ) : null}

      <form className="admin-card" onSubmit={handleSubmit}>
        <div className="admin-form-grid">
          <label>
            Type
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="QUOTE">Devis</option>
              <option value="INVOICE">Facture</option>
            </select>
          </label>
          <label>
            Lead lie (optionnel)
            <input
              type="number"
              min="1"
              value={leadId}
              onChange={(e) => setLeadId(e.target.value)}
              placeholder="ID lead"
            />
          </label>
          <label>
            Nom client
            <input
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
            />
          </label>
          <label>
            Email client
            <input
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Entreprise
            <input
              value={clientCompany}
              onChange={(e) => setClientCompany(e.target.value)}
            />
          </label>
          <label>
            Adresse
            <input
              value={clientAddress}
              onChange={(e) => setClientAddress(e.target.value)}
            />
          </label>
          <label>
            TVA (%)
            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              required
            />
          </label>
          {type === "QUOTE" ? (
            <label>
              Valable jusqu&apos;au
              <input
                type="date"
                value={validUntil}
                onChange={(e) => setValidUntil(e.target.value)}
              />
            </label>
          ) : (
            <label>
              Echeance
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </label>
          )}
        </div>

        <h2 className="admin-card-title" style={{ marginTop: "1.5rem" }}>
          Lignes
        </h2>
        <div className="admin-doc-lines">
          {lines.map((line, index) => (
            <div key={line.id} className="admin-doc-line">
              <label>
                Libelle
                <input
                  value={line.label}
                  onChange={(e) => updateLine(index, { label: e.target.value })}
                  required
                />
              </label>
              <label>
                Qte
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={line.quantity}
                  onChange={(e) =>
                    updateLine(index, { quantity: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                PU HT
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={line.unitPriceHt}
                  onChange={(e) =>
                    updateLine(index, { unitPriceHt: e.target.value })
                  }
                  required
                />
              </label>
              <button
                type="button"
                className="admin-btn admin-btn-secondary admin-btn-sm"
                onClick={() => removeLine(index)}
                disabled={lines.length <= 1}
              >
                Retirer
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="admin-btn admin-btn-secondary admin-btn-sm"
          onClick={addLine}
        >
          Ajouter une ligne
        </button>

        <div className="admin-doc-form-section">
          <label className="admin-doc-field admin-doc-field--full">
            Notes
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Conditions, precisions, echeances..."
            />
          </label>
        </div>

        <div className="admin-doc-form-footer">
          <div className="admin-doc-totals">
            <div>Sous-total HT: {formatEuro(totals.subtotalHt)}</div>
            <div>TVA: {formatEuro(totals.taxAmount)}</div>
            <strong>Total TTC: {formatEuro(totals.totalTtc)}</strong>
          </div>

          <div className="admin-contact-actions">
            <button
              type="submit"
              className="admin-btn admin-btn-primary"
              disabled={saving}
            >
              {saving ? "Creation..." : "Creer le document"}
            </button>
            <Link
              className="admin-btn admin-btn-secondary"
              to={documentsListPath(type)}
            >
              Annuler
            </Link>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}

export default AdminDocumentForm;
