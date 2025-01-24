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
        backgroundImage: "url('/sky.jpg')",
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
            Join SkyForge
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
        className="py-20 px-16 text-left"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <h2 className="text-4xl font-bold mb-6 text-white">
          Advanced Features - soon to come
        </h2>
        <p className="text-lg max-w-3xl text-gray-100 mb-12">
          Explore our suite of aviation tools designed to revolutionize flight
          simulation.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Brand New Flight Dispach",
              desc: "A redesigned and improved flight dispatch system that provides a seamless experience for  pilots. It integrates real-time flight data, automated gate assignments, and a modern UI for enhanced operational efficiency.",
            },
            {
              title: "Pilot's Dashboard - The Ultimate Flight Tracking & Competitive Aviation Hub",
              desc: "This system will act as a personalized flight hub, allowing pilots to review flight history, track statistics, improve skills, and compete against others globally.",
            },
            {
              title: "Advanced Airbus Performance Suite (For Fenix, FSLabs, Aerosoft, etc.)",
              desc: "An advanced Airbus aircraft performance tool designed for realistic takeoff, landing, and in-flight performance calculations. Built specifically for Fenix A320, FSLabs, Aerosoft, and other high-fidelity Airbus simulations, this system provides accurate data-driven performance metrics, fuel calculations, and real-time aircraft optimization to enhance flight operations.",
            },
            {
              title: "SkyForge: AeroLab Forum - The Aviation & Science Hub",
              desc: "SkyForge: AeroLab Forum is a next-generation forum designed for pilots, flight simmers, engineers, and enthusiasts. It's a place to collaborate, experiment, and push the boundaries of aviation, engineering and science.",
            },
            {
              title: "Structured ATC Training",
              desc: "Structured ATC Training is an organized, progressive learning system designed for aspiring virtual and real-world air traffic controllers (ATC). It provides a step-by-step training path, covering everything from basic phraseology to advanced radar control.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="p-6 bg-gray-900 border border-gray-700 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:border-blue-500 hover:shadow-blue-500/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.3, duration: 1 }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-white">
                {item.title}
              </h3>
              <p className="text-gray-100">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* New RunwayLink Section - Enhanced Styling */}
      <motion.div
        className="py-20 px-16 text-center bg-gray-900 bg-opacity-50 rounded-lg shadow-lg mx-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
          Next in Line: RunwayLink
        </h2>
        <p className="text-lg max-w-3xl mx-auto text-gray-300 mb-6">
          RunwayLink is meant to help IVAO ATC Operators, enhancing gate
          assignments and ground handling. Our mission is to streamline airport
          operations with real-time data and smart automation.<br></br>
          Be our guest and check the first verision of Runway Link. this is an
          very early version of this product so expect some bugs. Please share
          your feedback with us so we can improve and add more features :)
        </p>
        <motion.a
          href="/landingpage"
          className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-red-500 to-yellow-400 hover:scale-105 transition-all duration-300 rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8 }}
        >
          Learn More About Runway Link
        </motion.a>
      </motion.div>

      <Footer />
    </div>
  );
};

export default SkyForgeLanding;
