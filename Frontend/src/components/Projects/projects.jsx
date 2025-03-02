import Carousel from "../Carousel/caroussel";
import "./_projects.scss";

function MyProjects() {
  return (
    <>
      <section className="layout-projects">
        <h2 className="projects-title">MES PROJETS</h2>

        <div className="box-projects">
          <Carousel />
        </div>
      </section>
    </>
  );
}

export default MyProjects;
