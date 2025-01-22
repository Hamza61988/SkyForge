import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import * as turf from "@turf/turf"; // Import Turf.js for geodesic calculations

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

export default function Map({ callsign, gateLocation }: { callsign: string; gateLocation?: { lat: number; lon: number } | null }) {
  const [aircraftData, setAircraftData] = useState<AircraftData | null>(null);
  const [route, setRoute] = useState<[number, number][]>([]);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<L.Map | null>(null);

  // Fetch Airport Coordinates
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

  // Fetch Aircraft Data from IVAO API
  const fetchAircraftData = useCallback(async () => {
    try {
      if (!callsign) return;
      setLoading(true);

      // Get OAuth Token
      const tokenResponse = await axios.post("https://api.ivao.aero/v2/oauth/token", {
        grant_type: "client_credentials",
        client_id: IVAO_CLIENT_ID,
        client_secret: IVAO_CLIENT_SECRET,
      });

      const accessToken = tokenResponse.data.access_token;

      // Fetch aircraft data
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

      // Update aircraft state
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

      // Fetch Great Circle Route
      if (aircraftInfo.departure !== "Unknown" && aircraftInfo.destination !== "Unknown") {
        generateGreatCircleRoute(
          aircraftInfo.departure,
          aircraftInfo.destination,
          aircraftInfo.latitude,
          aircraftInfo.longitude
        );
      }

      setLoading(false);
    } catch (error) {
      console.error("❌ Error fetching aircraft data:", error);
      setLoading(false);
    }
  }, [callsign]);

  // Generate Great Circle Route
  const generateGreatCircleRoute = async (
    departureICAO: string,
    destinationICAO: string,
    aircraftLat?: number,
    aircraftLon?: number
  ) => {
    console.log(`🗺️ Generating Route from ${departureICAO} to ${destinationICAO} via aircraft position`);
  
    const depCoords = await fetchAirportCoordinates(departureICAO);
    const destCoords = await fetchAirportCoordinates(destinationICAO);
  
    if (!depCoords || !destCoords) {
      console.warn("⚠ Could not retrieve both airport coordinates.");
      setRoute([]);
      return;
    }
  
    const departurePoint: [number, number] = [depCoords.lat, depCoords.lon];
    const destinationPoint: [number, number] = [destCoords.lat, destCoords.lon];
  
    if (aircraftLat === undefined || aircraftLon === undefined) {
      // 🛑 If no aircraft data, use a standard Great Circle Route
      const start = turf.point([depCoords.lon, depCoords.lat]);
      const end = turf.point([destCoords.lon, destCoords.lat]);
      const greatCircle = turf.greatCircle(start, end, { npoints: 100 });
  
      const routeCoords: [number, number][] = greatCircle.geometry.coordinates
        .map(coord => [coord[1], coord[0]] as [number, number]); // 🔧 Ensure proper formatting
  
      setRoute(routeCoords);
      return;
    }
  
    console.log(`📍 Adjusting route to pass under aircraft at [${aircraftLat}, ${aircraftLon}]`);
  
    // ✅ Smooth curve from departure to aircraft
    const smoothedEntry: [number, number][] = [
      [(departurePoint[0] * 0.7 + aircraftLat * 0.3), (departurePoint[1] * 0.7 + aircraftLon * 0.3)] as [number, number],
      [(departurePoint[0] * 0.4 + aircraftLat * 0.6), (departurePoint[1] * 0.4 + aircraftLon * 0.6)] as [number, number],
    ];
  
    // ✅ Smooth curve from aircraft to destination
    const smoothedExit: [number, number][] = [
      [(aircraftLat * 0.6 + destinationPoint[0] * 0.4), (aircraftLon * 0.6 + destinationPoint[1] * 0.4)] as [number, number],
      [(aircraftLat * 0.3 + destinationPoint[0] * 0.7), (aircraftLon * 0.3 + destinationPoint[1] * 0.7)] as [number, number],
    ];
  
    // ✅ Construct final smooth route
    const adjustedRoute: [number, number][] = [
      departurePoint,
      ...smoothedEntry,
      [aircraftLat, aircraftLon] as [number, number],
      ...smoothedExit,
      destinationPoint,
    ];
  
    console.log(`✅ Final adjusted route is smooth and direct.`);
    setRoute(adjustedRoute);
  };
  
  
  
  


  useEffect(() => {
    fetchAircraftData();
    const interval = setInterval(fetchAircraftData, 15500);
    return () => clearInterval(interval);
  }, [fetchAircraftData]);

  useEffect(() => {
    if (!gateLocation || !mapRef.current) return;

    console.log(`📍 Assigned gate detected: ${gateLocation.lat}, ${gateLocation.lon}`);
    mapRef.current.flyTo([gateLocation.lat, gateLocation.lon], 18, { animate: true, duration: 1.5 });
  }, [gateLocation]);

  return (
    <div style={{ position: "relative", width: "100%", height: "400px" }}>
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

      <MapContainer
        center={[20, 0]}
        zoom={3}
        style={{ height: "100%", width: "100%" }}
        ref={mapRef}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="© OpenAIP"
          maxZoom={19}
        />

        {!loading && route.length > 0 && (
          <Polyline positions={route} color="blue" weight={2.5} smoothFactor={1.5} />
        )}

{!loading && aircraftData && (
  <Marker
    position={[aircraftData.latitude, aircraftData.longitude]}
    icon={L.divIcon({
      className: "aircraft-icon",
      html: `<div style="transform: rotate(${aircraftData.heading || 0}deg);">
        <img src="/planevector.png" style="width: 32px; height: 32px;" />
      </div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16], // Centers the aircraft icon properly
    })}
  >
    <Popup>
      <strong>{aircraftData.callsign}</strong><br />
      Altitude: {aircraftData.altitude.toLocaleString()} ft<br />
      Ground Speed: {aircraftData.ground_speed} kt
    </Popup>
  </Marker>
)}

        {gateLocation && (
          <Marker
            position={[gateLocation.lat, gateLocation.lon]}
            icon={L.divIcon({
              className: "gate-marker",
              html: `<div style="
                width: 8px;
                height: 8px;
                background-color: red;
                border-radius: 50%;
                border: 2px solid white;
                box-shadow: 0px 0px 6px rgba(255, 0, 0, 0.8);
              "></div>`,
              iconSize: [8, 8],
              iconAnchor: [4, 4],
            })}
          />
        )}
      </MapContainer>
    </div>
  );
}
