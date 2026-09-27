import { Link } from "react-router-dom";
import { useAdminLogin } from "../../../hooks/Admin/useAdminLogin";
import "../_admin.scss";

function AdminLogin() {
  const {
    email,
    password,
    error,
    submitting,
    setEmail,
    setPassword,
    handleSubmit,
  } = useAdminLogin();

  return (
    <div className="admin-page admin-login">
      <section className="admin-login-brand" aria-hidden="true">
        <h2>Pilotage commercial de vos opportunités</h2>
        <p>
          Suivez les diagnostics e-commerce, qualifiez vos leads et faites
          avancer le pipeline jusqu&apos;à la signature.
        </p>
      </section>

      <section className="admin-login-panel">
        <div className="admin-login-card" aria-labelledby="admin-login-title">
          <p className="admin-login-kicker">Espace privé</p>
          <h1 id="admin-login-title" className="admin-login-title">
            Connexion back-office
          </h1>
          <p className="admin-login-lead">
            Accédez au dashboard, aux leads et aux notes internes.
          </p>

          <form className="admin-login-form" onSubmit={handleSubmit}>
            <label htmlFor="admin-email">
              Email
              <input
                id="admin-email"
                name="email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label htmlFor="admin-password">
              Mot de passe
              <input
                id="admin-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            {error ? (
              <p className="admin-error" role="alert">
                {error}
              </p>
            ) : null}

            <div className="admin-login-actions">
              <button className="admin-btn" type="submit" disabled={submitting}>
                {submitting ? "Connexion..." : "Se connecter"}
              </button>
              <Link className="admin-login-back" to="/">
                Retour au portfolio
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default AdminLogin;
