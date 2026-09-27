import { Link } from "react-router-dom";
import { getTechnicalLabel } from "../../../domain/recommendationLabels";
import {
  LEAD_STATUSES,
  formatDate,
  getBudgetLabel,
  statusBadgeClass,
  statusLabel,
} from "../../../utils/adminLeads";

/* eslint-disable react/prop-types */
function LeadActions({ leadId }) {
  return (
    <div className="admin-row-actions">
      <Link
        className="admin-btn admin-btn-secondary admin-btn-sm"
        to={`/admin/leads/${leadId}`}
      >
        Editer
      </Link>
      <Link
        className="admin-btn admin-btn-primary admin-btn-sm"
        to={`/admin/documents/new?type=QUOTE&leadId=${leadId}`}
      >
        Devis
      </Link>
      <Link
        className="admin-btn admin-btn-secondary admin-btn-sm"
        to={`/admin/documents/new?type=INVOICE&leadId=${leadId}`}
      >
        Facture
      </Link>
    </div>
  );
}

function StatusSelect({ lead, updatingId, onQuickStatus, idPrefix }) {
  return (
    <select
      id={`${idPrefix}-${lead.id}`}
      className={
        idPrefix === "status" ? "admin-inline-select" : "admin-filter-select"
      }
      style={
        idPrefix === "mobile-status"
          ? { width: "100%", marginTop: "0.35rem" }
          : undefined
      }
      value={lead.status}
      disabled={updatingId === lead.id}
      onChange={(e) => onQuickStatus(lead.id, e.target.value)}
    >
      {LEAD_STATUSES.map((status) => (
        <option key={status} value={status}>
          {statusLabel(status)}
        </option>
      ))}
    </select>
  );
}

function AdminLeadsList({ leads, updatingId, onQuickStatus }) {
  return (
    <>
      <div className="admin-table-wrap admin-table-wrap--desktop admin-card admin-table-wrap--leads">
        <table className="admin-table admin-table--leads">
          <thead>
            <tr>
              <th>Date</th>
              <th>Prospect</th>
              <th>Entreprise</th>
              <th>Budget</th>
              <th>Orientation</th>
              <th>Statut</th>
              <th className="admin-table-actions-col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td>{formatDate(lead.createdAt)}</td>
                <td className="admin-td-wrap">
                  <Link to={`/admin/leads/${lead.id}`}>{lead.name}</Link>
                  <div className="admin-lead-card-meta">{lead.email}</div>
                </td>
                <td className="admin-td-wrap">{lead.company || "-"}</td>
                <td className="admin-td-wrap">
                  {getBudgetLabel(lead.diagnostic, lead.projectType)}
                </td>
                <td className="admin-td-wrap">
                  {lead.recommendation?.technical
                    ? getTechnicalLabel(
                        lead.recommendation.technical,
                        lead.projectType,
                      )
                    : "-"}
                </td>
                <td>
                  <label
                    className="visually-hidden"
                    htmlFor={`status-${lead.id}`}
                  >
                    Changer le statut
                  </label>
                  <StatusSelect
                    lead={lead}
                    updatingId={updatingId}
                    onQuickStatus={onQuickStatus}
                    idPrefix="status"
                  />
                </td>
                <td className="admin-table-actions-col">
                  <LeadActions leadId={lead.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="admin-lead-cards">
        {leads.map((lead) => (
          <article className="admin-lead-card" key={lead.id}>
            <div className="admin-lead-card-top">
              <div>
                <Link to={`/admin/leads/${lead.id}`}>{lead.name}</Link>
                <p className="admin-lead-card-meta">
                  {lead.company || "Sans entreprise"} ·{" "}
                  {formatDate(lead.createdAt)}
                </p>
              </div>
              <span className={statusBadgeClass(lead.status)}>
                {statusLabel(lead.status)}
              </span>
            </div>
            <p className="admin-lead-card-meta">
              {lead.email}
              <br />
              {getBudgetLabel(lead.diagnostic, lead.projectType)} ·{" "}
              {lead.recommendation?.technical
                ? getTechnicalLabel(
                    lead.recommendation.technical,
                    lead.projectType,
                  )
                : "-"}
            </p>
            <label htmlFor={`mobile-status-${lead.id}`}>
              Changer le statut
              <StatusSelect
                lead={lead}
                updatingId={updatingId}
                onQuickStatus={onQuickStatus}
                idPrefix="mobile-status"
              />
            </label>
            <LeadActions leadId={lead.id} />
          </article>
        ))}
      </div>
    </>
  );
}

export default AdminLeadsList;
