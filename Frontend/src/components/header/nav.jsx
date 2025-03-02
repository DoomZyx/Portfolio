import france from "../../images/french.webp"
import "./_nav.scss"
function Nav() {
 return (
  <nav>
  <a href="#" className="nav-about">A PROPOS</a>
  <a href="#" className="nav-projects">MES PROJETS</a>
  <a href="#" className="nav-contact">CONTACT</a>
  <img src={france} alt="Drapeau France"/>
</nav>
 )
}

export default Nav;