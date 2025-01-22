import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import * as turf from "@turf/turf"; // Import Turf.js for geodesic calculations

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"; // Fallback to localhost if env variable is missing

const VITE_GEONAMES_USERNAME = import.meta.env.VITE_GEONAMES_USERNAME;

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

  const fetchAirportCoordinates = async (icao: string) => {
    try {
      console.log(`Fetching coordinates for ${icao} using GeoNames API`);

      const response = await axios.get(
        `https://secure.geonames.org/searchJSON?q=${icao}&maxRows=1&username=${VITE_GEONAMES_USERNAME}`
      );

      if (response.data.geonames.length > 0) {
        const { lat, lng } = response.data.geonames[0];
        return { lat, lon: lng };
      }

      console.warn(`⚠ No coordinates found for ${icao}`);
    } catch (error) {}

    return null;
  };

  // Fetch Aircraft Data from IVAO API
  const fetchAircraftData = useCallback(async () => {
    try {
        if (!callsign) return;
        setLoading(true);

        console.log(`📡 Fetching aircraft data from backend for callsign: ${callsign}`);

        const response = await axios.get(`${API_URL}/api/aircraft/${callsign.toUpperCase()}`);

        if (response.status !== 200) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const aircraftInfo = response.data;
        console.log("🔍 Received Aircraft Data:", aircraftInfo);

        if (!aircraftInfo.latitude || !aircraftInfo.longitude) {
            console.warn("⚠ Missing latitude/longitude. Aircraft will not be shown on the map.");
            setAircraftData(null); // Prevents displaying invalid data
            setLoading(false);
            return;
        }

        if (!aircraftInfo.departure || !aircraftInfo.destination) {
            console.warn("⚠ Missing departure or destination. Cannot generate route.");
            setRoute([]); // Clear the route
        } else {
            console.log("✈️ Generating flight path...");
            generateGreatCircleRoute(
                aircraftInfo.departure,
                aircraftInfo.destination,
                aircraftInfo.latitude,
                aircraftInfo.longitude
            );
        }

        setAircraftData(aircraftInfo);
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
    console.log(
      `Generating Route from ${departureICAO} to ${destinationICAO} via aircraft position`
    );

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
      // If no aircraft data, use a standard Great Circle Route
      const start = turf.point([depCoords.lon, depCoords.lat]);
      const end = turf.point([destCoords.lon, destCoords.lat]);
      const greatCircle = turf.greatCircle(start, end, { npoints: 100 });

      const routeCoords: [number, number][] =
        greatCircle.geometry.coordinates.map(
          (coord) => [coord[1], coord[0]] as [number, number]
        ); // Ensure proper formatting

      setRoute(routeCoords);
      return;
    }

    console.log(
      `Adjusting route to pass under aircraft at [${aircraftLat}, ${aircraftLon}]`
    );

    // ✅ Smooth curve from departure to aircraft
    const smoothedEntry: [number, number][] = [
      [
        departurePoint[0] * 0.7 + aircraftLat * 0.3,
        departurePoint[1] * 0.7 + aircraftLon * 0.3,
      ] as [number, number],
      [
        departurePoint[0] * 0.4 + aircraftLat * 0.6,
        departurePoint[1] * 0.4 + aircraftLon * 0.6,
      ] as [number, number],
    ];

    // Smooth curve from aircraft to destination
    const smoothedExit: [number, number][] = [
      [
        aircraftLat * 0.6 + destinationPoint[0] * 0.4,
        aircraftLon * 0.6 + destinationPoint[1] * 0.4,
      ] as [number, number],
      [
        aircraftLat * 0.3 + destinationPoint[0] * 0.7,
        aircraftLon * 0.3 + destinationPoint[1] * 0.7,
      ] as [number, number],
    ];

    // Construct final smooth route
    const adjustedRoute: [number, number][] = [
      departurePoint,
      ...smoothedEntry,
      [aircraftLat, aircraftLon] as [number, number],
      ...smoothedExit,
      destinationPoint,
    ];

    console.log(`Final adjusted route is smooth and direct.`);
    setRoute(adjustedRoute);
  };

  useEffect(() => {
    fetchAircraftData();
    console.log("📡 API Response (aircraftData):", aircraftData); // Debugging log
    const interval = setInterval(fetchAircraftData, 15500);
    return () => clearInterval(interval);
  }, [fetchAircraftData]);

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
        {allGates.map((gate) =>
          gate.lat !== undefined && gate.lon !== undefined ? (
            <Marker
              key={`gate-${gate.ref}`}
              position={[gate.lat, gate.lon]}
              icon={L.divIcon({
                className: "gate-marker",
                html: `<div style="width: 10px; height: 10px; background-color: ${
                  occupiedGates[gate.ref] ? "red" : "green"
                }; border-radius: 50%; border: 2px solid white;"></div>`,
                iconSize: [10, 10],
                iconAnchor: [5, 5],
              })}
            >
              <Popup>
                <strong>Gate {gate.ref}</strong>
                <br />
                Status: {occupiedGates[gate.ref] ? "Occupied" : "Available"}
              </Popup>
            </Marker>
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
