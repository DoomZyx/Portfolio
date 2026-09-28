import { useParams } from "react-router-dom";
import { findProject } from "../../data/projects";
import Nav from "../nav/nav";
import Carousel from "../Carousel/carousel";
import Footer from "../footer/footer.jsx";
import CaseStudySection from "./CaseStudySection";
import CaseStudyDecisions from "./CaseStudyDecisions";
import CaseStudyWorkflow from "./CaseStudyWorkflow";
import CaseStudyBehindTheScenes from "./CaseStudyBehindTheScenes";
import CaseStudyCta from "./CaseStudyCta";
import "./_projects.scss";

function Projects() {
  const { id } = useParams();
  const project = findProject(id);

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

  const { summary } = project;
  const title = project.title.fr;

  return (
    <>
      <Nav />
      <main className="project-page">
        <header className="project-header">
          <div className="project-header-text">
            <h1 className="project-title">{title}</h1>
            {project.subtitle ? (
              <p className="project-subtitle">{project.subtitle}</p>
            ) : null}
          </div>
          {project.statusLabel ? (
            <p className="project-status-label">{project.statusLabel}</p>
          ) : null}
        </header>

        <section className="project-content">
          {project.images?.length ? (
            <div className="project-carousel">
              <Carousel images={project.images} projectTitle={title} />
            </div>
          ) : null}

          <div className="project-info case-study-body">
            {summary?.lead ? (
              <p className="case-study-lead">{summary.lead}</p>
            ) : null}

            <CaseStudySection
              title={summary?.problemTitle}
              paragraphs={summary?.problem}
            />

            <CaseStudySection
              title={summary?.approachTitle}
              items={summary?.approach}
            />

            {summary?.metaReveal ? (
              <aside className="case-study-meta-reveal" aria-label="Note">
                <p>{summary.metaReveal}</p>
              </aside>
            ) : null}

            <CaseStudySection
              title={summary?.objectiveTitle}
              paragraphs={summary?.objective}
            />

            <CaseStudyDecisions decisions={project.decisions} />
            <CaseStudyWorkflow workflow={project.workflow} />
            <CaseStudyBehindTheScenes
              behindTheScenes={project.behindTheScenes}
            />
            <CaseStudyCta ctas={project.ctas} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Projects;
