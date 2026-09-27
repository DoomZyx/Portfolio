import { Link } from "react-router-dom";
import {
  DOCUMENT_STATUSES,
  documentStatusLabel,
} from "../../../utils/adminDocuments";

/* eslint-disable react/prop-types */
function AdminDocumentsToolbar({
  statusFilter,
  onStatusFilterChange,
  busy,
  onExport,
  typeFilter,
  isQuote,
}) {
  return (
    <div className="admin-toolbar">
      <div className="admin-toolbar-row">
        <select
          className="admin-filter-select"
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          aria-label="Filtrer par statut"
        >
          <option value="ALL">Tous les statuts</option>
          {DOCUMENT_STATUSES.map((status) => (
            <option key={status} value={status}>
              {documentStatusLabel(status)}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="admin-btn admin-btn-secondary admin-btn-sm"
          disabled={busy}
          onClick={onExport}
        >
          Export CSV
        </button>
        <Link
          className="admin-btn admin-btn-primary admin-btn-sm"
          to={`/admin/documents/new?type=${typeFilter}`}
        >
          Nouveau {isQuote ? "devis" : "facture"}
        </Link>
      </div>
    </div>
  );
}

export default AdminDocumentsToolbar;
