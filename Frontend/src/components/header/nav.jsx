import france from "../../images/french.webp"
import "./_nav.scss"
function Nav() {
 return (
  <nav>
  <a href="#about" className="nav-about">A PROPOS</a>
  <a href="#project" className="nav-projects">MES PROJETS</a>
  <a href="#contact" className="nav-contact">CONTACT</a>
  <img src={france} alt="Drapeau France"/>
</nav>
 )
}

export default Nav;