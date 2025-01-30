import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Map from "../../components/Map";
import FloatingParticles from "../../components/FloatingParticles";
import axios from "axios";
import { useEffect } from "react";

const API_URL =
  import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, "") ||
  "https://skyforgehq.com/api";

console.log("🛠 API_URL:", API_URL);

// Define Flight Plan Type
interface FlightPlan {
  departure: string;
  arrival: string;
  aircraft: string | Aircraft;
  route: string;
}

interface Aircraft {
  icaoCode: string;
  model: string;
  wakeTurbulence: string;
  isMilitary: boolean;
  description: string;
}

// Define Gate Type
interface Gate {
  ref: string;
  lat: number;
  lon: number;
  operator?: string | null;
  type?: string;
  size?: string;
}

const coordinatesCache: { [icao: string]: { lat: number; lon: number } } = {};

export const fetchCoordinates = async (airportICAO: string) => {
  if (coordinatesCache[airportICAO]) {
    console.log(`🔄 Using cached coordinates for ${airportICAO}`);
    return coordinatesCache[airportICAO];
  }

  try {
    const response = await axios.get(
      `https://secure.geonames.org/searchJSON?q=${airportICAO}&featureClass=S&featureCode=AIRP&maxRows=1&username=${
        import.meta.env.VITE_GEONAMES_USERNAME
      }`
    );

    if (response.data.geonames.length > 0) {
      const { lat, lng } = response.data.geonames[0];
      coordinatesCache[airportICAO] = {
        lat: parseFloat(lat),
        lon: parseFloat(lng),
      }; // Store in cache
      return coordinatesCache[airportICAO];
    }

    console.warn(
      `⚠ No valid coordinates found for ${airportICAO} (not an airport?)`
    );
  } catch (error) {
    console.error(
      "❌ Error fetching airport coordinates from GeoNames:",
      error
    );
  }

  return null;
};

