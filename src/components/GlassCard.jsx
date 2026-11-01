import { useRef } from "react";

// Glass panel that tilts toward the pointer and shows a moving highlight.
export default function GlassCard({ as: Tag = "div", max = 4, className = "", children, ...rest }) {
  const ref = useRef(null);

  const onMove = (e) => {
    if (e.pointerType === "touch") return;
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${(x - 0.5) * 2 * max}deg`);
    el.style.setProperty("--rx", `${-(y - 0.5) * 2 * max}deg`);
    el.style.setProperty("--px", `${x * 100}%`);
    el.style.setProperty("--py", `${y * 100}%`);
  };
  const onLeave = () => {
    const s = ref.current.style;
    s.setProperty("--rx", "0deg");
    s.setProperty("--ry", "0deg");
    s.setProperty("--px", "20%");
    s.setProperty("--py", "0%");
  };

  return (
    <Tag ref={ref} className={`panel tilt ${className}`} onPointerMove={onMove} onPointerLeave={onLeave} {...rest}>
      {children}
    </Tag>
  );
}
