import "./footer.scss";
import linkedin from "../../../public/linkedin.webp";
import gmail from "../../../public/gmail.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="tel:+33672886255" aria-label="Appeler le 06 72 88 62 55">
              <FontAwesomeIcon className="phone" icon={faPhone} />
            </a>
            <a href="mailto:axelcella.ac@gmail.com">
              <img
                className="gmail"
                src={gmail}
                alt="Logo Gmail"
                loading="lazy"
                width={50}
                height={55}
              />
            </a>
            <a
              href="https://www.linkedin.com/in/axel-cella-8bb55a19b/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="linkedin"
                src={linkedin}
                alt="Logo Linkedin"
                loading="lazy"
                width={55}
                height={55}
              />
            </a>
          </div>
          <span className="copyright">
            © 2025 Axel Cella. Tous droits réservés.
          </span>
        </div>
      </footer>
    </>
  );
}

export default Footer;
