import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Map from "../components/Map";
import FloatingParticles from "../components/FloatingParticles";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKENDURL;

// Define Flight Plan Type
interface FlightPlan {
  departure: string;
  arrival: string;
  aircraft: string;
  route: string;
}

// Define Gate Type
interface Gate {
  ref: string;
  lat: number;
  lon: number;
}

// OpenCage API Key
const API_KEY = import.meta.env.VITE_OPENCAGE_API_KEY;

// Fetch coordinates using OpenCage API
const fetchCoordinates = async (airportICAO: string) => {
  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${airportICAO}&key=${API_KEY}`
    );

    if (response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry;
      return { lat, lng };
    }
  } catch (error) {
    console.error("❌ Error fetching coordinates:", error);
  }
  return null;
};

export default function CallsignInput() {
  const [callsign, setCallsign] = useState("");
  const [flightPlan, setFlightPlan] = useState<FlightPlan | null>(null);
  const [assignedGate, setAssignedGate] = useState("");
  const [gateLocation, setGateLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [searchParams] = useSearchParams();
  const airportICAO = searchParams.get("airport") || "No airport selected";

  // Assigns the closest gate at the destination airport
  const [assignedGates, setAssignedGates] = useState<{ [key: string]: Gate }>({}); // Store assigned gates

// Assigns the closest available gate for the callsign
const assignGate = async (arrivalICAO: string, callsign: string) => {
  if (arrivalICAO !== airportICAO) {
    setAssignedGate("Not arriving at this airport.");
    setGateLocation(null);
    return;
  }

  const gates: Gate[] = await fetchGates(arrivalICAO); // ✅ Ensure gates are typed

  if (!gates || gates.length === 0) {
    setAssignedGate("No gates found for this airport.");
    setGateLocation(null);
    return;
  }

  console.log("✅ Retrieved gates:", gates);

  // Check if this callsign already has an assigned gate
  if (assignedGates[callsign]) {
    console.log(`🛬 Callsign ${callsign} already has an assigned gate.`);
    setAssignedGate(`Gate ${assignedGates[callsign].ref}`);
    setGateLocation({ lat: assignedGates[callsign].lat, lon: assignedGates[callsign].lon });
    return;
  }

  // Find the closest **unassigned** gate
  const availableGate: Gate | undefined = gates.find(
    (gate: Gate) => !Object.values(assignedGates).some((assigned: Gate) => assigned.ref === gate.ref)
  );

  if (!availableGate) {
    console.warn("⚠ No available gates left!");
    setAssignedGate("All gates are occupied.");
    setGateLocation(null);
    return;
  }

  console.log(`🚪 Assigning Gate ${availableGate.ref} to Callsign ${callsign}`);

  // Save gate assignment
  setAssignedGates((prev) => ({ ...prev, [callsign]: availableGate }));

  setAssignedGate(`Gate ${availableGate.ref}`);
  setGateLocation({ lat: availableGate.lat, lon: availableGate.lon });
};



  // Fetches flight plan data for the given callsign
  const fetchFlightPlan = async () => {
    if (!callsign.trim()) {
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
        alert("Error: Unable to fetch flight data.");
        return;
      }
  
      console.log("✈️ Flight Data:", data);
  
      setFlightPlan({
        departure: data.departure || "Unknown",
        arrival: data.destination || "Unknown",
        aircraft: data.aircraft || "Unknown",
        route: data.route || "Route not available",
      });
  
      if (data.destination === airportICAO) {
        assignGate(data.destination, callsign); // ✅ Pass callsign for unique assignment
      } else {
        setAssignedGate("Not arriving at this airport.");
      }
    } catch (error) {
      console.error("❌ Error fetching flight plan:", error);
      alert("An error occurred while fetching the flight plan.");
    }
  };
  

  // Fetches available gates at the airport
  const fetchGates = async (airportICAO: string) => {
    try {
      const coordinates = await fetchCoordinates(airportICAO);
      if (!coordinates) {
        setAssignedGate("Unable to fetch coordinates for the airport.");
        return [];
      }

      const { lat, lng } = coordinates;
      const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node["aeroway"="gate"]["ref"](around:5000,${lat},${lng});out;`;

      console.log("🛰 Overpass API URL:", overpassUrl);

      const response = await axios.get(overpassUrl);

      if (!response.data || !response.data.elements || response.data.elements.length === 0) {
        setAssignedGate("No gate numbers found.");
        return [];
      }

      return response.data.elements.map((g: any) => ({
        ref: g.tags?.ref ?? "",
        lat: g.lat,
        lon: g.lon,
      }));
    } catch (error) {
      console.error("❌ Error fetching gates:", error);
      setAssignedGate("An unknown error occurred while fetching gates.");
      return [];
    }
  };

  return (
    <motion.div className="min-h-screen flex flex-col bg-[#0A0A0A] text-gray-300 relative px-6">
      <FloatingParticles />
      <Header />

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
            onChange={(e) => setCallsign(e.target.value.toUpperCase())}
            className="mt-4 px-4 py-2 w-full text-center text-white bg-gray-800 border border-gray-600 rounded-md shadow-md"
          />

          {/* Fetch Flight Plan Button */}
          <button onClick={fetchFlightPlan} className="mt-4 px-6 py-2 w-full rounded-md bg-blue-600 text-white">
            Fetch Flight Plan
          </button>

          {/* Flight Plan Details */}
          {flightPlan && (
            <div className="mt-4 p-4">
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
          {flightPlan ? <Map callsign={callsign.toUpperCase()} gateLocation={gateLocation} /> : <p className="text-gray-400">Enter a callsign to display the flight path.</p>}
        </div>
      </div>

      <Footer />
    </motion.div>
  );
}
