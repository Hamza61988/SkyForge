import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";


export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-gray-300">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow px-6 text-center">
        {/* Title */}
        <motion.h1
          className="text-6xl font-extrabold text-white tracking-wide font-heading"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="text-pink-600 drop-shadow-[0_0_7px_rgba(255,105,180,0.6)]">Sky</span>
          <span className="text-blue-400 drop-shadow-[0_0_7px_rgba(135,206,250,0.6)]">Force</span>   
          
         </motion.h1>

        {/* Description */}
        <motion.p
          className="max-w-3xl text-lg mt-6 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <strong>SkyForge</strong> is an independent aviation technology project dedicated to developing 
          innovative tools for IVAO and flight simulation. Our mission is to enhance virtual ATC operations 
          and streamline pilot interactions by providing smart automation, powerful utilities, and enhanced user experiences.  
          From RunwayLink for gate assignments to future projects expanding beyond IVAO, SkyForge is committed to improving 
          the world of online aviation simulation with cutting-edge solutions.
        </motion.p>

        {/* Buttons */}
        <div className="flex gap-6 mt-8">
          {/* Join SkyForge Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/join">
              <button className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg">
                Join SkyForge
              </button>
            </Link>
          </motion.div>

          {/* Feature Ideas Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/feature-ideas">
              <button className="px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold shadow-lg">
                Feature Ideas
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
