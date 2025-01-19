import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingParticles from "../components/FloatingParticles";
import airportsData from "../data/airports.json"; // Local dataset

// Define Airport Type
interface Airport {
  ident: string; // ICAO Code
  name: string;  // Airport Name
}

// Ensure TypeScript knows airportsData is an array of Airport objects
const airports: Airport[] = airportsData as Airport[];

export default function AirportSelection() {
  const [icao, setIcao] = useState("");
  const [suggestions, setSuggestions] = useState<Airport[]>([]);
  const navigate = useNavigate();

  // Filter Airport Suggestions Based on Input
  useEffect(() => {
    if (icao.length >= 2) {
      const filteredAirports = airports
        .filter((airport) => airport.ident.toUpperCase().startsWith(icao.toUpperCase()))
        .slice(0, 5); // Show top 5 suggestions

      setSuggestions(filteredAirports);
    } else {
      setSuggestions([]);
    }
  }, [icao]);

  const handleSelectAirport = (selectedIcao: string) => {
    setIcao(selectedIcao);
    setSuggestions([]);
  };

  const handleSubmit = () => {
    if (icao.length === 4) {
      navigate(`/callsigninput?airport=${icao.toUpperCase()}`);
    } else {
      alert("Please enter a valid 4-letter ICAO code.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-gray-300 relative">
      {/* Floating Particles Background */}
      <FloatingParticles />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow px-6 text-center relative z-10">
        {/* Title */}
        <motion.h1
          className="text-5xl font-extrabold text-white tracking-wide font-heading"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Select Your Airport
        </motion.h1>

        {/* Input Field */}
        <div className="relative mt-6">
          <motion.input
            type="text"
            maxLength={4}
            placeholder="Enter ICAO (e.g., EGLL)"
            value={icao}
            onChange={(e) => setIcao(e.target.value.toUpperCase())}
            className="px-4 py-3 w-80 text-center text-black rounded-lg shadow-md outline-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          />

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <ul className="absolute z-10 bg-white text-black w-80 mt-1 rounded-lg shadow-md overflow-hidden">
              {suggestions.map((airport, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelectAirport(airport.ident)}
                >
                  {airport.ident} - {airport.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          onClick={handleSubmit}
          className="mt-6 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Confirm Airport
        </motion.button>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
