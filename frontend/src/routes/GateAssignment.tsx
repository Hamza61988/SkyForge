import { useSearchParams } from "react-router-dom";

export default function GateAssignment() {
    const [searchParams] = useSearchParams();
    const airport = searchParams.get("icao");
    const callsign = searchParams.get("callsign");

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
            <h2 className="text-3xl">Gate Assignment</h2>
            <p className="text-xl mt-2">Airport: {airport}</p>
            <p className="text-xl">Callsign: {callsign}</p>
            <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                <p>Fetching assigned gate...</p>
            </div>
        </div>
    );
}
