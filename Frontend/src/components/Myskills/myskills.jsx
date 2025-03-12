import "./_myskills.scss";
import { useTranslation } from "react-i18next";
import Observer from "../animation/Observer";
import html from "../../images/html.webp"
import css from "../../images/css.webp"
import sass from "../../images/sass.webp"
import js from "../../images/js.webp"
import react from "../../images/react.webp"


function MySkills() {
  const { t } = useTranslation();
  const [ref, isVisible] = Observer()
  return (
    <>
      <section ref={ref} className={`skills ${isVisible ? "active" : ""}`}>
        <h2 className="skills-title" id="skills"> {t("my-skills-title")} </h2>
        <div className="box_skills">
          <img src={html} alt="html logo" />
          <img src={css} alt="css logo" />
          <img src={sass} alt="sass" />
          <img src={js} alt="js logo" />
          <img src={react} alt="react" />
        </div>
      </section>
    </>
  );
}

export default MySkills;
