import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// html/body sont en height:100% : sur téléphone le scroll visible est souvent
// body, pas documentElement. Scroller le mauvais élément laisse un écran vide.
function scrollToNavTarget(hash) {
  const id = hash ? hash.replace(/^#/, "") : "";

  if (!id) {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
    return true;
  }

  const element = document.getElementById(id);
  if (!element) return false;

  const offset = window.matchMedia("(max-width: 63.99em)").matches ? 64 : 0;
  element.scrollIntoView({ block: "start" });

  const delta = element.getBoundingClientRect().top - offset;
  if (Math.abs(delta) < 2) return true;

  const before = element.getBoundingClientRect().top;
  document.body.scrollTop += delta;
  if (Math.abs(element.getBoundingClientRect().top - before) < 1) {
    window.scrollBy(0, delta);
  }
  return true;
}

export function scheduleNavScroll(hash) {
  let tries = 0;
  let timer = 0;

  const tick = () => {
    if (scrollToNavTarget(hash) || tries >= 40) return;
    tries += 1;
    timer = window.setTimeout(tick, 100);
  };

  timer = window.setTimeout(tick, 0);
  return () => window.clearTimeout(timer);
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => scheduleNavScroll(hash), [pathname, hash]);

  return null;
}

export default ScrollToTop;