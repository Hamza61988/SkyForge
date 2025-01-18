import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AirportSelection() {
    const [airport, setAirport] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (airport.trim().length === 4) {
            navigate(`/callsign?icao=${airport}`);
        } else {
            alert("Please enter a valid 4-letter ICAO code.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
            <h2 className="text-3xl">Enter Controlled Airport ICAO</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <input
                    type="text"
                    placeholder="e.g., EGLL"
                    value={airport}
                    onChange={(e) => setAirport(e.target.value.toUpperCase())}
                    className="px-4 py-2 rounded-lg text-black"
                    maxLength={4}
                />
                <button type="submit" className="ml-4 px-6 py-2 bg-green-500 hover:bg-green-700 text-white rounded-lg">
                    Connect
                </button>
            </form>
        </div>
    );
}
