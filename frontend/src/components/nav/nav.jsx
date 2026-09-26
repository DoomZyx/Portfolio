import "./_nav.scss";
import { HashLink } from "react-router-hash-link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav>
        <div className="layout-burger">
          <button
            className="burger-menu"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? "✕" : "☰"}
          </button>
          <div className="myProfile">
            <img
              className="pictureOfMyself"
              src="/me.webp"
              alt="Axel Cella"
              width={127}
              height={123}
              loading="eager"
            />
          </div>
        </div>
        <div className="nav-layout">
          <div className="myProfile">
            <img
              className="pictureOfMyself"
              src="/me.webp"
              alt=""
              width={127}
              height={123}
              loading="eager"
            />
            <h4>Axel</h4>
          </div>
          <div className="links">
            <HashLink smooth={true} to="/">
              Acceuil
            </HashLink>
            <HashLink smooth={true} to="/#portfolio">
              Portfolio
            </HashLink>
            <HashLink smooth={true} to="/#services">
              Services
            </HashLink>
            <HashLink smooth={true} to="/#about">
              A propos
            </HashLink>
          </div>
          <HashLink smooth={true} to="/#contact">
            <div className="connectButton">
              <button>Connectons-nous</button>
            </div>
          </HashLink>
        </div>

        <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
          <div className="burger-title">
            <h2>PORTFOLIO</h2>
          </div>
          <div className="burger-links">
            <HashLink smooth={true} to="/" onClick={closeMenu}>
              Acceuil
            </HashLink>
            <HashLink smooth={true} to="/#portfolio" onClick={closeMenu}>
              Portfolio
            </HashLink>
            <HashLink smooth={true} to="/#services" onClick={closeMenu}>
              Services
            </HashLink>
            <HashLink smooth={true} to="/#about" onClick={closeMenu}>
              A propos
            </HashLink>
          </div>
          <HashLink smooth={true} to="/#contact" onClick={closeMenu}>
            <div className="connectButton-menu">
              <button type="button">Connectons-nous</button>
            </div>
          </HashLink>
          <div className="burger-socials">
            <a
              href="tel:+33672886255"
              aria-label="Appeler le 06 72 88 62 55"
            >
              <FontAwesomeIcon icon={faPhone} />
            </a>
            <a
              href="mailto:axelcella.ac@gmail.com"
              aria-label="Envoyer un email"
            >
              <img
                src="/gmail.webp"
                alt=""
                width={50}
                height={55}
                loading="lazy"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/axel-cella-8bb55a19b/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <img
                src="/linkedin.webp"
                alt=""
                width={55}
                height={55}
                loading="lazy"
              />
            </a>
            <a
              href="https://github.com/DoomZyx"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <img
                src="/github.webp"
                alt=""
                width={50}
                height={50}
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
