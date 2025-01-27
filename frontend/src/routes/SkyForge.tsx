import React from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/skyforge-glow.css";

gsap.registerPlugin(ScrollTrigger);

const SkyForgeLanding: React.FC = () => {
  return (
    <div
      className="relative flex flex-col min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/2387877/pexels-photo-2387877.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Header />

      {/* Hero Section with Left Alignment & Advanced Animations */}
      <div className="flex flex-row justify-between items-center px-16 py-20 relative z-10">
        <motion.div
          className="flex flex-col items-start text-left max-w-2xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-6xl font-extrabold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
          >
            Welcome to <span className="sky-glow">Sky</span>
            <span className="forge-glow">Forge</span>
          </motion.h1>
          <motion.p
            className="text-xl max-w-3xl mb-8 leading-relaxed text-gray-300 drop-shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            SkyForge is an innovation hub for aviation enthusiasts and ATC
            controllers, dedicated to developing cutting-edge simulation tools.
          </motion.p>
          <motion.a
            href="/join"
            className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-400 hover:scale-105 transition-all duration-300 rounded-lg shadow-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.8 }}
          >
            Join SkyForge Team
          </motion.a>
        </motion.div>
        <motion.div
          className="w-1/2 flex justify-center items-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src="/home-animation.svg"
            alt="SkyForge Animation"
            className="max-w-md w-full h-auto"
          />
        </motion.div>
      </div>

      {/* Additional Scrollable Content with Advanced Animations */}
      <motion.div
        className="py-24 px-16 text-left"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <h2 className="text-5xl font-bold mb-8 leading-[1.4] text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-red-600">
          Advanced Features - Coming Soon
        </h2>
        <p className="text-lg max-w-3xl text-gray-200 mb-12 leading-relaxed">
          Explore our upcoming suite of aviation tools designed to revolutionize
          flight simulation and ATC operations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Brand New Flight Dispatch",
              desc: "An improved dispatch system that integrates real-time flight data, automated gate assignments, and a modern UI.",
            },
            {
              title: "Pilot's Dashboard - The Ultimate Tracking Hub",
              desc: "A personalized hub for pilots to track flight history, review statistics, and compete globally.",
            },
            {
              title: "Advanced Airbus Performance Suite",
              desc: "Realistic takeoff, landing, and in-flight performance calculations for high-fidelity Airbus aircraft.",
            },
            {
              title: "SkyForge: AeroLab Forum",
              desc: "A community hub for aviation, engineering, and science discussions among pilots and enthusiasts.",
            },
            {
              title: "ATC Trainning Hub",
              desc: "A progressive learning system for aspiring virtual and real-world ATC controllers, covering from basics to advanced radar control.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="p-8 bg-gray-900 border border-gray-800 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 1 }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                {item.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* RunwayLink Section - Enhanced Styling */}
      <motion.div
        className="py-24 px-16 text-center bg-gray-900 bg-opacity-60 rounded-lg shadow-lg mx-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <h2 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
          Next in Line: RunwayLink
        </h2>
        <p className="text-lg max-w-3xl mx-auto text-gray-300 mb-6 leading-relaxed">
          RunwayLink is designed to help IVAO ATC operators by enhancing gate
          assignments and ground handling. Our mission is to streamline airport
          operations with real-time data and automation.
          <br />
          <br />
          This is an early version, so expect some bugs! Your feedback is
          valuable to us as we continue to improve and expand its capabilities.
        </p>
        <motion.a
          href="/landingpage"
          className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-red-500 to-yellow-400 hover:scale-105 transition-all duration-300 rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8 }}
        >
          Learn More About RunwayLink
        </motion.a>
      </motion.div>

      <Footer />
    </div>
  );
};

export default SkyForgeLanding;
