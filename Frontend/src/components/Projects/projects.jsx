import Carousel from "../Carousel/caroussel";
import "./_projects.scss";

import { useTranslation } from "react-i18next";

function MyProjects() {
  const { t } = useTranslation();
  return (
    <>
      <section className="layout-projects">
        <h2 className="projects-title"> {t("my-projects-title")} </h2>

        <div className="box-projects">
          <Carousel />
        </div>
      </section>
    </>
  );
}

export default MyProjects;
