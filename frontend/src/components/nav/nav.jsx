import "./_nav.scss";
import { HashLink } from "react-router-hash-link";
import Me from "/public/me.webp";
import { useState } from "react";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav>
        <div className="layout-burger">
          <button className="burger-menu" onClick={() => setIsOpen(!isOpen)}>
            ☰
          </button>
          <div className="myProfile">
            <img className="pictureOfMyself" src={Me} alt="Axel Cella" loading="lazy" />
          </div>
        </div>
        <div className="nav-layout">
          <div className="myProfile">
            <img className="pictureOfMyself" src={Me} alt="" loading="lazy" />
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
            <div className="connectButton-menu">
              <button>Connectons-nous</button>
            </div>
          </HashLink>
        </div>
      </nav>
    </>
  );
}

export default Nav;
