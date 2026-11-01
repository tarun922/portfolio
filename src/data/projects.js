// One entry per project. `accent` colors the whole Projects section when selected.
// Screenshots are NOT listed here: drop them in src/assets/projects/<id>/ (folder name = id).
// TODO: replace the descriptions with your own wording.
export const projects = [
  {
    id: "seeky",
    name: "Seeky",
    tagline: "Anime and movie discovery that loads fast.",
    description:
      "A web app for finding and watching anime and movies, hosted as a static site on GitHub Pages.",
    accent: "#ff5fa2",
    tags: ["JavaScript", "HTML", "GitHub Pages"],
    repo: "https://github.com/tarun922/seeky",
    live: "https://tarun922.github.io/seeky/",
  },
  {
    id: "buddy",
    name: "Buddy.live",
    tagline: "A companion that is always on.",
    description:
      "A powerfull agentic friend that can do every task on ur pc write code , stories , study with him ",
    accent: "#3ddc97",
    tags: ["Node.js", "React", "AI","Electron"],
    repo: "https://github.com/tarun922/Buddy.live",
    live: "",
  },
  {
    id: "seeky-anim",
    name: "Seeky.Anim",
    tagline: "Anime-style animation tooling, in the browser.",
    description:
      "An animation project deployed on Vercel. Add what it renders, exports or composites.",
    accent: "#8b7cff",
    tags: ["React", "TypeScript", "Vercel"],
    repo: "https://github.com/tarun922/Seeky.Anim",
    live: "https://seeky-anim.vercel.app/",
  },
  {
    id: "Tusna.ai",
    name: "Agent",
    tagline: "A powerful multi-provider agent, in the spirit of Meta Muse.",
    description:
      "An autonomous agent that works across inference providers. Add its real name, repo and live link.",
    accent: "#ffb347",
    tags: ["Node.js", "OpenAI SDK", "OpenRouter"],
    repo: "",
    live: "",
  },
];
