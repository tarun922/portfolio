import { Cpu } from "lucide-react";
import { skillGroups } from "../data/skills.js";
import SkillGroup from "./SkillGroup.jsx";
import SectionTitle from "./SectionTitle.jsx";
import "./Skills.css";

export default function Skills() {
  return (
    <section id="skills" style={{ "--accent": "var(--sakura)" }}>
      <div className="wrap">
        <SectionTitle icon={Cpu}>Skills and stack</SectionTitle>
        <div className="skills-grid">
          {skillGroups.map((g) => <SkillGroup key={g.title} {...g} />)}
        </div>
      </div>
    </section>
  );
}
