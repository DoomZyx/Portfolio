import france from "../../images/french.webp"
import "./_nav.scss"
import { useTranslation } from "react-i18next";
import "../../../i18n";

function Nav() {
  const { t, i18n } = useTranslation();
 return (
   <nav>
     <a href="#about" className="nav-about">
       {t("nav-about")}
     </a>
     <a href="#project" className="nav-projects">
       {t("nav-projects")}
     </a>
     <a href="#contact" className="nav-contact">
       {" "}
       {t("nav-contact")}{" "}
     </a>
     <button onClick={() => i18n.changeLanguage("fr")}>
       <img src={france} alt="Drapeau France" />
     </button>
     <button onClick={() => i18n.changeLanguage("en")}>🇬🇧</button>
   </nav>
 );
}

export default Nav;