import Typewriter from "../../hooks/Typewriter/Typewriter";
import logoPortfolio from "../../../public/Portfolio.webp";
import "./_header.scss";

function header() {
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
          <Typewriter
            text={`Tout problème a sa solution \nChaque ligne de code y contribue`}
            speed={50}
          ></Typewriter>
        </div>
    </>
  );
}

export default header;
