import { ChevronRight } from "lucide-react";
import { imagesFor } from "../data/gallery.js";
import { iconFor } from "./projectIcons.js";

// Left-hand switcher: icon, name and how many screenshots the project has.
export default function ProjectList({ projects, activeId, onSelect }) {
  return (
    <ul className="plist" role="tablist" aria-label="Projects">
      {projects.map((p) => {
        const Icon = iconFor(p.id);
        const n = imagesFor(p.id).length;
        return (
          <li key={p.id}>
            <button
              role="tab"
              aria-selected={p.id === activeId}
              className={"plist-btn" + (p.id === activeId ? " is-active" : "")}
              style={{ "--c": p.accent }}
              onClick={() => onSelect(p.id)}
            >
              <span className="plist-icon"><Icon size={20} /></span>
              <span className="plist-text">
                <strong>{p.name}</strong>
                {n > 0 && <small>{n} {n === 1 ? "image" : "images"}</small>}
              </span>
              <ChevronRight size={18} className="plist-arrow" />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
