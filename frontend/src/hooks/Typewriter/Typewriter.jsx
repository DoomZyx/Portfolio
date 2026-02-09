import { useEffect, useRef, useState } from "react";

export default function Typewriter({ text = "", speed = 50 }) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  // Observer pour déclencher l'animation au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Animation d'écriture 
  useEffect(() => {
    if (!hasAnimated) return;

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [index, text, speed, hasAnimated]);

  // Curseur clignotant
  useEffect(() => {
    const blink = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(blink);
  }, []);

  return (
    <h1 ref={elementRef} style={{ whiteSpace: "pre-wrap" }}>
      {displayedText}
      <span style={{ opacity: cursorVisible ? 1 : 0 }}>|</span>
    </h1>
  );
}
