/* eslint-disable react/prop-types -- pas de PropTypes dans ce projet */
import { Link } from "react-router-dom";
import { getProjectsSorted } from "../../data/projects";
import "./_myportfolio.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function ProjectCard({ project }) {
  const previewImage = project.images[0];
  const title = project.card?.cardTitle || project.title.fr;
  const subtitle = project.card?.cardSubtitle || project.subtitle;

  return (
    <article className="project-card">
      <Link className="project-card-link" to={`/project/${project.slug}`}>
        <img
          src={previewImage}
          alt={`Aperçu de ${title}`}
          width={1916}
          height={912}
          loading="lazy"
        />
        <div className="info-project">
          <div className="info-project-text">
            <h3 className="project-card-title">{title}</h3>
            {subtitle ? (
              <p className="project-card-subtitle">{subtitle}</p>
            ) : null}
            {project.card?.problemOneLiner ? (
              <p className="project-card-problem">
                {project.card.problemOneLiner}
              </p>
            ) : null}
            {project.card?.outcomeChip ? (
              <span className="project-card-chip">
                {project.card.outcomeChip}
              </span>
            ) : null}
          </div>
          <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
        </div>
      </Link>
    </article>
  );
}

function MyPortfolio() {
  const projects = getProjectsSorted();

  return (
    <>
      <h2 className="title-portfolio" id="portfolio">
        Mon portfolio
      </h2>
      <p className="portfolio-lead">
        Quelques cas réels : problème, approche, décisions.
      </p>

      <div className="container">
        <div className="portfolio-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </>
  );
}

export default MyPortfolio;
