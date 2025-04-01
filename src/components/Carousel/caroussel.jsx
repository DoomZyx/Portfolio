import { Swiper, SwiperSlide } from "swiper/react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import projects from "../../data/dataProjects";
import "./_caroussel.scss";
import "../animation/_1stsec.scss";
import github from "../../images/github.webp";

import { useTranslation } from "react-i18next";
import Observer from "../animation/Observer";

const Carousel = () => {
  const { i18n } = useTranslation();
  const [ref, isVisible] = Observer({ threshold: 0.3 });

  const [isOpen, setIsOpen] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <div
      ref={ref}
      className={`carousel-container ${isVisible ? "active" : ""}`}
    >
      <Swiper
        modules={[Navigation]}
        navigation
        loop
        spaceBetween={50}
        slidesPerView={1}
        className="main-swiper"
        onSlideChange={(swiper) => setCurrentProjectIndex(swiper.realIndex)}
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index}>
            <div className="project-card">
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                loop
                spaceBetween={10}
                slidesPerView={1}
                className="image-swiper"
              >
                {project.images.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={img}
                      alt={`project-${index}-img-${idx}`}
                      onClick={() => {
                        setIsOpen(true);
                        setPhotoIndex(idx);
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="project-info">
                <h2 className="caroussel-title">
                  {project.title[i18n.language]}{" "} <br />
                  <span>{project.progression[i18n.language]}</span>
                </h2>
                <p className="caroussel-description">{project.description[i18n.language]}</p>
                <div className="technos">
                  {project.technos.map((tech, id) => (
                    <img key={id} src={tech} alt="tech" />
                  ))}
                </div>
                <div className="repo-layout">
                  <button
                    className="link-github"
                    onClick={() => window.open(project.link, "_blank")}
                  >
                    <img src={github} alt="" />
                    <p>LIEN REPO</p>
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={projects[currentProjectIndex].images.map((src) => ({
            src,
          }))}
          index={photoIndex}
        />
      )}
    </div>
  );
};

export default Carousel;
