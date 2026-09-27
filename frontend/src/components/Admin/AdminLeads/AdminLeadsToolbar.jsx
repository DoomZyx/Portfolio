import { LEAD_STATUSES, statusLabel } from "../../../utils/adminLeads";

/* eslint-disable react/prop-types */
function AdminLeadsToolbar({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  counts,
}) {
  return (
    <div className="admin-card">
      <div className="admin-toolbar">
        <div className="admin-toolbar-row" style={{ flex: 1 }}>
          <label className="visually-hidden" htmlFor="lead-search">
            Rechercher un lead
          </label>
          <input
            id="lead-search"
            className="admin-search"
            type="search"
            placeholder="Rechercher (nom, email, entreprise, source...)"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <label className="visually-hidden" htmlFor="lead-status-filter">
            Filtrer par statut
          </label>
          <select
            id="lead-status-filter"
            className="admin-filter-select"
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
          >
            <option value="ALL">Tous les statuts</option>
            {LEAD_STATUSES.map((status) => (
              <option key={status} value={status}>
                {statusLabel(status)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="admin-chip-filters" role="group" aria-label="Filtres statut">
        <button
          type="button"
          className={`admin-chip${statusFilter === "ALL" ? " is-active" : ""}`}
          onClick={() => onStatusFilterChange("ALL")}
        >
          Tous ({counts.ALL})
        </button>
        {LEAD_STATUSES.map((status) => (
          <button
            key={status}
            type="button"
            className={`admin-chip${statusFilter === status ? " is-active" : ""}`}
            onClick={() => onStatusFilterChange(status)}
          >
            {statusLabel(status)} ({counts[status]})
          </button>
        ))}
      </div>
    </div>
  );
}

export default AdminLeadsToolbar;
