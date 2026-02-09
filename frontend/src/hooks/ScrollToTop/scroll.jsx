import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // croll tout en haut à chaque changement de route
  }, [pathname]);

  return null;
}

export default ScrollToTop;