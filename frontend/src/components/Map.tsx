import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import * as turf from "@turf/turf"; //  Import Turf.js for geodesic calculations

const API_KEY = import.meta.env.VITE_OPENCAGE_API_KEY; // OpenCage API for airport coordinates
const IVAO_CLIENT_ID = import.meta.env.VITE_IVAO_CLIENT_ID;
const IVAO_CLIENT_SECRET = import.meta.env.VITE_IVAO_CLIENT_SECRET;

interface AircraftData {
  callsign: string;
  latitude: number;
  longitude: number;
  altitude: number;
  ground_speed: number;
  departure: string;
  destination: string;
  heading: number;
  lastUpdated: number;
}

export default function Map({ callsign }: { callsign: string }) {
  const [aircraftData, setAircraftData] = useState<AircraftData | null>(null);
  const [route, setRoute] = useState<[number, number][]>([]);
  const [aircraftHeading, setAircraftHeading] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // 🛰 Fetch Airport Coordinates from OpenCage API
  const fetchAirportCoordinates = async (icao: string) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${icao}&key=${API_KEY}`
      );
      if (response.data.results.length > 0) {
        return {
          lat: response.data.results[0].geometry.lat,
          lon: response.data.results[0].geometry.lng,
        };
      }
    } catch (error) {
      console.error(`❌ Error fetching coordinates for ${icao}:`, error);
    }
    return null;
  };

  //  Fetch Aircraft Data from IVAO API
  const fetchAircraftData = useCallback(async () => {
    try {
      if (!callsign) return;
      console.log(`📡 Fetching real-time position for: ${callsign.toUpperCase()}`);
  
      setLoading(true);
  
      //  Get OAuth Token for IVAO API
      const tokenResponse = await axios.post("https://api.ivao.aero/v2/oauth/token", {
        grant_type: "client_credentials",
        client_id: IVAO_CLIENT_ID,
        client_secret: IVAO_CLIENT_SECRET,
      });
  
      const accessToken = tokenResponse.data.access_token;
  
      // 🔍 Fetch aircraft data
      const response = await axios.get("https://api.ivao.aero/v2/tracker/whazzup", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
  
      const pilots = response.data.clients.pilots;
      const aircraft = pilots.find(
        (ac: any) => ac.callsign.trim().toUpperCase() === callsign.trim().toUpperCase()
      );
  
      if (!aircraft) {
        console.warn(`⚠ No live data found for callsign: ${callsign}`);
        setAircraftData(null);
        setLoading(false);
        return;
      }
  
      console.log(" Live Aircraft Data:", aircraft);
  
      // ✈️ Update aircraft state
      const aircraftInfo: AircraftData = {
        callsign: aircraft.callsign,
        latitude: aircraft.lastTrack.latitude,
        longitude: aircraft.lastTrack.longitude,
        altitude: aircraft.lastTrack.altitude,
        ground_speed: aircraft.lastTrack.groundSpeed,
        departure: aircraft.flightPlan?.departureId || "Unknown",
        destination: aircraft.flightPlan?.arrivalId || "Unknown",
        heading: aircraft.lastTrack.heading || 0,
        lastUpdated: Date.now(),
      };
  
      setAircraftData(aircraftInfo);
  
      // 🛰 Fetch Great Circle Route and ensure it passes under aircraft
      if (aircraftInfo.departure !== "Unknown" && aircraftInfo.destination !== "Unknown") {
        generateGreatCircleRoute(
          aircraftInfo.departure,
          aircraftInfo.destination,
          aircraftInfo.latitude,
          aircraftInfo.longitude
        );
        calculateAircraftHeading(
          aircraftInfo.latitude,
          aircraftInfo.longitude,
          aircraftInfo.destination
        );
      }
  
      setLoading(false);
    } catch (error) {
      console.error("❌ Error fetching aircraft data:", error);
      setLoading(false);
    }
  }, [callsign]);

  //  Generate Great Circle Route Using Turf.js
  const generateGreatCircleRoute = async (
    departureICAO: string,
    destinationICAO: string,
    aircraftLat?: number,
    aircraftLon?: number
  ) => {
    console.log(`🗺️ Generating Great Circle Route from ${departureICAO} to ${destinationICAO}`);
  
    const depCoords = await fetchAirportCoordinates(departureICAO);
    const destCoords = await fetchAirportCoordinates(destinationICAO);
  
    if (!depCoords || !destCoords) {
      console.warn("⚠ Could not retrieve both airport coordinates.");
      setRoute([]);
      return;
    }
  
    //  Compute Great Circle Line
    const start = turf.point([depCoords.lon, depCoords.lat]);
    const end = turf.point([destCoords.lon, destCoords.lat]);
    const greatCircle = turf.greatCircle(start, end, { npoints: 50 });
  
    //  Ensure coordinates are `[number, number]`
    let routeCoords: [number, number][] = greatCircle.geometry.coordinates
      .map(coord => {
        if (Array.isArray(coord) && coord.length === 2 && typeof coord[0] === 'number' && typeof coord[1] === 'number') {
          return [coord[1], coord[0]]; // Swap lon/lat to lat/lon
        }
        return null;
      })
      .filter((coord): coord is [number, number] => coord !== null);
  
    //  Adjust route to enter and exit smoothly around the aircraft
    if (aircraftLat !== undefined && aircraftLon !== undefined) {
      console.log(`📍 Adjusting route to pass under aircraft at [${aircraftLat}, ${aircraftLon}]`);
  
      // Find the closest point on the route to the aircraft
      let nearestIndex = 0;
      let minDistance = Infinity;
      routeCoords.forEach((point, index) => {
        const distance = Math.sqrt(
          Math.pow(point[0] - aircraftLat, 2) + Math.pow(point[1] - aircraftLon, 2)
        );
        if (distance < minDistance) {
          minDistance = distance;
          nearestIndex = index;
        }
      });
  
      //  Ensure aircraft position and airports are correctly typed
      const aircraftPoint: [number, number] = [aircraftLat, aircraftLon];
      const departurePoint: [number, number] = [depCoords.lat, depCoords.lon];
      const destinationPoint: [number, number] = [destCoords.lat, destCoords.lon];
  
      // Create a new modified route: [Departure → Aircraft Position → Destination]
      const adjustedRoute: [number, number][] = [
        departurePoint, // Start at departure
        aircraftPoint, // Smoothly lead into the aircraft position
        destinationPoint // Directly continue to the destination
      ];
  
      
      setRoute(adjustedRoute);
    } else {
      setRoute(routeCoords); // Keep the original route if no aircraft data
    }
  };
  
  

  //  Calculate Heading from Aircraft to Destination
  const calculateAircraftHeading = async (
    aircraftLat: number,
    aircraftLon: number,
    destinationICAO: string
  ) => {
    const destCoords = await fetchAirportCoordinates(destinationICAO);
    if (!destCoords) return;

    const start = turf.point([aircraftLon, aircraftLat]);
    const end = turf.point([destCoords.lon, destCoords.lat]);
    const bearing = turf.bearing(start, end); //  Get bearing from aircraft to destination

    console.log(` Aircraft Bearing to Destination: ${bearing}°`);
    setAircraftHeading(bearing);
  };

  useEffect(() => {
    fetchAircraftData();
    const interval = setInterval(fetchAircraftData, 15500);
    return () => clearInterval(interval);
  }, [fetchAircraftData]);

  return (
    <div style={{ position: "relative", width: "100%", height: "400px" }}>
      {/* Loading Indicator */}
      {loading && (
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          padding: "10px",
          borderRadius: "8px",
          color: "white",
          fontSize: "16px",
          zIndex: 1000,
        }}>
          🛫 Loading Flight Data...
        </div>
      )}

      <MapContainer center={[20, 0]} zoom={3} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" />

        {!loading && route.length > 0 && (
          <Polyline positions={route} color="blue" weight={2.5} smoothFactor={1.5} />
        )}

        {!loading && aircraftData && (
          <Marker position={[aircraftData.latitude, aircraftData.longitude]} icon={L.divIcon({
            className: "aircraft-icon",
            html: `<div style="transform: rotate(${aircraftHeading}deg);">
              <img src="/planevector.png" style="width: 32px; height: 32px;" />
            </div>`,
            iconSize: [32, 32],
            iconAnchor: [16, 16],
          })}>
            <Popup><strong>{aircraftData.callsign}</strong></Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
