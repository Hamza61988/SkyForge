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
    <div className="relative flex flex-col min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden">
      <Header />
      {/* Hero Section */}
      <div className="flex flex-row justify-between items-center px-16 py-20 relative z-10">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/2 w-[200px] h-[200px] bg-pink-500 blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-[100px] h-[100px] bg-red-500 blur-2xl opacity-30 animate-pulse"></div>

          <div className="absolute inset-0 flex justify-center items-center"></div>
          <div className="w-full h-full overflow-hidden relative">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-20"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `floatAnimation ${
                    Math.random() * 5 + 5
                  }s ease-in-out infinite`,
                }}
              />
            ))}
          </div>
        </div>
        <motion.div
          className="flex flex-col items-start text-left max-w-2xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-6xl font-extrabold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
          >
            Welcome to{" "}
            <motion.span
              className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-blue-500 to-blue-600 drop-shadow-[0_0_20px_rgba(200,200,200,0.7)]"
              animate={{
                scale: [1, 1.45, 1], // Increased pulsing for better visibility
                opacity: [1, 0.85, 1], // Subtle fading effect
                y: [0, -5, 0], // Moves up slightly (-5px) and back
              }}
              transition={{
                duration: 2, // Smooth effect
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              SkyForge
            </motion.span>
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
              title: "ATC Training Hub",
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

      {/* MRC Section - Work in Progress */}
      <motion.div
        className="relative py-20 px-10 text-center bg-gradient-to-b from-gray-900 via-gray-800 to-black backdrop-blur-xl rounded-xl shadow-xl mx-8 border border-gray-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <h2 className="text-5xl font-bold leading-snug text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-700 to-green-900">
          Next in Development: Multifunctional Radar Combination (MRC) for
          IVAO'S Special Ops Trainning
        </h2>
        <p className="text-lg max-w-3xl mx-auto text-gray-300 mb-10 leading-relaxed">
          SkyForge is working on the <strong>next generation</strong> of radar
          systems for <strong>Special Operations</strong>. <strong>MRC</strong>{" "}
          is designed to deliver precision, automation, and real-time
          intelligence for pilots, bringing the most advanced training
          capabilities to IVAO.
        </p>

        {/* Larger Image Section */}
        <div className="flex justify-center gap-8 mb-12">
          <motion.img
            src="/mrc.png"
            alt="MRC Radar Display"
            className="w-[500px] h-auto rounded-lg shadow-lg border-none bg-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          />
        </div>

        {/* Two-Row Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              title: "Real-Time Radar Tracking",
              desc: "Advanced radar with high-fidelity aircraft positioning, dynamic route updates, and optimized visibility control.",
            },
            {
              title: "Mission-Based Training",
              desc: "Create and simulate high-intensity operational scenarios",
            },
            {
              title: "IFF (Identification Friend or Foe)",
              desc: "Differentiates between friendly, neutral, and hostile aircraft",
            },
            {
              title: "Multi-Range Scanning",
              desc: "Supports short-, medium-, and long-range modes.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="p-6 bg-gray-800 bg-opacity-40 border border-gray-700 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:shadow-blue-500/50 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 1 }}
            >
              <h4 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {item.title}
              </h4>
              <p className="text-gray-300 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <p className="text-lg text-gray-400 mt-12">
          MRC is currently under early development, and we're working hard to
          bring this technolgy to IVAO's SO as a <strong>3rd party app</strong>,
          this is NOT officially supported by IVAO. Stay tuned for updates!
        </p>
      </motion.div>
      {/* Join SkyForge Team Section */}
      <div className="relative py-24 px-12 text-center bg-gray-900 bg-opacity-90 backdrop-blur-xl rounded-2xl shadow-2xl mx-8 border border-gray-800 mt-16">
        <h2 className="text-6xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 drop-shadow-lg">
          Join SkyForge Team
        </h2>
        <p className="text-xl max-w-3xl mx-auto text-gray-300 mt-6 leading-relaxed">
          Become part of the most innovative aviation development hub! Whether
          you're a developer, designer, or aviation enthusiast, SkyForge is the
          place to bring your ideas to life.
        </p>
        <motion.a
          href="/join"
          className="inline-block mt-10 px-12 py-5 text-xl font-bold text-white bg-gradient-to-r from-blue-300 via-blue-500 to-blue-900 hover:from-blue-300 hover:via-blue-400 hover:to-blue-500 hover:shadow-[0_0_25px_rgba(255,190,88,0.9)] transition-all duration-300 ease-out transform rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          Apply Now
        </motion.a>
      </div>

      <Footer />
    </div>
  );
};

export default SkyForgeLanding;
