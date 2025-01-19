import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import RadarBackground from "../components/RadarBackground";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-[#0A0A0A] text-gray-100 font-sans overflow-hidden">
      {/* Background Animation */}
      <RadarBackground />

      {/* Header */}
      <header className="absolute top-0 left-0 w-full flex items-center justify-between px-10 py-4 bg-gray-900/45 backdrop-blur-lg shadow-lg font-sans">
        {/* Left: SkyForge Logo + Name */}
        <div className="flex items-center gap-3">
          <img src="/sflogo.png" alt="SkyForge Logo" className="w-10 h-10" />
          <h1 className="text-white text-2xl font-bold font-heading">SkyForge</h1>
        </div>

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

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <motion.h1
          className="text-7xl font-extrabold text-white tracking-wide font-heading relative z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          RunwayLink
        </motion.h1>

        {/* Updated Subtitle */}
        <motion.p
          className="text-lg mt-4 text-gray-300 tracking-wide font-sans relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Gate Assignment Assistant for Aurora
        </motion.p>

        {/* Enter RunwayLink Button (Smaller + Gradient) with Fade-in & Pulsing Glow */}
        <Link to="/select-airport">
          <motion.div
            className="relative mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            {/* Soft Pulsing Glow Effect */}
            <motion.div
              className="absolute inset-0 w-full h-full rounded-lg bg-blue-500 opacity-20 blur-2xl"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>

            {/* Actual Button */}
            <motion.button
              className="relative px-6 py-3 text-md font-semibold rounded-lg bg-gradient-to-r from-[#0D1B2A] to-[#1B263B] text-white shadow-lg hover:from-[#1B263B] hover:to-[#415A77] transition-all font-sans"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Enter RunwayLink
            </motion.button>
          </motion.div>
        </Link>
      </div>

      {/* Footer (Fixed at Bottom) */}
      <Footer />
    </div>
  );
}
