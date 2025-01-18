import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function CallsignInput() {
    const [callsign, setCallsign] = useState("");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const airport = searchParams.get("icao");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (callsign.trim().length > 2) {
            navigate(`/gate-assignment?icao=${airport}&callsign=${callsign}`);
        } else {
            alert("Please enter a valid callsign.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
            <h2 className="text-3xl">Controlled Airport: {airport}</h2>
            <p className="text-xl mt-2">Enter Aircraft Callsign</p>
            <form onSubmit={handleSubmit} className="mt-4">
                <input
                    type="text"
                    placeholder="e.g., BAW123"
                    value={callsign}
                    onChange={(e) => setCallsign(e.target.value.toUpperCase())}
                    className="px-4 py-2 rounded-lg text-black"
                />
                <button type="submit" className="ml-4 px-6 py-2 bg-green-500 hover:bg-green-700 text-white rounded-lg">
                    Fetch Route
                </button>
            </form>
        </div>
    );
}
