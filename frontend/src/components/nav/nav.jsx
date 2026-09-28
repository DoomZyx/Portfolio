import { useEffect, useId, useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import "./_nav.scss";

const NAV_LINKS = [
  { to: "/", label: "Accueil" },
  { to: "/#portfolio", label: "Portfolio" },
  { to: "/#services", label: "Services" },
  { to: "/#pedagogie", label: "Pédagogie" },
  { to: "/#about", label: "À propos" },
  { to: "/#contact", label: "Contact" },
];

const SOCIAL_LINKS = [
  {
    href: "tel:+33672886255",
    label: "Appeler le 06 72 88 62 55",
    type: "phone",
  },
  {
    href: "mailto:axelcella.ac@gmail.com",
    label: "Envoyer un email",
    type: "image",
    src: "/gmail.webp",
  },
  {
    href: "https://www.linkedin.com/in/axel-cella-8bb55a19b/",
    label: "LinkedIn",
    type: "image",
    src: "/linkedin.webp",
    external: true,
  },
  {
    href: "https://github.com/DoomZyx",
    label: "GitHub",
    type: "image",
    src: "/github.webp",
    external: true,
  },
];

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((open) => !open);

  useEffect(() => {
    document.body.classList.toggle("nav-menu-open", isOpen);

    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") closeMenu();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("nav-menu-open");
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <nav className="site-nav" aria-label="Navigation principale">
      <div className="nav-bar-mobile">
        <button
          type="button"
          className={`burger-menu${isOpen ? " is-open" : ""}`}
          onClick={toggleMenu}
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isOpen}
          aria-controls={menuId}
        >
          <span className="burger-menu-line" />
          <span className="burger-menu-line" />
          <span className="burger-menu-line" />
        </button>

        <Link to="/" className="nav-brand nav-brand--mobile" onClick={closeMenu}>
          <img
            className="nav-avatar"
            src="/me.webp"
            alt="Axel Cella"
            width={40}
            height={40}
            loading="eager"
          />
        </Link>
      </div>

      <div className="nav-layout">
        <Link to="/" className="nav-brand">
          <img
            className="nav-avatar"
            src="/me.webp"
            alt=""
            width={35}
            height={35}
            loading="eager"
          />
          <span className="nav-brand-name">Axel</span>
        </Link>

        <div className="nav-links">
          {NAV_LINKS.map((link) => (
            <HashLink key={link.to} smooth to={link.to}>
              {link.label}
            </HashLink>
          ))}
        </div>

        <Link to="/diagnostic" className="nav-cta">
          Faire un diagnostic
        </Link>
      </div>

      <div
        id={menuId}
        className={`mobile-menu${isOpen ? " open" : ""}`}
        aria-hidden={!isOpen}
      >
        <div className="mobile-menu-inner">
          <div className="burger-links">
            {NAV_LINKS.map((link, index) => (
              <HashLink
                key={link.to}
                className="burger-link"
                smooth
                to={link.to}
                onClick={closeMenu}
                tabIndex={isOpen ? 0 : -1}
              >
                <span className="burger-link-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="burger-link-label">{link.label}</span>
                <span className="burger-link-arrow" aria-hidden="true">
                  →
                </span>
              </HashLink>
            ))}
          </div>

          <Link
            to="/diagnostic"
            className="nav-cta nav-cta--mobile"
            onClick={closeMenu}
            tabIndex={isOpen ? 0 : -1}
          >
            Faire un diagnostic
          </Link>
        </div>

        <div className="burger-menu-footer">
          <div className="burger-socials">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-label={item.label}
                tabIndex={isOpen ? 0 : -1}
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {item.type === "phone" ? (
                  <FontAwesomeIcon icon={faPhone} />
                ) : (
                  <img
                    src={item.src}
                    alt=""
                    width={28}
                    height={28}
                    loading="lazy"
                  />
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
