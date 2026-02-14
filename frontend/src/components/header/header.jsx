import logoPortfolio from "../../../public/Portfolio.webp";
import "./_header.scss";

function Header() {
  return (
    <>
      <header>
        <div className="header-layout">
          <img
            src={logoPortfolio}
            alt="Logo Portfolio Axel Cella"
            width={400}
            height={400}
          />
        </div>
      </header>
      <div className="thphr">
        <h1>Je conçois l'architecture de produits digitaux <br /> Qui allient performance technique et vision stratégique</h1>
      </div>
    </>
  );
}

export default Header;
