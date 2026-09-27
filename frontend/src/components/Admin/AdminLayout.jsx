import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAdminSession } from "../../hooks/Admin/useAdminSession";
import "./_admin.scss";

/* eslint-disable react/prop-types -- pas de PropTypes dans ce projet */
function AdminLayout({ title, subtitle, children }) {
  const { user, loading, logout } = useAdminSession();
  const [menuOpen, setMenuOpen] = useState(false);

  if (loading) {
    return (
      <div className="admin-page admin-loading" role="status">
        Chargement du back-office...
      </div>
    );
  }

  if (!user) return null;

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <div className="admin-page admin-page--app">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-top">
          <Link className="admin-brand" to="/admin" onClick={closeMenu}>
            <strong>Axel Cella</strong>
            <span>Back-office leads</span>
          </Link>
          <button
            type="button"
            className="admin-menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="admin-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "Fermer" : "Menu"}
          </button>
        </div>

        <nav
          id="admin-nav"
          className={`admin-nav${menuOpen ? " is-open" : ""}`}
          aria-label="Navigation admin"
        >
          <NavLink
            to="/admin"
            end
            className={({ isActive }) => (isActive ? "is-active" : undefined)}
            onClick={closeMenu}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/leads"
            className={({ isActive }) => (isActive ? "is-active" : undefined)}
            onClick={closeMenu}
          >
            Leads
          </NavLink>
          <NavLink
            to="/admin/devis"
            className={({ isActive }) => (isActive ? "is-active" : undefined)}
            onClick={closeMenu}
          >
            Devis
          </NavLink>
          <NavLink
            to="/admin/factures"
            className={({ isActive }) => (isActive ? "is-active" : undefined)}
            onClick={closeMenu}
          >
            Factures
          </NavLink>
          <NavLink to="/" onClick={closeMenu}>
            Voir le site
          </NavLink>
        </nav>

        <div className="admin-sidebar-footer">
          <span className="admin-muted">{user.email}</span>
          <button
            type="button"
            className="admin-btn admin-btn-secondary admin-btn-sm"
            onClick={logout}
          >
            Déconnexion
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-main-header">
          <div>
            <h1>{title}</h1>
            {subtitle ? <p>{subtitle}</p> : null}
          </div>
          <div className="admin-user-chip">
            <span>{user.email}</span>
            <button
              type="button"
              className="admin-btn admin-btn-secondary admin-btn-sm"
              onClick={logout}
            >
              Déconnexion
            </button>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
