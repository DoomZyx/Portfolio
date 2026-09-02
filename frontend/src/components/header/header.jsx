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
    </>
  );
}

export default Header;
