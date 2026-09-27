import { Link } from "react-router-dom";
import {
  documentStatusBadgeClass,
  documentStatusLabel,
  documentTypeLabel,
  formatDate,
  formatEuro,
} from "../../../utils/adminDocuments";

/* eslint-disable react/prop-types */
function AdminDocumentsList({ documents, emptyLabel, busy, onPdf }) {
  return (
    <>
      <div className="admin-table-wrap admin-table-wrap--desktop">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Numero</th>
              <th>Client</th>
              <th>Statut</th>
              <th>Total TTC</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.length === 0 ? (
              <tr>
                <td colSpan={6} className="admin-muted">
                  {emptyLabel}
                </td>
              </tr>
            ) : (
              documents.map((doc) => (
                <tr key={doc.id}>
                  <td>
                    <Link to={`/admin/documents/${doc.id}`}>{doc.number}</Link>
                  </td>
                  <td>
                    <div>{doc.clientName}</div>
                    <div className="admin-muted">{doc.clientEmail}</div>
                  </td>
                  <td>
                    <span className={documentStatusBadgeClass(doc.status)}>
                      {documentStatusLabel(doc.status)}
                    </span>
                  </td>
                  <td>{formatEuro(doc.totalTtc)}</td>
                  <td>{formatDate(doc.createdAt)}</td>
                  <td>
                    <div className="admin-contact-actions">
                      <Link
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                        to={`/admin/documents/${doc.id}`}
                      >
                        Ouvrir
                      </Link>
                      <button
                        type="button"
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                        disabled={busy}
                        onClick={() => onPdf(doc)}
                      >
                        PDF
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="admin-lead-cards">
        {documents.length === 0 ? (
          <p className="admin-muted">{emptyLabel}</p>
        ) : (
          documents.map((doc) => (
            <article key={doc.id} className="admin-lead-card">
              <div className="admin-lead-card-top">
                <div>
                  <Link to={`/admin/documents/${doc.id}`}>{doc.number}</Link>
                  <div className="admin-lead-card-meta">
                    {documentTypeLabel(doc.type)} · {formatDate(doc.createdAt)}
                  </div>
                </div>
                <span className={documentStatusBadgeClass(doc.status)}>
                  {documentStatusLabel(doc.status)}
                </span>
              </div>
              <div>
                <strong>{doc.clientName}</strong>
                <div className="admin-muted">{doc.clientEmail}</div>
              </div>
              <div>{formatEuro(doc.totalTtc)}</div>
              <div className="admin-contact-actions">
                <Link
                  className="admin-btn admin-btn-secondary admin-btn-sm"
                  to={`/admin/documents/${doc.id}`}
                >
                  Ouvrir
                </Link>
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary admin-btn-sm"
                  disabled={busy}
                  onClick={() => onPdf(doc)}
                >
                  PDF
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </>
  );
}

export default AdminDocumentsList;
