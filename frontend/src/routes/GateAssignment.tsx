import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import LoadingSpinner from "../components/LoadingSpinner";

export default function GateAssignment() {
  const [searchParams] = useSearchParams();
  const airport = searchParams.get("icao");
  const callsign = searchParams.get("callsign");

  const [loading, setLoading] = useState(true);
  const [assignedGate, setAssignedGate] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setAssignedGate(`Gate ${Math.floor(Math.random() * 50) + 1}`);
      setLoading(false);
    }, 2500); // Simulating data fetching delay
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-3xl">Gate Assignment</h2>
      <p className="text-xl mt-2">Airport: {airport}</p>
      <p className="text-xl">Callsign: {callsign}</p>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <motion.div
          className="mt-6 p-4 bg-gray-700 rounded-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-2xl">{assignedGate}</p>
        </motion.div>
      )}
    </motion.div>
  );
}
