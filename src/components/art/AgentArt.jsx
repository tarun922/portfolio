// A network of nodes around a core: an agent talking to many providers.
const nodes = [[160, 120], [650, 110], [120, 330], [680, 320], [400, 70], [400, 380]];

export default function AgentArt() {
  return (
    <g>
      {nodes.map(([x, y]) => (
        <line key={`l${x}${y}`} x1="400" y1="225" x2={x} y2={y} stroke="currentColor" strokeOpacity=".5" strokeWidth="3" />
      ))}
      {nodes.map(([x, y]) => (
        <g key={`n${x}${y}`}>
          <circle cx={x} cy={y} r="30" fill="#15122b" stroke="currentColor" strokeWidth="4" />
          <circle cx={x} cy={y} r="9" fill="currentColor" />
        </g>
      ))}
      <circle cx="400" cy="225" r="80" fill="currentColor" fillOpacity=".25" />
      <circle cx="400" cy="225" r="54" fill="currentColor" />
      <path d="M375 232 L395 212 L395 226 L425 226 L405 246 L405 232 Z" fill="#15122b" />
    </g>
  );
}
