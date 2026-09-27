import { Link } from "react-router-dom";
import "./_diagnostic.scss";

const HUB_OPTIONS = [
  {
    to: "/diagnostic/ecommerce",
    title: "E-commerce",
    description:
      "Boutique à lancer, optimiser ou remplacer : orientation SaaS, stratégie ou architecture.",
  },
  {
    to: "/diagnostic/mvp",
    title: "Produit / MVP",
    description:
      "Conception d'un MVP avec projet mature, business model et plan établis — ou cadrage si besoin.",
  },
  {
    to: "/diagnostic/visibility",
    title: "Visibilité",
    description:
      "Site, landing ou refonte légère pour gagner en présence, crédibilité ou contacts.",
  },
];

function DiagnosticHub() {
  return (
    <div className="diagnostic-page">
      <div className="diagnostic-shell diagnostic-shell--hub">
        <div className="diagnostic-topbar">
          <Link className="diagnostic-back-home" to="/">
            Retour au portfolio
          </Link>
          <p className="diagnostic-kicker">Diagnostic projet</p>
        </div>

        <section
          className="diagnostic-card"
          aria-labelledby="diagnostic-hub-heading"
        >
          <h1 id="diagnostic-hub-heading" className="diagnostic-title">
            Quel est votre besoin ?
          </h1>
          <p className="diagnostic-lead">
            Choisissez le parcours adapté. Quelques questions pour clarifier
            l&apos;orientation, puis une demande de contact si vous souhaitez
            aller plus loin.
          </p>

          <div className="diagnostic-hub-grid">
            {HUB_OPTIONS.map((option) => (
              <Link
                key={option.to}
                className="diagnostic-hub-card"
                to={option.to}
              >
                <h2 className="diagnostic-hub-card-title">{option.title}</h2>
                <p className="diagnostic-hub-card-desc">{option.description}</p>
                <span className="diagnostic-hub-card-cta">Lancer</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default DiagnosticHub;
