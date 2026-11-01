import { Code2, Boxes, Wrench, BrainCircuit } from "lucide-react";
import GlassCard from "./GlassCard.jsx";

const icons = { code: Code2, boxes: Boxes, tools: Wrench, brain: BrainCircuit };

export default function SkillGroup({ title, icon, items }) {
  const Icon = icons[icon] ?? Code2;
  return (
    <GlassCard className="skillgroup" max={5}>
      <h3><Icon size={20} /> {title}</h3>
      <ul>
        {items.map((s) => <li key={s}>{s}</li>)}
      </ul>
    </GlassCard>
  );
}
