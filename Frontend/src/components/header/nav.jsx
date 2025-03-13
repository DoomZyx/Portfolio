import france from "../../images/french.webp"
import uk from "../../images/uk.webp";
import "./_nav.scss";
import { useTranslation } from "react-i18next";
import "../../../i18n";

function Nav() {
  const { t, i18n } = useTranslation();
  return (
    <nav>
      <div className="layout-nav">
        <a href="#home" className="nav-home">
          {t("nav-home")}
        </a>
        <a href="#about" className="nav-about">
          {t("nav-about")}
        </a>
        <a href="#skills" className="nav-skills">
          {t("nav-skills")}
        </a>
        <a href="#project" className="nav-projects">
          {t("nav-projects")}
        </a>
        <a href="#contact" className="nav-contact">
          {" "}
          {t("nav-contact")}{" "}
        </a>
      </div>
      <div className="langage-button">
        <button onClick={() => i18n.changeLanguage("fr")}>
          <img src={france} alt="Drapeau France" />
        </button>
        <button
          className="english-button"
          onClick={() => i18n.changeLanguage("en")}
        >
          <img src={uk} alt="Drapeau Royame-Uni" />
        </button>
      </div>
    </nav>
  );
}

export default Nav;