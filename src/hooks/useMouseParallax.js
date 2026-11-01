import { useEffect, useRef } from "react";

// Writes --mx and --my (range -1..1) onto the referenced element.
export default function useMouseParallax() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5) * 2);
      el.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5) * 2);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return ref;
}
