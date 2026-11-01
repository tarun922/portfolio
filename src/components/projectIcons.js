import { Film, MessagesSquare, Clapperboard, Bot, Layers } from "lucide-react";

// Icon per project id. Add a line when you add a project.
const icons = { seeky: Film, buddy: MessagesSquare, "seeky-anim": Clapperboard, agent: Bot };
export const iconFor = (id) => icons[id] ?? Layers;
