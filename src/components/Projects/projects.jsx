import Carousel from "../Carousel/caroussel";
import "./_projects.scss";

import { useTranslation } from "react-i18next";
import Observer from "../animation/Observer"

function MyProjects() {
  const { t } = useTranslation();
  const [ref, isVisible] = Observer();
  return (
    <>
      <section className="layout-projects">
        <h2 ref={ref} className={`projects-title ${isVisible ? "active" : ""}`}>
          {" "}
          {t("my-projects-title")}{" "}
        </h2>
        <div className="box-projects" id="project">
          <Carousel />
        </div>
      </section>
    </>
  );
}

export default MyProjects;
