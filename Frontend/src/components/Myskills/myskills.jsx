import "./_myskills.scss";

import html from "../../images/html.webp"
import css from "../../images/css.webp"
import sass from "../../images/sass.webp"
import js from "../../images/js.webp"
import react from "../../images/react.webp"




function MySkills() {
  return (
    <>
      <section className="skills">
        <h2 className="skills-title">MES COMPETENCES</h2>
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
