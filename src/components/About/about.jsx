import "./_about.scss";


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
            <img src="" alt="Axel Cella" />
          </div>
          <div className="text-aboutme">
            <p> {t("about-me-text")} </p> <br></br>
            <p> {t("about-me-text2")} </p> <br></br>
            <p> {t("about-me-text3")} </p> <br></br>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutMe;
