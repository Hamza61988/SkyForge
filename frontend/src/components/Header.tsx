import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-gray-900/45 backdrop-blur-lg text-gray-300 py-3 px-4 md:px-10 flex items-center justify-between border-b border-gray-700 relative">
      {/* Left: Clickable SkyForge Logo + Name */}
      <Link to="/skyforge" className="flex items-center gap-3 hover:opacity-80 transition-all">
        <img src="/sflogo.png" alt="SkyForge Logo" className="w-10 h-10" />
        <h1 className="text-white text-2xl font-bold font-heading">SkyForge</h1>
      </Link>

      {/* Desktop Navigation - Hidden on Mobile */}
      <nav className="hidden md:flex gap-8 text-lg font-medium">
        <Link to="/skyforge" className="text-gray-300 hover:text-white transition-all">Home</Link>
        <Link to="/about" className="text-gray-300 hover:text-white transition-all">About</Link>
        <Link to="/changelog" className="text-gray-300 hover:text-white transition-all">Changelog</Link>
        <Link to="/products" className="text-gray-300 hover:text-white transition-all">Products</Link>
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="p-2 focus:outline-none">
          <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu - Hidden by Default */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-900/90 backdrop-blur-md flex flex-col items-center py-4 space-y-4 md:hidden z-50">
          <Link to="/about" className="text-gray-300 hover:text-white transition-all" onClick={toggleMenu}>About</Link>
          <Link to="/changelog" className="text-gray-300 hover:text-white transition-all" onClick={toggleMenu}>Changelog</Link>
          <Link to="/products" className="text-gray-300 hover:text-white transition-all" onClick={toggleMenu}>Products</Link>
        </div>
      )}

      {/* Right: Join Button & Feedback Button (Always Visible) */}
      <div className="hidden md:flex gap-4">
        <Link to="/join">
          <motion.button
            className="px-5 py-2 bg-[#FF3131] text-white font-semibold rounded-lg shadow-md hover:bg-[#E02626] transition-all font-sans"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join
          </motion.button>
        </Link>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=your-email@gmail.com&su=SkyForge%20Feedback"
          target="_blank"
          rel="noopener noreferrer"
        >
          <motion.button
            className="px-5 py-2 bg-[#007BFF] text-white font-semibold rounded-lg shadow-md hover:bg-[#0056b3] transition-all font-sans"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Give Your Feedback
          </motion.button>
        </a>
      </div>
    </header>
  );
}
