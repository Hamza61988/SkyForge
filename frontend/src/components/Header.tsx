import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 w-full flex items-center justify-between px-10 py-4 bg-gray-900/45 backdrop-blur-lg shadow-lg font-sans">
      {/* Left: Clickable SkyForge Logo + Name */}
      <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-all">
        <img src="/sflogo.png" alt="SkyForge Logo" className="w-10 h-10" />
        <h1 className="text-white text-2xl font-bold font-heading">SkyForge</h1>
      </Link>

      {/* Centered Navigation Buttons */}
      <nav className="absolute left-1/2 transform -translate-x-1/2 flex gap-8 text-lg font-medium">
        <Link to="/about" className="text-gray-300 hover:text-white transition-all">About</Link>
        <Link to="/changelog" className="text-gray-300 hover:text-white transition-all">Changelog</Link>
        <Link to="/products" className="text-gray-300 hover:text-white transition-all">Products</Link>
      </nav>

      {/* Right: Join Button */}
      <Link to="/join">
        <motion.button
          className="px-5 py-2 bg-[#FF3131] text-white font-semibold rounded-lg shadow-md hover:bg-[#E02626] transition-all font-sans"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Join
        </motion.button>
      </Link>
    </header>
  );
}
