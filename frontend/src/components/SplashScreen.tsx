import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SkyForgeLogo from "/skyforgehq.svg";
import starsBackground from "/stars.png"; 

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
      onFinish();
    }, 5000);
  }, [onFinish]);

  return isVisible ? (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center text-white z-50 bg-black overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, delay: 3 }}
    >
      {/* Background Stars */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${starsBackground})`, 
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.4, 
        }}
        animate={{ scale: [1, 1.05, 1] }} // Subtle zoom effect
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />

      {/* Soft Radial Glow (Deep Space Effect) */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-[radial-gradient(circle,rgba(255,255,255,0.08)_5%,rgba(0,0,0,0)_90%)]"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />

      {/* Wormhole Expansion Effect */}
      <motion.div
        className="absolute w-48 h-48 bg-blue-500 opacity-20 rounded-full blur-3xl"
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: 1.8, opacity: 0.3 }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      />

      {/* SkyForge Logo */}
      <motion.img
        src={SkyForgeLogo}
        alt="SkyForge Logo"
        className="w-62 h-62 mb-6 drop-shadow-lg"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      {/* Slogan */}
      <motion.h1
        className="text-2xl font-semibold tracking-wide text-gray-300"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        style={{ textShadow: "0px 0px 8px rgba(0, 173, 255, 0.6)" }}
      >
        <span className="text-blue-400">Powering</span> virtual aviation
      </motion.h1>

      {/* Animated Radar Spinner */}
      <motion.div
        className="relative mt-6 w-14 h-14 flex items-center justify-center"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
      >
        <div className="absolute w-full h-full border-[2px] border-blue-500 rounded-full opacity-60" />
        <motion.div
          className="absolute w-3 h-3 bg-blue-500 rounded-full"
          initial={{ y: -6 }}
          animate={{ y: 6 }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  ) : null;
}
