import { motion } from "framer-motion";

export default function RadarBackground() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-stars">
      {/* Radar Grid */}
      <div className="absolute w-[80vw] h-[80vw] rounded-full border border-gray-600 opacity-10"></div>
      <div className="absolute w-[60vw] h-[60vw] rounded-full border border-gray-600 opacity-15"></div>
      <div className="absolute w-[40vw] h-[40vw] rounded-full border border-gray-600 opacity-20"></div>
      <div className="absolute w-[20vw] h-[20vw] rounded-full border border-gray-600 opacity-30"></div>

      {/* Sweeping Radar Beam */}
      <motion.div
        className="absolute w-[40vw] h-[40vw] rounded-full bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      ></motion.div>

      {/* Blinking Aircraft Blips */}
      <motion.div
        className="absolute w-4 h-4 bg-green-500 rounded-full opacity-0"
        initial={{ x: -100, y: -50 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>

      <motion.div
        className="absolute w-3 h-3 bg-green-400 rounded-full opacity-0"
        initial={{ x: 50, y: 100 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>
    </div>
  );
}
