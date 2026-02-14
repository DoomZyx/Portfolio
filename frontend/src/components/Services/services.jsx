import { Suspense, lazy } from "react";
const ShapeshifterViewer = lazy(() => import("../../animation/models/shapeshifter"))
import "./_services.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const SERVICES = [
  "Architecture Technique",
  "Architecture Produit",
  "Conseil & Stratégie",
  "Audit & Refactoring",
];

function MyServices() {
  return (
    <section className="services-section" id="services">
      <h2 className="title-services">Mes services</h2>
      <div className="services-container">
        <div className="services-visual">
          <Suspense
            fallback={
              <div className="services-3d-loader">
                <FontAwesomeIcon icon={faSpinner} spin />
              </div>
            }
          >
            <ShapeshifterViewer />
          </Suspense>
        </div>
        <div className="services-grid">
          {SERVICES.map((label) => (
            <article key={label} className="service-card">
              <h4>{label}</h4>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MyServices;
