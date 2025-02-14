import { Link } from "react-router-dom";
import { FaDiscord, FaGithub, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900/50 backdrop-blur-xl text-gray-300 py-6 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between border-t border-gray-800">
      {/* Branding Section */}
      <div className="flex items-center gap-3 mb-4 md:mb-0">
        <Link to="/" className="flex items-center gap-3 group transition-all">
          <img src="/sflogo.png" alt="SkyForge Logo" className="w-9 h-9 drop-shadow-lg" />
          <h2 className="text-lg font-semibold text-gray-300 group-hover:text-blue-400 transition-all">
            SkyForge
          </h2>
        </Link>
      </div>

      {/* Center: Copyright */}
      <div className="text-xs text-gray-400 text-center md:text-left">
        © 2025 SkyForge. All rights reserved.
      </div>

      {/* Social Media Icons */}
      <div className="flex gap-6 text-xl mt-4 md:mt-0">
        <a href="https://discord.gg/AzRncugA" target="_blank" rel="noopener noreferrer" 
          className="text-gray-400 hover:text-blue-500 hover:scale-110 transition-all drop-shadow-lg">
          <FaDiscord />
        </a>
        <a href="https://github.com/SpaceMikha" target="_blank" rel="noopener noreferrer"
          className="text-gray-400 hover:text-gray-300 hover:scale-110 transition-all drop-shadow-lg">
          <FaGithub />
        </a>
        <a href="mailto:admin@skyforgehq.com"
          className="text-gray-400 hover:text-red-400 hover:scale-110 transition-all drop-shadow-lg">
          <FaEnvelope />
        </a>
      </div>
    </footer>
  );
}
