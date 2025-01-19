import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer"; // Using Footer component
import Map from "../components/Map"; // Flight route map
import FloatingParticles from "../components/FloatingParticles"; // Background animation
import axios from "axios"; // For making requests

const API_URL = import.meta.env.VITE_BACKEND_URL;

fetch(`${API_URL}/your-endpoint`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error fetching data:", error));

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

  // Fetch the flight plan using IVAO Whazzup API
  const fetchFlightPlan = async () => {
    if (!callsign) return;
  
    try {
      console.log("Fetching flight plan for callsign:", callsign.toUpperCase());
  
      const response = await fetch("https://api.ivao.aero/v2/tracker/whazzup");
  
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
  
      const data = await response.json();
  
      if (!data || !data.clients || !data.clients.pilots) {
        console.error("API response does not contain 'pilots'. Full response:", data);
        alert("Error: Unable to fetch flight data. IVAO API might be down.");
        return;
      }
  
      console.log("Total Flights Fetched:", data.clients.pilots.length);
  
      const pilotData = data.clients.pilots.find(
        (pilot: any) => pilot.callsign.toUpperCase() === callsign.toUpperCase()
      );
  
      if (pilotData && pilotData.flightPlan) {
        console.log("Flight Plan Found:", pilotData.flightPlan);
  
        const flightInfo = {
          departure: pilotData.flightPlan.departureId || "Unknown",
          arrival: pilotData.flightPlan.arrivalId || "Unknown",
          aircraft: pilotData.flightPlan.aircraft.icaoCode || "Unknown",
          route: pilotData.flightPlan.route || "Route not available"
        };
  
        setFlightPlan(flightInfo);
  
        if (flightInfo.arrival === airportICAO) {
          assignGate(flightInfo.arrival);
        } else {
          setAssignedGate("Not arriving at this airport.");
        }
      } else {
        console.warn("Flight plan not found for callsign:", callsign.toUpperCase());
        alert("Flight plan not found. Ensure the aircraft is online and has a flight plan.");
      }
    } catch (error) {
      console.error("Error fetching flight plan:", error);
      alert("Error fetching flight plan. Please check your internet connection or try again later.");
    }
  };

  // Fetch the gates for the destination airport using OpenStreetMap (OSM)
  const fetchGates = async (airportICAO: string) => {
    try {
      const coordinates = await fetchCoordinates(airportICAO);
  
      if (!coordinates) {
        setAssignedGate("Unable to fetch coordinates for the airport.");
        return [];
      }
  
      const { lat, lng } = coordinates;
  
      // Updated Overpass API Query to fetch **ONLY gate numbers** (`ref` tag)
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
    } catch (error) {
      console.error("Error fetching gates:", error);
      setAssignedGate("Error fetching gates.");
      return [];
    }
  };

  // Assign a gate based on **gate numbers (`ref` tag)**
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
      <div className="flex flex-grow px-8 py-6 mt-16">
        {/* Left Panel: Flight Dispatch Information */}
        <div className="w-2/5 bg-gray-900/50 backdrop-blur-md rounded-lg shadow-lg p-6 h-auto min-h-[450px] border border-gray-700">
          <h1 className="text-3xl font-bold text-white">Ground Dispatch</h1>

          <p className="mt-2 text-gray-400">
            Selected Airport: <span className="text-white font-bold">{airportICAO}</span>
          </p>
          {/* Callsign Input Field */}
          <input
            type="text"
            placeholder="Enter Callsign (e.g., BAW123)"
            value={callsign}
            onChange={(e) => setCallsign(e.target.value.toUpperCase())}
            className="mt-4 px-4 py-2 w-full text-center text-white bg-gray-800 border border-gray-600 
                      rounded-md shadow-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                      transition-all duration-300 ease-in-out"
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
          {flightPlan ? (
            <Map departure={flightPlan.departure} arrival={flightPlan.arrival} />
          ) : (
            <p className="text-gray-400">Enter a callsign to display the flight path.</p>
          )}
        </div>

      </div>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
}
