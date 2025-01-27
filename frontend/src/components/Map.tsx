import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  CircleMarker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import * as turf from "@turf/turf";
import { fetchCoordinates } from "../../src/routes/runwaylink/CallsignInput";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api"; // Fallback to localhost if env variable is missing

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

export default function Map({
  callsign,
  gateLocation,
  allGates,
  occupiedGates,
}: {
  callsign: string;
  gateLocation?: { lat: number; lon: number } | null;
  allGates: { ref: string; lat: number; lon: number }[];
  occupiedGates: { [key: string]: { ref: string; lat: number; lon: number } };
}) {
  const [aircraftData, setAircraftData] = useState<AircraftData | null>(null);
  const [route, setRoute] = useState<[number, number][]>([]);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<L.Map | null>(null);

  // Fetch Airport Coordinates

  const prevCallsign = useRef<string | null>(null);

  // Fetch Aircraft Data from IVAO API
  const fetchAircraftData = useCallback(async () => {
    if (!callsign) return;

    // Skip fetching if callsign hasn't changed
    if (prevCallsign.current === callsign) {
      console.log(
        `Skipping API fetch, callsign "${callsign}" has not changed.`
      );
      return;
    }

    try {
      setLoading(true);
      console.log(`📡 Fetching aircraft data for callsign: ${callsign}`);

      const response = await axios.get(
        `${API_URL}/api/aircraft/${callsign.toUpperCase()}`
      );

      if (response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const aircraftInfo = response.data;
      console.log("Aircraft Data:", aircraftInfo);

      if (!aircraftInfo.latitude || !aircraftInfo.longitude) {
        console.warn(
          " Missing lat/lon. Aircraft will not be shown on the map."
        );
        setAircraftData(null);
        setLoading(false);
        return;
      }

      if (aircraftInfo.departure && aircraftInfo.destination) {
        generateGreatCircleRoute(
          aircraftInfo.departure,
          aircraftInfo.destination,
          aircraftInfo.latitude,
          aircraftInfo.longitude
        );
      } else {
        setRoute([]); // Clear the route if data is missing
      }

      setAircraftData(aircraftInfo);
      prevCallsign.current = callsign; // Store the last fetched callsign
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
    console.log(`📡 Generating Route: ${departureICAO} → ${destinationICAO}`);

    //  Ensure we get accurate airport coordinates
    const depCoords = await fetchCoordinates(departureICAO);
    const destCoords = await fetchCoordinates(destinationICAO);

    if (!depCoords || !destCoords) {
      console.warn(
        " Missing airport coordinates. Defaulting to a direct line."
      );
      setRoute([
        [40, -3],
        [51, 0],
      ]); // Temporary Madrid → London route
      return;
    }


    // Standard Great Circle Route
    const start = turf.point([depCoords.lon, depCoords.lat]);
    const end = turf.point([destCoords.lon, destCoords.lat]);
    const greatCircle = turf.greatCircle(start, end, { npoints: 100 });

    //  Ensure the output is always `[number, number]`
    const routeCoords: [number, number][] =
      greatCircle.geometry.coordinates.map((coord): [number, number] => [
        coord[1] as number,
        coord[0] as number,
      ]);

    //  Insert aircraft position into the route if available
    if (aircraftLat !== undefined && aircraftLon !== undefined) {
      console.log(
        `✈️ Adjusting Route via Aircraft at [${aircraftLat}, ${aircraftLon}]`
      );

      const adjustedRoute: [number, number][] = [
        [depCoords.lat, depCoords.lon],
        [aircraftLat, aircraftLon], // Ensure aircraft is included in the route
        [destCoords.lat, destCoords.lon],
      ];

      setRoute(adjustedRoute);
      return;
    }

    setRoute(routeCoords);
  };

  useEffect(() => {
    fetchAircraftData(); // Fetch immediately on first render if callsign is new

    // Set interval to refresh only if aircraft is still active
    const interval = setInterval(() => {
      if (aircraftData) fetchAircraftData();
    }, 15500);

    return () => clearInterval(interval);
  }, [callsign, fetchAircraftData, aircraftData]);

  useEffect(() => {
    if (!gateLocation || !mapRef.current) return;

    mapRef.current.flyTo([gateLocation.lat, gateLocation.lon], 18, {
      animate: true,
      duration: 1.5,
    });
  }, [gateLocation]);

  return (
    <div style={{ position: "relative", width: "100%", height: "400px" }}>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: "10px",
            borderRadius: "8px",
            color: "white",
            fontSize: "16px",
            zIndex: 1000,
          }}
        >
          Loading Flight Data...
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
          <Polyline
            positions={route}
            color="blue"
            weight={2.5}
            smoothFactor={1.5}
          />
        )}

        {aircraftData &&
          aircraftData.latitude !== undefined &&
          aircraftData.longitude !== undefined && (
            <Marker
              position={[aircraftData.latitude, aircraftData.longitude]}
              icon={L.divIcon({
                className: "aircraft-icon",
                html: `<div style="transform: rotate(${
                  aircraftData.heading || 0
                }deg);">
          <img src="/planevector.png" style="width: 32px; height: 32px;" />
        </div>`,
                iconSize: [32, 32],
                iconAnchor: [16, 16], // Centers the aircraft icon properly
              })}
            >
              <Popup>
                <strong>{aircraftData.callsign}</strong>
                <br />
                Altitude:{" "}
                {aircraftData.altitude !== undefined
                  ? aircraftData.altitude.toLocaleString()
                  : "N/A"}{" "}
                ft
                <br />
                Ground Speed:{" "}
                {aircraftData.ground_speed !== undefined
                  ? aircraftData.ground_speed.toLocaleString()
                  : "N/A"}{" "}
                kt
              </Popup>
            </Marker>
          )}

        {/* Render All Gates */}
        {allGates.map((gate, index) =>
          gate.lat !== undefined && gate.lon !== undefined ? (
            <CircleMarker
              key={`gate-${
                gate.ref !== "Unknown" ? gate.ref : `unknown-${index}`
              }`}
              center={[gate.lat, gate.lon]}
              radius={occupiedGates[gate.ref] ? 7 : 5} // Bigger if occupied
              color={occupiedGates[gate.ref] ? "red" : "green"}
              fillColor={occupiedGates[gate.ref] ? "red" : "green"}
              fillOpacity={0.8}
              weight={1.5}
            >
              <Popup>
                <strong>
                  Gate{" "}
                  {gate.ref !== "Unknown" ? gate.ref : `Unknown #${index + 1}`}
                </strong>
                <br />
                Status: {occupiedGates[gate.ref] ? "Occupied" : "Available"}
              </Popup>
            </CircleMarker>
          ) : null
        )}
        {gateLocation &&
          gateLocation.lat !== undefined &&
          gateLocation.lon !== undefined && (
            <Marker
              position={[gateLocation.lat, gateLocation.lon]}
              icon={L.divIcon({
                className: "gate-marker",
                html: `<div style="width: 8px; height: 8px; background-color: red; border-radius: 50%;"></div>`,
                iconSize: [8, 8],
                iconAnchor: [4, 4],
              })}
            />
          )}
      </MapContainer>
    </div>
  );
}
