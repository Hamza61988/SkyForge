import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
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
}

const IVAO_CLIENT_ID = import.meta.env.VITE_IVAO_CLIENT_ID;
const IVAO_CLIENT_SECRET = import.meta.env.VITE_IVAO_CLIENT_SECRET;


function parseLatLonWaypoint(waypoint: string): [number, number] | null {
  const natRegex = /(\d{2})(N|S)(\d{3})(E|W)/;
  const match = waypoint.match(natRegex);
  if (!match) return null;

  let lat = parseInt(match[1], 10);
  let lon = parseInt(match[3], 10);

  if (match[2] === "S") lat = -lat;
  if (match[4] === "W") lon = -lon;

  console.log(`🌍 Parsed NAT Waypoint: ${waypoint} → [${lat}, ${lon}]`);
  return [lat, lon];
}

async function getWaypointCoordinates(waypoint: string, accessToken: string): Promise<[number, number] | null> {
  try {
    const response = await axios.get(`https://api.ivao.aero/v2/navaids/FIX?icao=${waypoint}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (response.data && response.data.items.length > 0) {
      return [response.data.items[0].latitude, response.data.items[0].longitude];
    }
  } catch (error) {
    console.warn(`⚠ No coordinates found for waypoint: ${waypoint}`);
  }
  return null;
}

export default function Map({ callsign }: { callsign: string }) {
  const [aircraftData, setAircraftData] = useState<AircraftData | null>(null);
  const [route, setRoute] = useState<[number, number][]>([]);
  const [loading, setLoading] = useState(true); // ✅ Added loading state

  useEffect(() => {
    if (!callsign) return;

    async function fetchAircraftData() {
      try {
        setLoading(true); // ✅ Show loading while fetching

        const tokenResponse = await axios.post("https://api.ivao.aero/v2/oauth/token", {
          grant_type: "client_credentials",
          client_id: IVAO_CLIENT_ID,
          client_secret: IVAO_CLIENT_SECRET,
        });

        const accessToken = tokenResponse.data.access_token;
        const response = await axios.get("https://api.ivao.aero/v2/tracker/whazzup", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const pilots = response.data.clients.pilots;
        const aircraft = pilots.find((ac: any) => ac.callsign.trim().toUpperCase() === callsign.trim().toUpperCase());
        if (!aircraft) return;

        setAircraftData({
          callsign: aircraft.callsign,
          latitude: aircraft.lastTrack.latitude,
          longitude: aircraft.lastTrack.longitude,
          altitude: aircraft.lastTrack.altitude,
          ground_speed: aircraft.lastTrack.groundSpeed,
          departure: aircraft.flightPlan?.departureId || "Unknown",
          destination: aircraft.flightPlan?.arrivalId || "Unknown",
          heading: aircraft.lastTrack.heading || 0,
        });

        if (aircraft.flightPlan?.route) {
          await fetchRouteWaypoints(aircraft.flightPlan.route, accessToken);
        }

        setLoading(false); // ✅ Hide loading when data is ready
      } catch (error) {
        console.error("❌ Error fetching aircraft data:", error);
        setLoading(false); // ✅ Hide loading on error
      }
    }

    fetchAircraftData();
    const interval = setInterval(fetchAircraftData, 17000);
    return () => clearInterval(interval);
  }, [callsign]);

  function findNearestPointOnRoute(lat: number, lon: number, route: [number, number][]) {
    let nearestPoint: [number, number] | null = null;
    let minDistance = Infinity;

    for (const [wpLat, wpLon] of route) {
      const distance = Math.sqrt((lat - wpLat) ** 2 + (lon - wpLon) ** 2);
      if (distance < minDistance) {
        minDistance = distance;
        nearestPoint = [wpLat, wpLon];
      }
    }

    return nearestPoint;
  }

  async function fetchRouteWaypoints(routeString: string, accessToken: string) {
    console.log("🔍 Extracting waypoints from route:", routeString);

    const waypoints = routeString.split(" ")
      .map(wp => wp.replace(/\/.*/, "")) // Remove altitudes/speeds
      .filter(wp => /^[A-Z0-9]+$/.test(wp) && wp !== "DCT")
      .filter((wp, index, self) => self.indexOf(wp) === index); // Remove duplicates

    console.log("📍 Parsed waypoints:", waypoints);

    let waypointCoords = await Promise.all(
      waypoints.map(async (wp) => parseLatLonWaypoint(wp) || await getWaypointCoordinates(wp, accessToken))
    );

    let filteredCoords = waypointCoords.filter((coord): coord is [number, number] => coord !== null);
    console.log("✅ Retrieved waypoint coordinates:", filteredCoords);

    let cleanedRoute: [number, number][] = [];
    for (let i = 0; i < filteredCoords.length; i++) {
      if (i === 0 || i === filteredCoords.length - 1 ||
        Math.sqrt((filteredCoords[i][0] - filteredCoords[i - 1][0]) ** 2 + (filteredCoords[i][1] - filteredCoords[i - 1][1]) ** 2) * 111 < 1500) {
        cleanedRoute.push(filteredCoords[i]);
      }
    }

    console.log("🛫 Final route coordinates:", cleanedRoute);
    setRoute(cleanedRoute);
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "400px" }}>
      {/* ✅ Loading indicator */}
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
        {!loading && route.length > 0 && <Polyline positions={route} color="red" weight={3} smoothFactor={1.5} />}

        {!loading && aircraftData && (
          (() => {
            const nearestPosition = findNearestPointOnRoute(
              aircraftData.latitude,
              aircraftData.longitude,
              route
            ) || [aircraftData.latitude, aircraftData.longitude];

            return (
              <Marker
                position={nearestPosition}
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
                <Popup><strong>{aircraftData.callsign}</strong></Popup>
              </Marker>
            );
          })()
        )}
      </MapContainer>
    </div>
  );
}