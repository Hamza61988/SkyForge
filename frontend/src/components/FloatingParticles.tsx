import { motion } from "framer-motion";

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100 + "vw",
  y: Math.random() * 100 + "vh",
}));

export default function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-2 h-2 bg-white rounded-full opacity-50 shadow-lg"
          style={{ left: p.x, top: p.y }}
          animate={{
            y: ["-10vh", "110vh"],
            opacity: [0.1, 0.7, 0.1],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: Math.random() * 15 + 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
