import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import airportsDataRaw from "../data/airports.json"; // Import local airports data
import * as arc from "arc"; // For curved flight paths

// Define Airport Type
interface Airport {
  ident: string;
  latitude_deg: number;
  longitude_deg: number;
}

// Ensure TypeScript knows `airportsData` is an array of Airport[]
const airportsData: Airport[] = airportsDataRaw as Airport[];

export default function Map({ departure, arrival }: { departure: string; arrival: string }) {
  const [route, setRoute] = useState<[number, number][]>([]);

  useEffect(() => {
    const getCoordinates = (icao: string): [number, number] | null => {
      const airport = airportsData.find((a) => a.ident === icao);
      return airport ? [airport.latitude_deg, airport.longitude_deg] : null;
    };

    const depCoords = getCoordinates(departure);
    const arrCoords = getCoordinates(arrival);

    if (depCoords && arrCoords) {
      // ✅ Generate a smooth great-circle arc
      const line = new arc.GreatCircle(
        { x: depCoords[1], y: depCoords[0] }, // Longitude, Latitude
        { x: arrCoords[1], y: arrCoords[0] } // Longitude, Latitude
      );

      const arcData = line.Arc(100, { offset: 10 }).geometries[0].coords;

      // ✅ Ensure each element is `[number, number]`
      const curvedRoute: [number, number][] = arcData
        .filter((coord): coord is [number, number] => coord.length === 2)
        .map((coord) => [coord[1], coord[0]]); // Convert to [Lat, Lon]

      setRoute(curvedRoute);
    } else {
      console.warn("Missing coordinates for departure or arrival airport:", { departure, arrival });
    }
  }, [departure, arrival]);

  return (
    <MapContainer center={[20, 0]} zoom={3} style={{ height: "400px", width: "100%" }}>
      {/* Tile Layer for map background */}
      <TileLayer
  url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
  attribution='&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors'
/>

      
      {/* Draw a smooth curved line from departure to arrival */}
      {route.length > 0 && <Polyline positions={route} color="red" weight={3} smoothFactor={1.5} />}
    </MapContainer>
  );
}
