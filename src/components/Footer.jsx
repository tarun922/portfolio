import { profile } from "../data/profile.js";
import GithubIcon from "./GithubIcon.jsx";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <span>© {new Date().getFullYear()} {profile.name}</span>
      <a href={profile.portfolioRepo} target="_blank" rel="noreferrer"><GithubIcon size={16} /> View source</a>
    </footer>
  );
}
