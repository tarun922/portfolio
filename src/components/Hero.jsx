import { ArrowDown, ChevronsDown, Sparkles } from "lucide-react";
import { profile } from "../data/profile.js";
import GithubIcon from "./GithubIcon.jsx";
import GlassCard from "./GlassCard.jsx";
import "./Hero.css";

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="wrap">
        <GlassCard className="hero-card" max={3}>
          <span className="hero-tag"><Sparkles size={14} /> Portfolio</span>
          <h1 className="hero-title">{profile.name}</h1>
          <p className="hero-headline">{profile.headline}</p>
          <p className="hero-intro">{profile.intro}</p>
          <ul className="hero-chips">
            {profile.highlights.map((h) => <li key={h}>{h}</li>)}
          </ul>
          <div className="hero-actions">
            <a className="btn" href="#projects"><ArrowDown size={18} /> See projects</a>
            <a className="btn ghost" href={profile.github} target="_blank" rel="noreferrer"><GithubIcon /> GitHub</a>
          </div>
        </GlassCard>
      </div>
      <a className="hero-cue" href="#projects" aria-label="Scroll to projects"><ChevronsDown size={26} /></a>
    </section>
  );
}
