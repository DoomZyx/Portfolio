import { useAdminLeads } from "../../../hooks/Admin/useAdminLeads";
import AdminLeadsList from "./AdminLeadsList";
import AdminLeadsToolbar from "./AdminLeadsToolbar";

function AdminLeads() {
  const {
    error,
    success,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    updatingId,
    filteredLeads,
    counts,
    handleQuickStatus,
  } = useAdminLeads();

  return (
    <>
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

      <AdminLeadsToolbar
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        counts={counts}
      />

      <p className="admin-results-meta">
        {filteredLeads.length} lead{filteredLeads.length > 1 ? "s" : ""} affiche
        {filteredLeads.length > 1 ? "s" : ""}
      </p>

      {filteredLeads.length === 0 && !error ? (
        <div className="admin-empty">
          Aucun lead ne correspond a votre recherche.
        </div>
      ) : (
        <AdminLeadsList
          leads={filteredLeads}
          updatingId={updatingId}
          onQuickStatus={handleQuickStatus}
        />
      )}
    </>
  );
}

export default AdminLeads;
