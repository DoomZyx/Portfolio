import { Link } from "react-router-dom";
import { useAdminDashboard } from "../../../hooks/Admin/useAdminDashboard";
import {
  formatEuro,
  formatPercent,
  statusBadgeClass,
  statusLabel,
} from "../../../utils/adminLeads";

function AdminDashboard() {
  const { stats, recentLeads, error, conversionRate, funnel, maxSource } =
    useAdminDashboard();

  if (error) {
    return (
      <p className="admin-error" role="alert">
        {error}
      </p>
    );
  }

  if (!stats) {
    return <p className="admin-muted">Chargement des indicateurs...</p>;
  }

  return (
    <>
      <div className="admin-grid">
        <div className="admin-stat">
          <span>Leads totaux</span>
          <strong>{stats.totalLeads}</strong>
        </div>
        <div className="admin-stat admin-stat--accent">
          <span>Nouveaux</span>
          <strong>{stats.newLeads}</strong>
          <p className="admin-stat-hint">À traiter en priorité</p>
        </div>
        <div className="admin-stat">
          <span>RDV</span>
          <strong>{stats.meetings}</strong>
        </div>
        <div className="admin-stat">
          <span>Devis envoyés</span>
          <strong>{stats.quotesSent}</strong>
        </div>
        <div className="admin-stat">
          <span>Clients gagnés</span>
          <strong>{stats.won}</strong>
        </div>
        <div className="admin-stat">
          <span>Taux de conversion</span>
          <strong>{formatPercent(conversionRate)}</strong>
          <p className="admin-stat-hint">Gagnés / leads totaux</p>
        </div>
        <div className="admin-stat admin-stat--wide admin-stat--accent">
          <span>Pipeline estimé</span>
          <strong>{formatEuro(stats.pipelineValue)}</strong>
          <p className="admin-stat-hint">
            Somme des valeurs estimées (hors gagnés / perdus)
          </p>
        </div>
        <div className="admin-stat admin-stat--wide">
          <span>CA gagné</span>
          <strong>{formatEuro(stats.wonRevenue)}</strong>
          <p className="admin-stat-hint">Somme des valeurs finales gagnées</p>
        </div>
      </div>

      <div className="admin-card" style={{ marginTop: "1rem" }}>
        <h2 className="admin-card-title">Actions rapides</h2>
        <div className="admin-quick-actions">
          <Link className="admin-btn" to="/admin/leads">
            Voir tous les leads
          </Link>
          <Link
            className="admin-btn admin-btn-secondary"
            to="/diagnostic"
          >
            Ouvrir le diagnostic
          </Link>
          <Link className="admin-btn admin-btn-secondary" to="/">
            Retour au site
          </Link>
        </div>
      </div>

      <div className="admin-dashboard-layout" style={{ marginTop: "1rem" }}>
        <section className="admin-card">
          <h2 className="admin-card-title">Funnel commercial</h2>
          <div className="admin-funnel">
            {funnel.map((step) => (
              <div className="admin-funnel-row" key={step.label}>
                <span className="admin-funnel-label">{step.label}</span>
                <div className="admin-funnel-track" aria-hidden="true">
                  <div
                    className="admin-funnel-bar"
                    style={{ width: `${Math.max(step.ratio * 100, 2)}%` }}
                  />
                </div>
                <span className="admin-funnel-value">{step.value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="admin-card">
          <h2 className="admin-card-title">Leads par source</h2>
          {stats.leadsBySource.length === 0 ? (
            <p className="admin-muted">Aucune source pour le moment.</p>
          ) : (
            <ul className="admin-source-list">
              {stats.leadsBySource.map((row) => (
                <li key={row.source}>
                  <div className="admin-source-meta">
                    <span>{row.source}</span>
                    <strong>{row.count}</strong>
                  </div>
                  <div className="admin-source-track" aria-hidden="true">
                    <div
                      className="admin-source-bar"
                      style={{
                        width: `${(row.count / maxSource) * 100}%`,
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section className="admin-card" style={{ marginTop: "1rem" }}>
        <h2 className="admin-card-title">Derniers leads</h2>
        {recentLeads.length === 0 ? (
          <p className="admin-muted">
            Aucun lead enregistré pour l&apos;instant.
          </p>
        ) : (
          <ul className="admin-recent-list">
            {recentLeads.map((lead) => (
              <li key={lead.id}>
                <Link
                  className="admin-recent-item"
                  to={`/admin/leads/${lead.id}`}
                >
                  <div>
                    <strong>{lead.name}</strong>
                    <span>
                      {lead.company || "Sans entreprise"} ·{" "}
                      {new Date(lead.createdAt).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                  <span className={statusBadgeClass(lead.status)}>
                    {statusLabel(lead.status)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

export default AdminDashboard;
