import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <header className="w-full bg-gray-900/40 backdrop-blur-xl text-gray-300 py-4 px-6 md:px-12 flex items-center justify-between border-b border-gray-700 relative">
      {/* Left: Clickable SkyForge Logo + Name */}
      <Link to="/skyforge" className="flex items-center gap-3 transition-opacity hover:opacity-80">
        <img src="/sflogo.png" alt="SkyForge Logo" className="w-12 h-12" />
        <h1 className="text-white text-2xl font-extrabold tracking-wide">SkyForge HQ</h1>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-10 text-lg font-medium">
        {[
          { name: "Home", path: "/skyforge" },
          { name: "About", path: "/about" },
          { name: "Changelog", path: "/changelog" },
          { name: "Products", path: "/products" },
        ].map((link) => (
          <Link 
            key={link.path} 
            to={link.path} 
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="p-2 focus:outline-none">
          <motion.svg
            className="w-7 h-7 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            initial={{ rotate: 0 }}
            animate={{ rotate: isMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </motion.svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 w-full bg-gray-900/90 backdrop-blur-md flex flex-col items-center py-5 space-y-5 md:hidden z-50"
          >
            {[
              { name: "About", path: "/about" },
              { name: "Changelog", path: "/changelog" },
              { name: "Products", path: "/products" },
            ].map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className="text-gray-300 hover:text-white transition-all"
                onClick={toggleMenu}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right: Feedback Button */}
      <div className="hidden md:flex gap-4">
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=admin@skyforgehq.com&su=SkyForge%20Feedback"
          target="_blank"
          rel="noopener noreferrer"
        >
          <motion.button
            className="px-6 py-2 bg-[#227cd1] text-white font-semibold rounded-lg shadow-md hover:bg-[#0056b3] transition-all"
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
