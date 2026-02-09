import { Suspense, lazy } from "react";
const ShapeshifterViewer = lazy(() => import("../../animation/models/shapeshifter"))
import "./_services.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function MyServices() {
  return (
    <>
      <h2 className="title-services" id="services">
        Mes services
      </h2>
      <div className="services-container">
        <div className="box-services">
          <Suspense
            fallback={
              <div
                className="3d-loader"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <FontAwesomeIcon icon={faSpinner} spin />
              </div>
            }
          >
            <ShapeshifterViewer />
          </Suspense>
          <div className="layout-services">
            <div className="services">
              <h4>Landing Page</h4>
            </div>
            <div className="services">
              <h4>Site E-commerce</h4>
            </div>
            <div className="services">
              <h4>Application Web</h4>
            </div>
            <div className="services">
              <h4>Portfolio</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyServices;
