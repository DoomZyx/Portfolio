import { Suspense, lazy } from "react";
const ShapeshifterViewer = lazy(() => import("../../animation/models/shapeshifter"))
import "./_services.scss";
import { SERVICES } from "../../data/services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

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
          {SERVICES.map(({ id, name}) => (
              <article key={id} className="service-card">
                <h4>{name}</h4>
              </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MyServices;
