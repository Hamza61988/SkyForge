import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import RadarBackground from "../components/RadarBackground";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function LandingPage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-[#0A0A0A] text-gray-100 font-sans overflow-hidden">
      {/* Background Animation */}
      <RadarBackground />

      {/* Header */}
      <Header />
      

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
          Gate Assignment Assistant for IVAO
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
