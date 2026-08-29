import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  // 1. Désactive la restauration automatique du navigateur au montage
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // 2. Remonte en haut de page UNIQUEMENT si le chemin change (sans ancre)
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [pathname]); // <-- Uniquement pathname !

  // 3. Gère le scroll fluide vers les ancres (#contact, etc.)
  useEffect(() => {
    if (!hash) return;

    const id = hash.replace("#", "");
    let retryTimer;

    const scrollToHash = () => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return true;
      }
      return false;
    };

    const timer = setTimeout(() => {
      if (!scrollToHash()) {
        retryTimer = setTimeout(scrollToHash, 400);
      }
    }, 200);

    return () => {
      clearTimeout(timer);
      clearTimeout(retryTimer);
    };
  }, [hash]); // <-- Uniquement hash !

  return null;
}

export default ScrollToTop;