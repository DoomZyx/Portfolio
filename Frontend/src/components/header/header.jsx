import Nav from "./nav";
import "./_header.scss";
import "../animation/_1stsec.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowDown } from "@fortawesome/free-solid-svg-icons";
import github from "../../images/github.webp";

import { useTranslation } from "react-i18next";
import Observer from '../animation/Observer';


function Header() {
  const { t } = useTranslation();
  const [ref, isVisible] = Observer();

  return (
    <>
      <header id="home">
        <Nav />
        <div ref={ref} className={`presentation ${isVisible ? "active" : ""}`}>
          <h3 className="welcome"> {t("welcome")} </h3>
          <h3 className="myName"> {t("Iam")} </h3>
          <h4 className="iam"> {t("myprof")} </h4>
        </div>
        <div className="layout-button">
          <button
            className="github-butt"
            onClick={() => window.open("https://github.com/DoomZyx", "_blank")}
          >
            <img className="github-logo" src={github} alt="github" />
            <p>GITHUB</p>
          </button>
          <button
            className="contact-butt"
            onClick={() => (window.location.href = "#contact")}
          >
            <h3> {t("contact-but")} </h3>
          </button>
          <button className="download-butt" href="">
            <FontAwesomeIcon
              icon={faCircleArrowDown}
              className="download-icon"
            />
            <h3> {t("my-cv")} </h3>
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;
