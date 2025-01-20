import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/skyforge-glow.css";

const SkyForgeLanding: React.FC = () => {
  return (
    <div className="relative flex flex-col min-h-screen bg-black text-white overflow-hidden">
      <Header />

      {/* Hero Section */}
      <motion.div 
        className="flex flex-col items-center justify-center flex-grow text-center px-6 py-20 relative z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1 
          className="text-6xl font-extrabold mb-6 drop-shadow-lg leading-tight skyforge-glow"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          <span className="text-white">Welcome to </span>
          <span className="sky-glow">Sky</span>
          <span className="forge-glow">Forge</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl max-w-3xl mb-8 leading-relaxed text-gray-100 drop-shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          SkyForge is an innovation hub for aviation enthusiasts and air traffic controllers, dedicated to creating cutting-edge tools and technologies that enhance realism in flight simulation.
        </motion.p>
      </motion.div>

      {/* Background Effects */}
      <div className="background-container">
        <div className="stars"></div>
        <div className="nebula"></div>
        <div className="particles"></div>
      </div>

      {/* Call to Action */}
      <motion.div 
        className="flex justify-center pb-20 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8 }}
      >
        <a href="/join" className="px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all duration-300 rounded-lg shadow-lg">
          Join SkyForge
        </a>
      </motion.div>

      {/* Features Section */}
      <motion.div className="flex flex-col items-center py-20 px-6 text-center" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <h2 className="text-4xl font-bold mb-6 text-white">What We Create</h2>
        <p className="text-lg max-w-3xl text-gray-100 mb-12">SkyForge develops advanced tools for flight simulation, focusing on automation, realism, and improved user experience.</p>
      </motion.div>

      {/* RunwayLink Development Section */}
      <motion.div className="bg-gray-900 py-20 text-center px-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
        <h2 className="text-4xl font-bold mb-6 text-white">RunwayLink: Enhancing IVAO Operations</h2>
        <p className="text-lg max-w-3xl text-gray-100 mb-12 mx-auto">RunwayLink is an advanced gate assignment and traffic management tool for IVAO ATC controllers. It enables automated aircraft gate assignments, real-time position tracking, and seamless integration with IVAO’s live network.</p>
      </motion.div>

      {/* Future Projects Section */}
      <motion.div className="flex flex-col items-center py-20 px-6 text-center" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <h2 className="text-4xl font-bold mb-6 text-white">Upcoming Innovations</h2>
        <p className="text-lg max-w-3xl text-gray-100 mb-12">SkyForge is expanding beyond RunwayLink, building future projects designed to elevate flight simulation.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-white">Virtual Airline Hub</h3>
            <p className="text-gray-100">A dedicated system for VAs to manage flights, track pilots, and enhance operations.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-white">ATC Simulation Training</h3>
            <p className="text-gray-100">An interactive environment to train ATCOs with real-world scenarios and AI-driven traffic.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-white">Real-Time Weather System</h3>
            <p className="text-gray-100">A hyper-realistic weather engine (web-app integrated) integrating real-world METAR and AI-generated turbulence.</p>
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default SkyForgeLanding;
