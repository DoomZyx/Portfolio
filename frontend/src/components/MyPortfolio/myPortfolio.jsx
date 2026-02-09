import { Suspense, lazy } from "react";
import { useRef, useEffect } from "react";
import { HashLink as Link } from "react-router-hash-link";
import projects from "../../data/projects";
import "./_myportfolio.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import kasaimg from "/public/kasa.webp";
import LeMasimg from "/public/LeMasDuParadis1.webp";
import space from "/public/space.jpg";
import ai1 from "/public/AIVoiceAssistant/AI1.webp";
import MAFRA1 from "/public/MAFRA/MAFRA1.webp";

import node from "/public/stack/node.webp";
import sql from "/public/stack/sqlite.webp";
import mongodb from "/public/stack/mongodb.webp";
import react from "/public/stack/react.webp";
import sass from "/public/stack/sass.webp";
import figma from "/public/stack/figma.webp";

import ohmyfoodimg from "/public/ohmyfood1.webp";

import character from "/public/character.webp";
const IphoneViewer = lazy(() => import("../../animation/models/iphone"));

function MyPortfolio() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const handleWheel = (e) => {
      e.preventDefault();
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const ohmyfood = projects.find((p) => p.title.fr === "Ohmyfood");
  const kasa = projects.find((p) => p.title.fr === "Kasa");
  const leMas = projects.find((p) => p.title.fr === "Le Mas Du Paradis Bleu");
  const aivoice = projects.find((p) => p.title.fr === "SmartOrder");
  const mafrashop = projects.find((p) => p.title.fr === "MAFRASHOP");

  return (
    <>
      <h2 className="title-portfolio" id="portfolio">
        Mon portfolio
      </h2>

      <div className="container">
        <div className="base-container">
          <div className="containerThirst">
            <div className="kasa">
              <Link smooth={true} to={`/project/${kasa.id}`}>
                <img
                  src={kasaimg}
                  alt="Homepage du site Kasa"
                  width={150}
                  height={150}
                  loading="lazy"
                />
                <div className="info-project">
                  <h4>Kasa</h4>
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </Link>
            </div>

            <div className="leMas">
              <Link smooth={true} to={`/project/${leMas.id}`}>
                <img
                  src={LeMasimg}
                  alt="Homepage du site Le Mas Du Paradis Bleu"
                  width={150}
                  height={150}
                  loading="lazy"
                />
                <div className="info-project">
                  <h4>Le Mas Du Paradis Bleu</h4>
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </Link>
            </div>

            <div className="Iphone3d" ref={containerRef}>
              <Suspense
                fallback={
                  <div
                    className="loader3D"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <FontAwesomeIcon icon={faSpinner} spin />
                  </div>
                }
              >
                <IphoneViewer />
              </Suspense>
            </div>
          </div>

          <div className="secondlayout">
            <div className="space">
              <img
                src={space}
                alt="Image de l'espace et ses étoiles"
                width={150}
                height={150}
                loading="lazy"
              />
            </div>

            <div className="layout-stack">
              <div className="thirstrangest">
                <img
                  className="nodejs"
                  src={node}
                  alt="Logo Node.js"
                  loading="lazy"
                />
                <img className="sql" src={sql} alt="Logo SQL" loading="lazy" />
                <img
                  className="mongodb"
                  src={mongodb}
                  alt="Logo MongoDB"
                  loading="lazy"
                />
              </div>
              <div className="secondrangest">
                <img
                  className="react"
                  src={react}
                  alt="Logo React"
                  loading="lazy"
                />
                <img
                  className="sass"
                  src={sass}
                  alt="Logo SASS"
                  loading="lazy"
                />
                <img
                  className="figma"
                  src={figma}
                  alt="Logo Figma"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="ohmyfood">
              <Link smooth={true} to={`/project/${ohmyfood.id}`}>
                <img
                  src={ohmyfoodimg}
                  alt="Homepage de Ohmyfood"
                  width={150}
                  height={150}
                  loading="lazy"
                />
                <div className="info-project">
                  <h4>Ohmyfood</h4>
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </Link>
            </div>

            <div className="myself">
              <img
                src={character}
                alt="Personnage habbo de moi-même"
                width={150}
                height={150}
                loading="lazy"
              />
            </div>

            <div className="smartorder">
              <Link smooth={true} to={`/project/${aivoice.id}`}>
                <img
                  src={ai1}
                  alt="Homepage de smartOrder"
                  width={150}
                  height={150}
                  loading="lazy"
                />
                <div className="info-project">
                  <h4>SmartOrder</h4>
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </Link>
            </div>

            <div className="mafrashop">
              <Link smooth={true} to={`/project/${mafrashop.id}`}>
                <img
                  src={MAFRA1}
                  alt="Homepage de MAFRASHOP"
                  width={150}
                  height={150}
                  loading="lazy"
                />
                <div className="info-project">
                  <h4>MAFRASHOP</h4>
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyPortfolio;

// style={{
//               //   height: window.innerWidth < 768 ? "300px" : "500px", // condition pour mobile
//               //   width: window.innerWidth < 768 ? "100%" : "500px", // condition pour mobile
//               // }}
