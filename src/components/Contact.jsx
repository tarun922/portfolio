import { Mail, ExternalLink, MessageCircle } from "lucide-react";
import { profile } from "../data/profile.js";
import GithubIcon from "./GithubIcon.jsx";
import SectionTitle from "./SectionTitle.jsx";
import GlassCard from "./GlassCard.jsx";
import "./Contact.css";

export default function Contact() {
  return (
    <section id="contact" style={{ "--accent": "var(--sakura)" }}>
      <div className="wrap">
        <SectionTitle icon={MessageCircle}>Let's build something</SectionTitle>
        <GlassCard className="contact-card" max={2}>
          <p>Have an idea, a bug in one of my projects, or just want to talk AI tooling? Reach out.</p>
          <div className="contact-actions">
            <a className="btn" href={profile.github} target="_blank" rel="noreferrer"><GithubIcon /> github.com/{profile.handle}</a>
            {profile.email && <a className="btn ghost" href={`mailto:${profile.email}`}><Mail size={18} /> Email me</a>}
            <a className="btn ghost" href={profile.portfolioRepo} target="_blank" rel="noreferrer"><ExternalLink size={18} /> Source of this site</a>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
