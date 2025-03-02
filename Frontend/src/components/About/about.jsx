import "./_about.scss";
import myself from "../../images/react.webp";

function AboutMe() {
  return (
    <>
      <section>
        <h2 className="aboutme-title">A PROPOS DE MOI </h2>
        <div className="layout-about">
          <div className="pictureAboutMe">
            <img src={myself} alt="Axel Cella" />
          </div>
          <div className="text-aboutme">
            <p>
              Hello ! Je m’appelle Axel Cella, développeur web junior.
              Auparavant j’étais conseiller de pièces détachées automobile ce
              qui m’a permis d’acquérir de très bonne compétences comme
              l’organisation, l’écoute et des grandes qualités relationnel.
              <br></br>
              <br></br> Après une grande refléxion, j’ai envisagé de faire une
              reconversion professionnel dans le développement web, et ça
              m’intéressait depuis des années<br></br>
              J’ai donc commencé une formation en tant qu’intégrateur web chez
              OpenClassrooms. <br></br>
              <br></br>
              Suite à l'obtention de mon diplôme, je souhaite me former sur les
              technologies back-end Et je continue à travailler et me former
              chaque jour sur mon PC avec motivation, avec envies et des idées
              plein la tête
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutMe;
