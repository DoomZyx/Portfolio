import "./_header.scss";

function Header() {
  return (
    <>
      <header>
        <div className="header-layout">
          <img
            src="/Portfolio.webp"
            alt="Logo Portfolio Axel Cella"
            width={1900}
            height={900}
            fetchPriority="high"
          />
        </div>
      </header>
    </>
  );
}

export default Header;
