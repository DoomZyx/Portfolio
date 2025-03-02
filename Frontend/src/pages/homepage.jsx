import Header from "../components/header/header";
import "../components/header/_header.scss";

import "../base/_base.scss";
import AboutMe from "../components/About/about";
import MySkills from "../components/Myskills/myskills";
import MyProjects from "../components/Projects/projects";
import Contact from "../components/Contact/contact";

function Homepage() {
  return (
    <>
      <div className="Background-1">
        <Header />
      </div>
      <main>
        <AboutMe />
        <MySkills />
        <MyProjects />
        <Contact />
      </main>
      <footer></footer>
    </>
  );
}

export default Homepage;
