import { Navigate, useLocation } from "react-router-dom";
import { useAdminDocuments } from "../../../hooks/Admin/useAdminDocuments";
import { typeFromPath } from "../../../utils/adminDocuments";
import AdminDocumentsList from "./AdminDocumentsList";
import AdminDocumentsToolbar from "./AdminDocumentsToolbar";

function AdminDocuments() {
  const { pathname } = useLocation();
  const typeFilter = typeFromPath(pathname);
  const {
    statusFilter,
    setStatusFilter,
    filtered,
    error,
    busy,
    handleExport,
    handlePdf,
  } = useAdminDocuments(typeFilter);

  if (!typeFilter) {
    return <Navigate to="/admin/devis" replace />;
  }

  const isQuote = typeFilter === "QUOTE";
  const emptyLabel = isQuote ? "Aucun devis." : "Aucune facture.";

  return (
    <>
      {error ? (
        <p className="admin-error" role="alert">
          {error}
        </p>
      ) : null}

      <div className="admin-card">
        <AdminDocumentsToolbar
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          busy={busy}
          onExport={handleExport}
          typeFilter={typeFilter}
          isQuote={isQuote}
        />

        <AdminDocumentsList
          documents={filtered}
          emptyLabel={emptyLabel}
          busy={busy}
          onPdf={handlePdf}
        />
      </div>
    </>
  );
}

export function adminDocumentsTitle(typeFilter) {
  return typeFilter === "QUOTE" ? "Devis" : "Factures";
}

export function adminDocumentsSubtitle(typeFilter) {
  return typeFilter === "QUOTE"
    ? "Creer, exporter et envoyer vos devis."
    : "Creer, exporter et envoyer vos factures.";
}

export default AdminDocuments;
