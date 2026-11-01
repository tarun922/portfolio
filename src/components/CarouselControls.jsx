import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CarouselControls({ count, index, onGo, onPick }) {
  return (
    <>
      <button className="car-nav prev" onClick={() => onGo(-1)} aria-label="Previous image"><ChevronLeft size={22} /></button>
      <button className="car-nav next" onClick={() => onGo(1)} aria-label="Next image"><ChevronRight size={22} /></button>
      <span className="car-count">{index + 1} / {count}</span>
      <div className="car-dots">
        {Array.from({ length: count }, (_, i) => (
          <button key={i} className={i === index ? "on" : ""} onClick={() => onPick(i)} aria-label={`Image ${i + 1}`} />
        ))}
      </div>
    </>
  );
}
