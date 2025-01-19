import { Link } from "react-router-dom";
import { FaDiscord, FaGithub, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900/45 backdrop-blur-lg text-gray-300 py-3 px-10 flex justify-between items-center border-t border-gray-700 text-sm">
      {/* Left: Clickable SkyForge Branding */}
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-all">
          <img src="/sflogo.png" alt="SkyForge Logo" className="w-8 h-8" />
          <h2 className="text-md font-semibold">SkyForge</h2>
        </Link>
      </div>

      {/* Center: Copyright */}
      <div className="text-xs text-gray-400">
        © 2025 SkyForge. All rights reserved.
      </div>

      {/* Right: Social Media & Email Icons */}
      <div className="flex gap-5 text-lg">
        <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-all">
          <FaDiscord />
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-all">
          <FaGithub />
        </a>
        <a href="mailto:contact@skyforge.com" className="hover:text-red-400 transition-all">
          <FaEnvelope />
        </a>
      </div>
    </footer>
  );
}
