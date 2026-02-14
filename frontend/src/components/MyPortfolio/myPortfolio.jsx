import { Suspense, lazy, useMemo } from "react";
import { useRef, useEffect } from "react";
import { HashLink as Link } from "react-router-hash-link";
import projects from "../../data/projects";
import "./_myportfolio.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const IphoneViewer = lazy(() => import("../../animation/models/iphone"));

function ProjectCard({ project }) {
  const previewImage = project.images[0];

  return (
    <div className="project-card">
      <Link smooth={true} to={`/project/${project.id}`}>
        <img
          src={previewImage}
          alt={`Homepage de ${project.title.fr}`}
          width={150}
          height={150}
          loading="lazy"
        />
        <div className="info-project">
          <h4>{project.title.fr}</h4>
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </Link>
    </div>
  );
}

function MyPortfolio() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const handleWheel = (e) => {
      e.preventDefault();
    };

    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        container.removeEventListener("wheel", handleWheel);
      };
    }
  }, []);

  const portfolioItems = useMemo(() => {
    const sortedProjects = [...projects].sort((a, b) => a.id - b.id);
    const decorativeElements = [
      { type: 'iphone', id: 'iphone-3d' }
    ];

    return [
      ...sortedProjects.map(project => ({ type: 'project', data: project })),
      ...decorativeElements.map(elem => ({ type: elem.type, data: elem }))
    ];
  }, []);

  return (
    <>
      <h2 className="title-portfolio" id="portfolio">
        Mon portfolio
      </h2>

      <div className="container" ref={containerRef}>
        <div className="portfolio-grid">
          {projects
            .sort((a, b) => a.id - b.id)
            .map((project) => (
              <ProjectCard key={`project-${project.id}`} project={project} />
            ))}
        </div>
      </div>
    </>
  );
}

export default MyPortfolio;
