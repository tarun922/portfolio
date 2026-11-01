import { useCallback, useEffect, useRef, useState } from "react";
import { Maximize2 } from "lucide-react";
import { imagesFor } from "../data/gallery.js";
import ProjectArt from "./ProjectArt.jsx";
import CarouselControls from "./CarouselControls.jsx";
import Lightbox from "./Lightbox.jsx";
import "./ProjectCarousel.css";

// Browser-window carousel. Shows every image in src/assets/projects/<id>/,
// or generated artwork if the folder is empty.
export default function ProjectCarousel({ project }) {
  const images = imagesFor(project.id);
  const count = Math.max(images.length, 1);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState(false);
  const startX = useRef(null);
  const go = useCallback((d) => setIndex((i) => (i + d + count) % count), [count]);

  useEffect(() => {
    if (count < 2 || paused || open) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => go(1), 4500);
    return () => clearInterval(t);
  }, [count, paused, open, go]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(1);
  };
  const onPointerUp = (e) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };
  const host = project.live ? new URL(project.live).host : project.name.toLowerCase();

  return (
    <figure
      className="car" tabIndex={0} onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
    >
      <div className="car-bar">
        <i /><i /><i />
        <span className="car-host">{host}</span>
        {images.length > 0 && (
          <button className="car-full" onClick={() => setOpen(true)} aria-label="View fullscreen"><Maximize2 size={16} /></button>
        )}
      </div>
      <div className="car-viewport" onPointerDown={(e) => { startX.current = e.clientX; }} onPointerUp={onPointerUp}>
        <div className="car-track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {images.length
            ? images.map((src, i) => (
                <div className="car-slide" key={src}>
                  <img src={src} alt={`${project.name} screenshot ${i + 1}`} loading={i === 0 ? "eager" : "lazy"} draggable={false} onClick={() => setOpen(true)} />
                </div>
              ))
            : <div className="car-slide"><ProjectArt project={project} /></div>}
        </div>
        {count > 1 && <CarouselControls count={count} index={index} onGo={go} onPick={setIndex} />}
      </div>
      {open && <Lightbox images={images} index={index} accent={project.accent} onClose={() => setOpen(false)} onGo={go} />}
    </figure>
  );
}
