import { Suspense, lazy, useState } from "react";
const ShapeshifterViewer = lazy(
  () => import("../../animation/models/shapeshifter"),
);
import "./_services.scss";
import Modal from "../Modal/modal";
import { SERVICES } from "../../data/services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function MyServices() {
  const [selectedStep, setSelectedStep] = useState(null);
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
          {SERVICES.map((step) => (
            <button
              key={step.step}
              className="step-card"
              onClick={() => setSelectedStep(step)}
            >
              <span className="step-number">{step.step}</span>
              <div className="step-content">
                <h4>{step.title}</h4>
                <p>{step.shortDesc}</p>
              </div>
              <span className="step-action">Voir plus</span>
            </button>
          ))}
        </div>

        {/* Modale partagée pour chaque étape */}
        <Modal
          isOpen={Boolean(selectedStep)}
          onClose={() => setSelectedStep(null)}
          title={`Étape ${selectedStep?.step} — ${selectedStep?.title}`}
        >
          {selectedStep && (
            <div className="step-modal-details">
              <section className="modal-block">
                <h5>Mon approche sur cette étape</h5>
                <p>{selectedStep.approach}</p>
              </section>

              <section className="modal-block">
                <h5>Livrables concrets</h5>
                <ul>
                  {selectedStep.deliverables.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="modal-block">
                <h5>Valeur apportée</h5>
                <p>{selectedStep.value}</p>
              </section>

              <div className="modal-actions">
                <a
                  href="#contact"
                  className="btn-modal-contact"
                  onClick={() => setSelectedStep(null)}
                >
                  Démarrer à partir de cette étape
                </a>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
}

export default MyServices;
