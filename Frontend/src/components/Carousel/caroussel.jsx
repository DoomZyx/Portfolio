import { useState } from "react";
import projectsData from "../../data/dataProjects";
import "./_caroussel.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Carousel = () => {
  const [projectIndex, setProjectIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  if (
    !projectsData[projectIndex] ||
    !projectsData[projectIndex].images ||
    projectsData[projectIndex].images.length === 0
  ) {
    return <p>Aucune image disponible.</p>;
  }

  const nextProject = () => {
    setProjectIndex((prev) => (prev + 1) % projectsData.length);
    setImageIndex(0);
  };

  const prevProject = () => {
    setProjectIndex(
      (prev) => (prev - 1 + projectsData.length) % projectsData.length
    );
    setImageIndex(0);
  };


  return (
    <div className="carousel-container">
      <button className="carousel-btn prev" onClick={prevProject}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <div className="carousel">
        <div className="carousel-item">
          <div className="sub-carousel">
            <img
              src={projectsData[projectIndex].images[imageIndex]}
              alt={`Image ${imageIndex + 1}`}
            />
          </div>
          <div className="image-pagination">
            {projectsData[projectIndex].images.map((_, i) => (
              <div
                key={i}
                className={`image-dot ${i === imageIndex ? "active" : ""}`}
                onClick={() => setImageIndex(i)}
              ></div>
            ))}
          </div>
         <div className="carousel-text">
          <h2 className="carousel-title">{projectsData[projectIndex].title}</h2>
          <p className="carousel-description">
            {projectsData[projectIndex].description}
          </p>
         </div>
        </div>
      </div>
      <button className="carousel-btn next" onClick={nextProject}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default Carousel;
