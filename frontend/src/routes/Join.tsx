import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const Join: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
        <motion.h1 
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Join SkyForge
        </motion.h1>
        <motion.p 
          className="text-lg max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          As SkyForge is a new project, I am the only person developing all the features and managing everything. 
          If you are interested in joining, it doesn't matter what role you would like to take—any help is welcome! 
          From software development to public management, your contribution would be greatly appreciated.
        </motion.p>
      </div>
      <Footer />
    </div>
  );
};

export default Join;
