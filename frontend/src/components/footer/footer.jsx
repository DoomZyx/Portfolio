import "./footer.scss";
import github from "../../../public/github.webp";
import linkedin from "../../../public/linkedin.webp";
import gmail from "../../../public/gmail.webp";

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
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
            <a
              href="https://github.com/DoomZyx"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="github"
                src={github}
                alt="Logo Github"
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
