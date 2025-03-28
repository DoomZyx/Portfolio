import { useRef, useState, useEffect } from "react";
import projectsData from "../../data/dataProjects";
import "./_caroussel.scss";
import "../animation/_1stsec.scss";
import github from "../../images/github.webp";

import { useTranslation } from "react-i18next";
import Observer from "../animation/Observer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Carousel = () => {
  const { i18n } = useTranslation();
  const [ref, isVisible] = Observer({ threshold: 0.3 });

  const [projectIndex, setProjectIndex] = useState(0);

  const [imageIndex, setImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  const imageFullScreen = useRef(null);

  // Ecouteur d'événement qui change l'index de l'image en fonction des flèches

  useEffect(() => {
    const handleKeyDown = (e) => {
      const images = projectsData[projectIndex].images;
      const lastIndex = images.length - 1;

      if (e.key === "ArrowRight") {
        const nextIndex = imageIndex + 1 > lastIndex ? 0 : imageIndex + 1;
        changeImage(nextIndex);
      } else if (e.key === "ArrowLeft") {
        const prevIndex = imageIndex - 1 < 0 ? lastIndex : imageIndex - 1;
        changeImage(prevIndex);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [imageIndex, projectIndex]);

  if (
    !projectsData[projectIndex] ||
    !projectsData[projectIndex].images ||
    projectsData[projectIndex].images.length === 0
  ) {
    return <p>Aucune image disponible.</p>;
  }

  const nextProject = () => {
    setAnimationClass("slide-out-left");
    setTimeout(() => {
      setProjectIndex((prev) => (prev + 1) % projectsData.length);
      setImageIndex(0);
      setAnimationClass("");
    }, 500);
  };

  const prevProject = () => {
    setAnimationClass("slide-out-right");
    setTimeout(() => {
      setProjectIndex(
        (prev) => (prev - 1 + projectsData.length) % projectsData.length
      );
      setImageIndex(0);
      setAnimationClass("");
    }, 500);
  };

  const changeImage = (newIndex) => {
    if (newIndex === imageIndex) return;

    const direction =
      newIndex > imageIndex ? "slide-out-left" : "slide-out-right";
    setAnimationClass(direction);

    setTimeout(() => {
      setImageIndex(newIndex);
      setAnimationClass("");
    }, 500);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const threshold = 50;

    if (distance > threshold) {
      nextProject();
    } else if (distance < -threshold) {
      prevProject();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleFullscreen = () => {
    if (imageFullScreen.current) {
      if (imageFullScreen.current.requestFullscreen) {
        imageFullScreen.current.requestFullscreen().catch((err) => {
          console.error("Erreur lors de l'ouverture en plein écran : ", err);
          setIsFullScreen(true);
        });
      } else if (imageFullScreen.current.webkitRequestFullscreen) {
        imageFullScreen.current.webkitRequestFullscreen();
      } else {
        setIsFullScreen(true);
      }
    }
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
  };

  return (
    <div
      ref={ref}
      className={`carousel-container ${isVisible ? "active" : ""} ${
        isFullScreen ? "no-transform" : ""
      }`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <button
        aria-label="Bouton précédent"
        className="carousel-btn prev"
        onClick={prevProject}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <div className="carousel" id="project">
        <div className="carousel-item">
          <div className="sub-carousel" ref={imageFullScreen}>
            <img
              loading="lazy"
              className={animationClass}
              src={projectsData[projectIndex].images[imageIndex]}
              alt={`Image ${imageIndex + 1}`}
              onClick={handleFullscreen}
            />
          </div>
          <div className="image-pagination">
            {projectsData[projectIndex].images.map((_, i) => (
              <div
                key={i}
                className={`image-dot ${i === imageIndex ? "active" : ""}`}
                onClick={() => changeImage(i)}
              ></div>
            ))}
          </div>
          <div className={`carousel-text ${isVisible ? "active" : ""}`}>
            <h2 className="carousel-title">
              {projectsData[projectIndex].title[i18n.language]}
            </h2>
            <p className="carousel-progression">
              {projectsData[projectIndex].progression[i18n.language]}
            </p>
            <p className="carousel-description">
              {projectsData[projectIndex].description[i18n.language]}
            </p>
            <div className="techno-layout">
              {projectsData[projectIndex].technos.map((tech, i) => (
                <img
                  key={i}
                  src={tech}
                  alt={`technologie ${i + 1}`}
                  className="tech-icon"
                />
              ))}
            </div>
            <button
              className="link-github"
              onClick={() =>
                window.open(projectsData[projectIndex].link, "_blank")
              }
            >
              <img src={github} alt="" />
              <p>LIEN REPO</p>
            </button>
          </div>
        </div>
      </div>
      <button
        aria-label="Bouton suivant"
        className="carousel-btn next"
        onClick={nextProject}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>

      {isFullScreen && (
        <div className="fullscreen-overlay" onClick={closeFullScreen}>
          <img
            src={projectsData[projectIndex].images[imageIndex]}
            alt={`Image ${imageIndex + 1}`}
          />
          <div className="image-pagination-screen">
            {projectsData[projectIndex].images.map((_, i) => (
              <div
                key={i}
                className={`image-dot-screen ${
                  i === imageIndex ? "active" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setImageIndex(i);
                }}
              ></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;
