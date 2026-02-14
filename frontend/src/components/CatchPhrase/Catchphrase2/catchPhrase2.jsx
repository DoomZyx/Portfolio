import "./_catchphrase2.scss";
import { Suspense, lazy } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const IphoneViewer = lazy(() => import("../../../animation/models/iphone"));

function Catchphrase2() {
  return (
    <div className="layout-catchphrase2">
      <div className="catchphrase2-iphone">
        <Suspense
          fallback={
            <div className="catchphrase2-iphone-loader">
              <FontAwesomeIcon icon={faSpinner} spin />
            </div>
          }
        >
          <IphoneViewer />
        </Suspense>
      </div>
      <div className="catchphrase2-text">
        <h4>
          J'architecte, j'audite, je conseille. Chaque décision technique est
          réfléchie, alignée avec vos objectifs business.
        </h4>
        <h4>
          Je conçois l'architecture de vos produits digitaux en pensant scalabilité,
          performance et maintenabilité. Chaque choix technologique répond à un besoin
          stratégique et s'inscrit dans une vision long terme.
        </h4>
      </div>
    </div>
  );
}

export default Catchphrase2;
