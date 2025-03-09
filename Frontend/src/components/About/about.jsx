import "./_about.scss";
import myself from "../../images/react.webp";

import { useTranslation } from "react-i18next";
import Observer from '../animation/Observer';

function AboutMe() {
  const { t } = useTranslation();
  const [ref, isVisible] = Observer()
  return (
    <>
      <section id="about" ref={ref} className={`about ${isVisible ? 'active' : ""}`}>
        <h2 className="aboutme-title"> {t("about-me-title")} </h2>
        <div className="layout-about">
          <div className="pictureAboutMe">
            <img src={myself} alt="Axel Cella" />
          </div>
          <div className="text-aboutme">
            <p> {t("about-me-text")} </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutMe;
