import { useState } from "react";
import { Layers } from "lucide-react";
import { projects } from "../data/projects.js";
import ProjectList from "./ProjectList.jsx";
import ProjectDetail from "./ProjectDetail.jsx";
import SectionTitle from "./SectionTitle.jsx";
import "./Projects.css";

export default function Projects() {
  const [activeId, setActiveId] = useState(projects[0].id);
  const active = projects.find((p) => p.id === activeId);
  return (
    <section id="projects" className="projects" style={{ "--accent": active.accent }}>
      <div className="wrap">
        <SectionTitle icon={Layers}>Projects</SectionTitle>
        <div className="projects-grid">
          <ProjectList projects={projects} activeId={activeId} onSelect={setActiveId} />
          <ProjectDetail key={active.id} project={active} />
        </div>
      </div>
    </section>
  );
}
