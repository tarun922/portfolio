import SeekyArt from "./art/SeekyArt.jsx";
import BuddyArt from "./art/BuddyArt.jsx";
import AnimArt from "./art/AnimArt.jsx";
import AgentArt from "./art/AgentArt.jsx";

const arts = { seeky: SeekyArt, buddy: BuddyArt, "seeky-anim": AnimArt, agent: AgentArt };

// Generated artwork, shown until a real screenshot exists.
export default function ProjectArt({ project }) {
  const Art = arts[project.id] ?? SeekyArt;
  const gid = `art-${project.id}`;
  return (
    <svg viewBox="0 0 800 500" role="img" aria-label={`${project.name} artwork`} style={{ color: project.accent, display: "block", width: "100%" }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity=".6" />
          <stop offset="1" stopColor="#15122b" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill={`url(#${gid})`} />
      <Art />
      <text x="40" y="465" fill="#f6f3ff" fontSize="40" fontWeight="700" fontFamily="Unbounded, system-ui, sans-serif">
        {project.name}
      </text>
    </svg>
  );
}
