import { useState } from "react";
import ProjectArt from "./ProjectArt.jsx";
import "./ProjectShot.css";

// Browser-window frame. Shows the real screenshot, or generated art if the file is missing.
export default function ProjectShot({ project }) {
  const [failed, setFailed] = useState(false);
  const src = `${import.meta.env.BASE_URL}${project.image}`;
  const host = project.live ? new URL(project.live).host : project.name.toLowerCase();
  return (
    <figure className="shot">
      <div className="shot-bar"><i /><i /><i /><span>{host}</span></div>
      <div className="shot-body">
        {failed
          ? <ProjectArt project={project} />
          : <img src={src} alt={`${project.name} screenshot`} onError={() => setFailed(true)} />}
      </div>
    </figure>
  );
}
