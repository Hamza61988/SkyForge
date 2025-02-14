import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="w-full bg-gray-900/20 backdrop-blur-md text-gray-300 py-2 px-4 md:px-10 flex items-center justify-between border-b border-gray-700/40 relative shadow-sm">
      {/* Left: Clickable SkyForge Logo + Name */}
      <Link to="/skyforge" className="flex items-center gap-3 group">
        <motion.img
          src="/sflogo.png"
          alt="SkyForge Logo"
          className="w-12 h-12 group-hover:scale-110 transition-transform duration-200"
        />
        <motion.h1
          className="text-white text-2xl font-extrabold tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          SkyForge HQ
        </motion.h1>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-10 text-lg font-medium">
        {[
          { name: "Home", path: "/skyforge" },
          { name: "About", path: "/about" },
          { name: "Changelog", path: "/changelog" },
          { name: "Products", path: "/products" },
        ].map((link) => (
          <motion.div
            key={link.path}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              to={link.path}
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              {link.name}
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="p-2 focus:outline-none">
          <motion.div
            animate={{ rotate: isMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMenuOpen ? (
              <X size={28} className="text-gray-300" />
            ) : (
              <Menu size={28} className="text-gray-300" />
            )}
          </motion.div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
            />

            {/* Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-64 bg-gray-900/95 backdrop-blur-xl shadow-lg flex flex-col items-center py-10 space-y-6 z-50"
            >
              {[
                { name: "About", path: "/about" },
                { name: "Changelog", path: "/changelog" },
                { name: "Products", path: "/products" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-gray-300 hover:text-white text-xl font-semibold transition-all"
                  onClick={toggleMenu}
                >
                  {link.name}
                </Link>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Right: Feedback Button */}
      <div className="hidden md:flex">
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=admin@skyforgehq.com&su=SkyForge%20Feedback"
          target="_blank"
          rel="noopener noreferrer"
        >
          <motion.button
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-400/40 hover:shadow-lg"
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
