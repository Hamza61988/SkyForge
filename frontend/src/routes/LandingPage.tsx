import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-700 text-white">
      {/* Animate the SkyForge logo */}
      <motion.h1
        className="text-6xl font-extrabold"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        SkyForge
      </motion.h1>

      {/* Animate the subtitle */}
      <motion.p
        className="text-2xl mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Welcome to RunwayLink
      </motion.p>

      {/* Animate the button */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Link to="/select-airport">
          <button className="mt-6 px-6 py-3 bg-white text-blue-700 font-bold rounded-lg shadow-lg hover:bg-gray-200 transition-all">
            Enter RunwayLink
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
