import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AirportSelection() {
  const [airport, setAirport] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (airport.trim().length === 4) {
      navigate(`/callsign?icao=${airport}`);
    } else {
      alert("Please enter a valid 4-letter ICAO code.");
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h2
        className="text-3xl"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Enter Controlled Airport ICAO
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        className="mt-4 flex flex-col items-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <input
          type="text"
          placeholder="e.g., EGLL"
          value={airport}
          onChange={(e) => setAirport(e.target.value.toUpperCase())}
          className="px-4 py-2 rounded-lg text-black"
          maxLength={4}
        />
        <motion.button
          type="submit"
          className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-700 text-white rounded-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Connect
        </motion.button>
      </motion.form>
    </motion.div>
  );
}
