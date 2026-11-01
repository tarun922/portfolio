import { Sparkles, Layers, Cpu, Mail, Zap } from "lucide-react";
import { profile } from "../data/profile.js";
import useActiveSection from "../hooks/useActiveSection.js";
import useLiteMode from "../hooks/useLiteMode.js";
import "./Header.css";

const links = [
  { id: "projects", label: "Projects", Icon: Layers },
  { id: "skills", label: "Skills", Icon: Cpu },
  { id: "contact", label: "Contact", Icon: Mail },
];
const ids = ["top", ...links.map((l) => l.id)];

export default function Header() {
  const active = useActiveSection(ids);
  const [lite, toggleLite] = useLiteMode();
  return (
    <header className="header">
      <a className="header-brand" href="#top"><Sparkles size={18} /> {profile.name}</a>
      <nav className="header-nav" aria-label="Sections">
        {links.map(({ id, label, Icon }) => (
          <a key={id} href={`#${id}`} className={active === id ? "is-active" : ""}>
            <Icon size={16} /><span>{label}</span>
          </a>
        ))}
        <button className="header-lite" onClick={toggleLite} aria-pressed={lite} title="Lite mode: turns off glass blur on slow devices">
          <Zap size={16} /><span>Lite</span>
        </button>
      </nav>
    </header>
  );
}
