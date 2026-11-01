import { ExternalLink, Tag } from "lucide-react";
import GithubIcon from "./GithubIcon.jsx";
import ProjectCarousel from "./ProjectCarousel.jsx";
import GlassCard from "./GlassCard.jsx";

export default function ProjectDetail({ project }) {
  const { name, tagline, description, tags, repo, live } = project;
  return (
    <GlassCard as="article" className="pdetail" max={2} role="tabpanel">
      <ProjectCarousel project={project} />
      <h3>{name}</h3>
      <p className="pdetail-tagline">{tagline}</p>
      <p className="pdetail-desc">{description}</p>
      <ul className="pdetail-tags">
        {tags.map((t) => <li key={t}><Tag size={13} /> {t}</li>)}
      </ul>
      <div className="pdetail-links">
        {live && <a className="btn" href={live} target="_blank" rel="noreferrer"><ExternalLink size={18} /> Open live site</a>}
        {repo && <a className="btn ghost" href={repo} target="_blank" rel="noreferrer"><GithubIcon /> Source on GitHub</a>}
        {!live && !repo && <span className="pdetail-soon">Links coming soon.</span>}
      </div>
    </GlassCard>
  );
}
