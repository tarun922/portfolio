import { projects } from "../data/projects.js";
import useMouseParallax from "../hooks/useMouseParallax.js";
import "./CelStack.css";

// Layered "animation cels", one per project. They shift with the pointer.
export default function CelStack() {
  const ref = useMouseParallax();
  return (
    <div className="cels" ref={ref} aria-hidden="true">
      {projects.map((p, i) => (
        <div key={p.id} className="cel" style={{ "--c": p.accent, "--i": i }}>
          <span>{p.name}</span>
        </div>
      ))}
    </div>
  );
}
