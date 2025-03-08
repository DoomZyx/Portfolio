import Nav from "./nav";
import "./_header.scss";
import "../animation/_1stsec.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowDown } from "@fortawesome/free-solid-svg-icons";
import github from "../../images/github.webp";

function header() {
  return (
    <>
      <header>
        <Nav />
        <div className="presentation">
          <h3 className="welcome">BIENVENUE !</h3>
          <h3 className="myName">JE SUIS AXEL</h3>
          <h4 className="iam">Développeur web</h4>
        </div>
        <div className="layout-button">
          <button
            className="github-butt"
            onClick={() =>
              (window.location.href = "https://github.com/DoomZyx")
            }
          >
            <img className="github-logo" src={github} alt="github" />
            <p>GITHUB</p>
          </button>
          <button className="contact-butt" onClick={() =>
            (window.location.href = "#contact")
          }>
            <h3>ME CONTACTER</h3>
          </button>
          <button className="download-butt" href="">
            <FontAwesomeIcon
              icon={faCircleArrowDown}
              className="download-icon"
            />
            <h3>Télécharger mon CV</h3>
          </button>
        </div>
      </header>
    </>
  );
}

export default header;
