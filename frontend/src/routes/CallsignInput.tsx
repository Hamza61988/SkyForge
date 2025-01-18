import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import LoadingSpinner from "../components/LoadingSpinner";

export default function CallsignInput() {
  const [callsign, setCallsign] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const airport = searchParams.get("icao");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (callsign.trim().length > 2) {
      setLoading(true);
      setTimeout(() => {
        navigate(`/gate-assignment?icao=${airport}&callsign=${callsign}`);
      }, 2000); // Simulating API response delay
    } else {
      alert("Please enter a valid callsign.");
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-3xl">Controlled Airport: {airport}</h2>
      <p className="text-xl mt-2">Enter Aircraft Callsign</p>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <motion.form
          onSubmit={handleSubmit}
          className="mt-4 flex flex-col items-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <input
            type="text"
            placeholder="e.g., BAW123"
            value={callsign}
            onChange={(e) => setCallsign(e.target.value.toUpperCase())}
            className="px-4 py-2 rounded-lg text-black"
          />
          <motion.button
            type="submit"
            className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-700 text-white rounded-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Fetch Route
          </motion.button>
        </motion.form>
      )}
    </motion.div>
  );
}
