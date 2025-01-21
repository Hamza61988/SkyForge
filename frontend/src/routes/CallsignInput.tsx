import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer"; // Using Footer component
import Map from "../components/Map"; // Flight route map
import FloatingParticles from "../components/FloatingParticles"; // Background animation
import axios from "axios"; // For making requests

const API_URL = import.meta.env.VITE_BACKENDURL;

// Define Flight Plan Type


interface FlightPlan {
  departure: string;
  arrival: string;
  aircraft: string;
  route: string;
}

// OpenCage API Key (Replace with your key if needed)
const API_KEY = import.meta.env.VITE_OPENCAGE_API_KEY;

// Function to fetch coordinates using OpenCage API
const fetchCoordinates = async (airportICAO: string) => {
  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${airportICAO}&key=${API_KEY}`
    );

    if (response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry;
      return { lat, lng };
    } else {
      throw new Error("Coordinates not found.");
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
};

export default function CallsignInput() {
  const [callsign, setCallsign] = useState("");
  const [flightPlan, setFlightPlan] = useState<FlightPlan | null>(null);
  const [assignedGate, setAssignedGate] = useState("");
  const [searchParams] = useSearchParams();
  const airportICAO = searchParams.get("airport") || "No airport selected"; // Get ICAO from URL

  // ✅ Move assignGate function above fetchFlightPlan to avoid "used before assigned" error
  const assignGate = async (arrivalICAO: string) => {
    if (arrivalICAO !== airportICAO) {
      setAssignedGate("Not arriving at this airport.");
      return;
    }

    const gates = await fetchGates(arrivalICAO);

    if (gates.length === 0) {
      setAssignedGate("No gate numbers found for this airport.");
      return;
    }

    // Find a gate that has a **gate number (`ref` tag)**
    const gateWithNumber = gates.find((g: any) => g.tags && g.tags.ref && /^\d+$/.test(g.tags.ref));

    if (gateWithNumber) {
      setAssignedGate(`Gate ${gateWithNumber.tags.ref}`);
    } else {
      setAssignedGate("No numeric gate numbers available.");
    }
  };

  const fetchFlightPlan = async () => {
    if (!callsign.trim()) {
      console.error("❌ No callsign entered.");
      alert("Please enter a callsign before fetching flight data.");
      return;
    }

    try {
      console.log(`📡 Fetching flight plan for callsign: ${callsign.toUpperCase()}`);

      const response = await axios.get(`${API_URL}/api/aircraft/${callsign.toUpperCase()}`);

      if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = response.data;

      if (!data) {
        console.error("❌ API response is empty.");
        alert("Error: Unable to fetch flight data.");
        return;
      }

      console.log("✅ Flight Plan Data:", data);

      setFlightPlan({
        departure: data.departure || "Unknown",
        arrival: data.destination || "Unknown",
        aircraft: data.aircraft || "Unknown",
        route: data.route || "Route not available"
      });

      // ✅ Now `assignGate` is defined before being used, fixing the error
      if (data.destination === airportICAO) {
        assignGate(data.destination);
      } else {
        setAssignedGate("Not arriving at this airport.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("❌ Error fetching flight plan:", error);
        alert(`Error fetching flight plan: ${error.message}`);
      } else {
        console.error("❌ An unknown error occurred:", error);
        alert("An unknown error occurred while fetching the flight plan.");
      }
    }
  };

  const fetchGates = async (airportICAO: string) => {
    try {
      const coordinates = await fetchCoordinates(airportICAO);

      if (!coordinates) {
        setAssignedGate("Unable to fetch coordinates for the airport.");
        return [];
      }

      const { lat, lng } = coordinates;

      // Overpass API Query to fetch gate numbers (`ref` tag)
      const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node["aeroway"="gate"]["ref"](around:5000,${lat},${lng});out;`;
      console.log("Overpass API URL:", overpassUrl);

      const response = await axios.get(overpassUrl);

      console.log("Overpass API Response:", response.data);

      if (response.data && response.data.elements) {
        return response.data.elements;
      } else {
        setAssignedGate("No gate numbers found.");
        return [];
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("❌ Error fetching gates:", error);
        setAssignedGate(`Error fetching gates: ${error.message}`);
      } else {
        console.error("❌ An unknown error occurred:", error);
        setAssignedGate("An unknown error occurred while fetching gates.");
      }
      return [];
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col bg-[#0A0A0A] text-gray-300 relative px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Floating Particles Background */}
      <FloatingParticles />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-grow px-4 md:px-8 py-6 mt-16">
        {/* Left Panel: Flight Dispatch Information */}
        <div className="w-full md:w-2/5 bg-gray-900/50 backdrop-blur-md rounded-lg shadow-lg p-6 border border-gray-700">
          <h1 className="text-3xl font-bold text-white">Ground Dispatch</h1>

          <p className="mt-2 text-gray-400 text-center md:text-left">
            Selected Airport: <span className="text-white font-bold">{airportICAO}</span>
          </p>

          {/* Callsign Input Field */}
          <input
            type="text"
            placeholder="Enter Callsign (e.g., BAW123)"
            value={callsign}
            onChange={(e) => {
              const input = e.target.value.toUpperCase();
              setCallsign(input);
              if (!input) console.warn("❌ Callsign is empty! API call will fail.");
            }}
            className="mt-4 px-4 py-2 w-full text-center text-white bg-gray-800 border border-gray-600 rounded-md shadow-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 ease-in-out"
          />

          {/* Fetch Flight Plan Button */}
          <button
            onClick={fetchFlightPlan}
            className="mt-4 px-6 py-2 w-full rounded-md bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-lg"
          >
            Fetch Flight Plan
          </button>

          {/* Flight Plan Details */}
          {flightPlan && (
            <div className="mt-4 bg-gray-20 p-4 rounded-md text-sm">
              <p><strong>Departure:</strong> {flightPlan.departure}</p>
              <p><strong>Arrival:</strong> {flightPlan.arrival}</p>
              <p><strong>Aircraft:</strong> {flightPlan.aircraft}</p>
              <p><strong>Route:</strong> {flightPlan.route}</p>
              <p><strong>Assigned Gate:</strong> {assignedGate}</p>
            </div>
          )}
        </div>

        {/* Right Panel: Interactive Map */}
        <div className="w-3/5 flex justify-center items-center pl-6">
          {flightPlan ? <Map callsign={callsign.toUpperCase()} /> : <p className="text-gray-400">Enter a callsign to display the flight path.</p>}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
}
