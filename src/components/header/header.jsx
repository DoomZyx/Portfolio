import Nav from "../Nav/nav";
import "./_header.scss";
import "../animation/_1stsec.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowDown } from "@fortawesome/free-solid-svg-icons";
import github from "../../images/github.webp";

import france from "../../images/french.webp";
import uk from "../../images/uk.webp";

import { useTranslation } from "react-i18next";
import "../../../i18n";
import Observer from "../animation/Observer";

function Header() {
  const { t, i18n } = useTranslation();
  const [ref, isVisible] = Observer();

  return (
    <>
      <div className="langage-button" id="home">
        <button
          className="france-but"
          onClick={() => i18n.changeLanguage("fr")}
        >
          <img src={france} alt="Drapeau France" />
        </button>
        <button
          className="english-button"
          onClick={() => i18n.changeLanguage("en")}
        >
          <img src={uk} alt="Drapeau Royame-Uni" />
        </button>
      </div>
      <header>
        <div ref={ref} className={`presentation ${isVisible ? "active" : ""}`}>
          <h1 className="welcome"> {t("welcome")} </h1>
          <h2 className="myName"> {t("Iam")} </h2>
          <h3 className="iam"> {t("myprof")} </h3>
        </div>
        <div className="layout-button">
          <button
            className="github-butt"
            onClick={() => window.open("https://github.com/DoomZyx", "_blank")}
          >
            <img className="github-logo" src={github} alt="link Github" />
            <p>GITHUB</p>
          </button>
          <button
            className="contact-butt"
            onClick={() => (window.location.href = "#contact")}
          >
            <h3> {t("contact-but")} </h3>
          </button>
          <a href="Free Resume Maker1.pdf" download>
            <button className="download-butt">
              <FontAwesomeIcon
                icon={faCircleArrowDown}
                className="download-icon"
              />
              <h3> {t("my-cv")} </h3>
            </button>
          </a>
        </div>
      </header>
    </>
  );
}

export default Header;