export default function CallsignInput() {
  const [callsign, setCallsign] = useState("");
  const [flightPlan, setFlightPlan] = useState<FlightPlan | null>(null);
  const [assignedGate, setAssignedGate] = useState("");
  const [gateLocation, setGateLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [searchParams] = useSearchParams();
  const airportICAO = searchParams.get("airport") || "No airport selected";

  const [allGates, setAllGates] = useState<Gate[]>([]); // Store all gates
  const [occupiedGates, setOccupiedGates] = useState<{ [key: string]: Gate }>(
    {}
  ); // Store occupied gates

  // Assigns the closest available gate for the callsign
  const releaseGate = (callsign: string) => {
    if (occupiedGates[callsign]) {
      setOccupiedGates((prev) => {
        const newGates = { ...prev };
        delete newGates[callsign]; // Remove the gate assignment
        return newGates;
      });

      setActiveAircraft((prev) => {
        const newAircraft = { ...prev };
        delete newAircraft[callsign]; // Remove from active list
        return newAircraft;
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      for (const callsign of Object.keys(occupiedGates)) {
        try {
          const response = await axios.get(
            `${API_URL}/api/aircraft/${callsign.toUpperCase()}`
          );

          if (response.status === 200 && response.data) {
            console.log(`Aircraft ${callsign} is still active.`);
            setActiveAircraft((prev) => ({ ...prev, [callsign]: true }));
          } else {
            console.log(
              `⚠ Aircraft ${callsign} is no longer in IVAO data. Releasing gate.`
            );
            releaseGate(callsign);
          }
        } catch (error) {
          console.warn(`⚠ Error checking aircraft ${callsign}:`, error);
        }
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [occupiedGates]);

  const getNextGate = (stands: Gate[]): Gate | undefined => {
    if (stands.length === 0) return undefined;

    // Shuffle the stands array to randomize the selection
    const shuffledStands = [...stands];
    for (let i = shuffledStands.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledStands[i], shuffledStands[j]] = [
        shuffledStands[j],
        shuffledStands[i],
      ]; // Swap elements
    }

    // Select the first available stand from the shuffled list
    return shuffledStands[0];
  };

  const assignParkingStand = async (
    arrivalICAO: string,
    callsign: string,
    aircraftType: string,
    departureICAO: string
  ): Promise<void> => {
    if (!arrivalICAO || arrivalICAO === "Unknown") {
      console.warn(`⚠ Invalid arrival ICAO for ${callsign}`);
      setAssignedGate("Invalid flight plan destination.");
      setGateLocation(null);
      return;
    }
  
    if (arrivalICAO !== airportICAO) {
      console.warn(`⚠ Aircraft ${callsign} is NOT arriving at ${airportICAO}`);
      setAssignedGate("Not arriving at this airport.");
      setGateLocation(null);
      return;
    }
  
    const gates: Gate[] = await fetchParkingStandsFromOSM(arrivalICAO);
    if (!gates || gates.length === 0) {
      console.warn(`⚠ No gates found at ${arrivalICAO}.`);
      setAssignedGate("No gates found.");
      setGateLocation(null);
      return;
    }
  
    setAllGates(gates);
    console.log(`Checking gates based on departure: ${departureICAO}`);
    // Extract airline code from callsign
    const airlineCode = callsign.substring(0, 3).toUpperCase();
  
    // Define Aircraft Categories
    const aircraftCategories: { [key: string]: string } = {
      A320: "narrow",
      A319: "narrow",
      A321: "narrow",
      B737: "narrow",
      B738: "narrow",
      A380: "wide",
      B747: "wide",
      B777: "wide",
      B787: "wide",
      A350: "wide",
      CRJ900: "regional",
      E190: "regional",
      E175: "regional",
    };
  
    const category = aircraftCategories[aircraftType] || "narrow";
  
    // Filter gates based on aircraft size category
    let eligibleGates = gates.filter(gate => gate.size === category);
  
    if (eligibleGates.length === 0) {
      console.warn(`⚠ No available gates for aircraft size: ${category}. Expanding criteria.`);
      eligibleGates = gates.filter(gate =>
        (category === "narrow" && gate.size === "wide") ||
        (category === "regional" && gate.size === "narrow")
      );
    }
  
    // Apply airline restrictions
    let airlineSpecificGates = eligibleGates.filter(gate => gate.operator && gate.operator.includes(airlineCode));
  
    if (airlineSpecificGates.length > 0) {
      eligibleGates = airlineSpecificGates;
    }
  
    // Get next available gate
    const availableGate = getNextGate(
      eligibleGates.filter(gate => !Object.values(occupiedGates).some(g => g.ref === gate.ref))
    );
  
    if (!availableGate) {
      console.warn("⚠ No available gates matching criteria.");
      setAssignedGate("All gates are occupied.");
      setGateLocation(null);
      return;
    }
  
    setOccupiedGates(prev => ({
      ...prev,
      [callsign]: availableGate,
    }));
  
    setAssignedGate(`Gate ${availableGate.ref}`);
    setGateLocation({ lat: availableGate.lat, lon: availableGate.lon });
  
    console.log(`✅ Assigned gate ${availableGate.ref} to ${callsign}`);
  };
  

  const [activeAircraft, setActiveAircraft] = useState<{
    [key: string]: boolean;
  }>({});
  useEffect(() => {}, [activeAircraft]);
  // Fetches flight plan data for the given callsign
  const fetchFlightPlan = async () => {
    if (!callsign.trim()) {
      alert("Please enter a callsign before fetching flight data.");
      return;
    }

    try {
      const response = await axios.get(
        `${API_URL}/api/aircraft/${callsign.toUpperCase()}`
      );
      console.log("Full API Response:", response.data); // Debugging

      if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = response.data;
      if (!data) {
        alert("Error: Unable to fetch flight data.");
        return;
      }

      // Ensure Aircraft Type is Properly Set
      const aircraftType =
        data.aircraft && typeof data.aircraft === "string"
          ? data.aircraft
          : "Unknown";

      setFlightPlan({
        departure: data.departure || "Unknown",
        arrival: data.destination || "Unknown",
        aircraft: aircraftType,
        route: data.route || "Route not available",
      });

      if (data.destination === airportICAO) {
        assignParkingStand(
          data.destination,
          callsign,
          aircraftType,
          data.departure
        );
      } else {
        setAssignedGate("Not arriving at this airport.");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching flight plan:", error.message);
        if (error.response?.status === 404) {
          alert(`⚠ Aircraft '${callsign}' not found.`);
        } else if (error.response?.status === 500) {
          alert("🚨 Internal Server Error. Try again later.");
        } else {
          alert(`An error occurred: ${error.message}`);
        }
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred.");
      }
    }
  };

  // Fetches available gates at the airport
  const fetchParkingStandsFromOSM = async (airportICAO: string): Promise<Gate[]> => {
    try {
      const coordinates = await fetchCoordinates(airportICAO);
      if (!coordinates) {
        console.error(`No coordinates found for ${airportICAO}`);
        return [];
      }
  
      const { lat, lon } = coordinates;
      console.log(`📡 Fetching gates for ${airportICAO} at [${lat}, ${lon}]`);
  
      // Modified Overpass Query to Fetch Only Gates
      const overpassQuery = `
        [out:json];
        (
          node["aeroway"="gate"](around:5000, ${lat}, ${lon});
        );
        out body;
      `;
  
      const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;
      console.log(`🔗 Overpass Query URL: ${overpassUrl}`);
  
      const response = await axios.get(overpassUrl, { timeout: 10000 });
  
      if (!response.data?.elements?.length) {
        console.warn(`⚠ No gates found for ${airportICAO}.`);
        return [];
      }
  
      console.log(`✅ Found ${response.data.elements.length} gates at ${airportICAO}`);
  
      return response.data.elements
        .map((p: any) => ({
          ref: p.tags?.ref ?? p.id ?? "Unknown",
          lat: p.lat || (p.center?.lat ?? null),
          lon: p.lon || (p.center?.lon ?? null),
          operator: p.tags?.operator || null,
          type: p.tags?.stand_type || "standard",
          size: p.tags?.size || (p.tags?.stand_type?.includes("heavy") ? "wide" : "narrow"),
        }))
        .filter((gate: Gate) => gate.lat !== null && gate.lon !== null); // Ensure valid coordinates
    } catch (error) {
      console.error(`❌ Error fetching gates for ${airportICAO}:`, error);
      return [];
    }
  };

  return (
    <motion.div className="min-h-screen flex flex-col bg-[#0A0A0A] text-gray-300 relative w-full">
      <FloatingParticles />
      <Header />

      <div className="flex flex-col md:flex-row flex-grow px-4 md:px-8 py-6 mt-16">
        {/* Left Panel: Flight Dispatch Information */}
        <div className="w-full md:w-2/5 bg-gray-900/50 backdrop-blur-md rounded-lg shadow-lg p-6 border border-gray-700">
          <h1 className="text-3xl font-bold text-white">Ground Dispatch</h1>

          <p className="mt-2 text-gray-400 text-center md:text-left">
            Selected Airport:{" "}
            <span className="text-white font-bold">{airportICAO}</span>
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
          <button
            onClick={fetchFlightPlan}
            className="mt-4 px-6 py-2 w-full rounded-md bg-blue-600 text-white"
          >
            Fetch Flight Plan
          </button>

          {/* Flight Plan Details */}
          {flightPlan && (
            <div className="mt-4 p-4">
              <p>
                <strong>Departure:</strong> {flightPlan.departure}
              </p>
              <p>
                <strong>Arrival:</strong> {flightPlan.arrival}
              </p>
              <p>
                <strong>Aircraft:</strong>
                {typeof flightPlan.aircraft === "object"
                  ? `${flightPlan.aircraft.model} (${flightPlan.aircraft.icaoCode})`
                  : flightPlan.aircraft}
              </p>
              <p>
                <strong>Route:</strong> {flightPlan.route}
              </p>
              <p>
                <strong>Assigned Gate:</strong> {assignedGate}
              </p>
            </div>
          )}
        </div>

        {/* Right Panel: Interactive Map */}
        <div className="w-3/5 flex justify-center items-center pl-6">
          {flightPlan ? (
            <Map
              callsign={callsign.toUpperCase()}
              gateLocation={gateLocation}
              allGates={allGates} //  Pass all gates
              occupiedGates={occupiedGates} //  Pass occupied gates
              assignedGate={"assignedGate"}
            />
          ) : (
            <p className="text-gray-400">
              Enter a callsign to display the flight path.
            </p>
          )}
        </div>
      </div>

      <Footer />
    </motion.div>
  );
}
