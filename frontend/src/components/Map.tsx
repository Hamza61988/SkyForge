import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

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

const IVAO_CLIENT_ID = import.meta.env.VITE_IVAO_CLIENT_ID;
const IVAO_CLIENT_SECRET = import.meta.env.VITE_IVAO_CLIENT_SECRET;

export default function Map({ callsign }: { callsign: string }) {
  const [aircraftData, setAircraftData] = useState<AircraftData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAircraftData = useCallback(async () => {
    try {
      if (!callsign) return;
      console.log(`📡 Fetching real-time position for: ${callsign.toUpperCase()}`);

      setLoading(true);

      // 🔑 Get OAuth Token for IVAO API
      const tokenResponse = await axios.post("https://api.ivao.aero/v2/oauth/token", {
        grant_type: "client_credentials",
        client_id: IVAO_CLIENT_ID,
        client_secret: IVAO_CLIENT_SECRET,
      });

      const accessToken = tokenResponse.data.access_token;

      // 🔍 Fetch the aircraft based on the callsign
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

      console.log("✅ Live Aircraft Data:", aircraft);

      // ✈️ Update aircraft state
      setAircraftData({
        callsign: aircraft.callsign,
        latitude: aircraft.lastTrack.latitude,
        longitude: aircraft.lastTrack.longitude,
        altitude: aircraft.lastTrack.altitude,
        ground_speed: aircraft.lastTrack.groundSpeed,
        departure: aircraft.flightPlan?.departureId || "Unknown",
        destination: aircraft.flightPlan?.arrivalId || "Unknown",
        heading: aircraft.lastTrack.heading || 0,
        lastUpdated: Date.now(),
      });

      setLoading(false);
    } catch (error) {
      console.error("❌ Error fetching aircraft data:", error);
      setLoading(false);
    }
  }, [callsign]);

  useEffect(() => {
    fetchAircraftData(); // Fetch data immediately on mount
    const interval = setInterval(fetchAircraftData, 15500); // Update every 15.5 seconds
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
        <TileLayer
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors'
        />

        {!loading && aircraftData && (
          <Marker
            position={[aircraftData.latitude, aircraftData.longitude]}
            icon={L.divIcon({
              className: "aircraft-icon",
              html: `<div style="
                transform: rotate(${aircraftData.heading}deg);
                display: flex; align-items: center; justify-content: center;
              ">
                <img src="/planevector.png" style="width: 32px; height: 32px;" />
              </div>`,
              iconSize: [32, 32],
              iconAnchor: [16, 16],
            })}
          >
            <Popup>
              <strong>{aircraftData.callsign}</strong> <br />
              Altitude: {aircraftData.altitude} ft <br />
              Speed: {aircraftData.ground_speed} kts
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
