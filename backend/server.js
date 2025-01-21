const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const WHAZZUP_V2_URL = "https://api.ivao.aero/v2/tracker/whazzup"; // JSON API

let whazzupData = null;  // Cache for Whazzup data
let lastFetched = 0;  // Timestamp of last fetch

// Function to Fetch Whazzup Data (IMPORTANT: Max Once per 15s TO AVOID IP BAN)
async function fetchWhazzupData() {
    const now = Date.now();

    if (whazzupData && now - lastFetched < 15000) {
        console.log("⏳ Using Cached Whazzup Data");
        return whazzupData;
    }

    try {
        console.log("📡 Fetching New Whazzup Data...");
        const response = await axios.get(WHAZZUP_V2_URL);
        whazzupData = response.data;  // Store JSON response
        lastFetched = now;
        return whazzupData;
    } catch (error) {
        console.error("❌ Error Fetching Whazzup Data:", error.message);
        return null;
    }
}

// Get Aircraft Data from Whazzup JSON
app.get("/api/aircraft/:callsign", async (req, res) => {
    const { callsign } = req.params;

    if (!callsign || callsign === "undefined") {
        console.error("❌ API Error: Missing or invalid callsign");
        return res.status(400).json({ error: "Missing or invalid callsign." });
    }

    try {
        console.log(`📡 Fetching data for callsign: ${callsign}`);

        // Fetch IVAO Whazzup Data
        const response = await fetch("https://api.ivao.aero/v2/tracker/whazzup");
        if (!response.ok) {
            throw new Error(`IVAO API request failed with status ${response.status}`);
        }

        const data = await response.json();
        const allCallsigns = data.clients.pilots.map(pilot => pilot.callsign);

        console.log("✅ Available Callsigns:", allCallsigns);

        // ✅ Find similar callsigns in the list
        const similarCallsigns = allCallsigns.filter(c => c.includes(callsign.substring(0, 3)));
        console.log("🔍 Similar Callsigns Found:", similarCallsigns);

        // Search for exact callsign
        const aircraft = data.clients.pilots.find(pilot => pilot.callsign.toUpperCase() === callsign.toUpperCase());

        if (!aircraft) {
            console.warn(`⚠ Callsign '${callsign}' not found.`);
            return res.status(404).json({ 
                error: `Aircraft '${callsign}' not found. Try one of these instead: ${similarCallsigns.join(", ") || "No similar callsigns found."}` 
            });
        }

        res.json({
            callsign: aircraft.callsign,
            latitude: aircraft.lastTrack.latitude,
            longitude: aircraft.lastTrack.longitude,
            altitude: aircraft.lastTrack.altitude,
            ground_speed: aircraft.lastTrack.groundSpeed,
            departure: aircraft.flightPlan ? aircraft.flightPlan.departureId : "Unknown",
            destination: aircraft.flightPlan ? aircraft.flightPlan.arrivalId : "Unknown",
            route: aircraft.flightPlan ? aircraft.flightPlan.route : "No Route"
        });

    } catch (error) {
        console.error("❌ Server Error:", error);
        res.status(500).json({ error: "Unexpected server error. Check logs for details." });
    }
});


// Start Server
app.listen(PORT, () => {
    console.log(`✅ Backend running on http://localhost:${PORT}`);
});
