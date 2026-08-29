import { useParams } from "react-router-dom";
import data from "../../data/projects";
import Nav from "../nav/nav";
import Carousel from "../Carousel/carousel";
import "./_projects.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";


import Footer from "../footer/footer.jsx";

function Projects() {
  const { id } = useParams();
  const project = data.find((proj) => proj.id === parseInt(id));

  if (!project) {
    return (
      <>
        <Nav />
        <main className="project-page">
          <p className="project-not-found">Projet introuvable</p>
        </main>
        <Footer />
      </>
    );
  }

  const descriptionWithBreaks = project.description.fr.replace(/\n/g, "<br />"); //dangerouslySetInnerHTML permet de rendre br dans les descriptions comme un élément HTML

  return (
    <>
      <Nav />
      <main className="project-page">
        <header className="project-header">
          <h1 className="project-title">{project.title.fr}</h1>
          <span className="project-status">
            {project.progression === "in-progress" ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : project.progression === "completed" ? (
              <FontAwesomeIcon icon={faCheck} />
            ) : null}
          </span>
        </header>

        <section className="project-content">
          <div className="project-carousel">
            <Carousel images={project.images} />
          </div>
          <div className="project-info">
            <div className="project-description">
              <h2 className="project-description-title">Description</h2>
              <div className="project-description-text" dangerouslySetInnerHTML={{ __html: descriptionWithBreaks }} />
            </div>
            <div className="project-actions">
              {project.url && (
                <a
                  className="project-link project-link-website"
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visiter le site
                </a>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Projects;
