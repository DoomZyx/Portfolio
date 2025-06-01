import { lazy } from "react";
import "../base/_base.scss";
import "../components/header/_header.scss";

import office from "../images/office.webp"

import Nav from "../components/Nav/nav";
const Header = lazy(() => import("../components/header/header"));
const AboutMe = lazy(() => import("../components/About/about"));
const MySkills = lazy(() => import("../components/Myskills/myskills"));
const MyProjects = lazy(() => import("../components/Projects/projects"));
const Contact = lazy(() => import("../components/Contact/contact"));


function Homepage() {
  return (
    <>
      <div className="Background-1">
        <img className="office-background" src={office} alt="" />
        <Nav />
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
