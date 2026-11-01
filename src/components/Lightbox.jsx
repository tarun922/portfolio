import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import "./Lightbox.css";

// Fullscreen viewer. Esc closes, arrow keys move.
export default function Lightbox({ images, index, accent, onClose, onGo }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onGo(-1);
      if (e.key === "ArrowRight") onGo(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onGo]);

  return createPortal(
    <div className="lb" style={{ "--accent": accent }} onClick={onClose} role="dialog" aria-modal="true" aria-label="Image viewer">
      <button className="lb-btn lb-close" onClick={onClose} aria-label="Close"><X size={24} /></button>
      {images.length > 1 && <button className="lb-btn lb-prev" onClick={(e) => { e.stopPropagation(); onGo(-1); }} aria-label="Previous"><ChevronLeft size={28} /></button>}
      <img src={images[index]} alt="" onClick={(e) => e.stopPropagation()} />
      {images.length > 1 && <button className="lb-btn lb-next" onClick={(e) => { e.stopPropagation(); onGo(1); }} aria-label="Next"><ChevronRight size={28} /></button>}
    </div>,
    document.body
  );
}
