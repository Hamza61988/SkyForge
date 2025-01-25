const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  "https://skyforgehq.com",
  "http://localhost:5173" 
];



const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,  // ✅ Allows cookies/auth headers if needed
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());

const WHAZZUP_V2_URL = "https://api.ivao.aero/v2/tracker/whazzup";

const client_id = process.env.IVAO_CLIENT_ID;
const client_secret = process.env.IVAO_CLIENT_SECRET;

let accessToken = null;
let tokenExpiration = 0;

// Securely Fetch OAuth Token
async function fetchOAuthToken() {
  const now = Date.now();

  if (accessToken && now < tokenExpiration) {
    return accessToken;
  }

  try {
    console.log("Requesting new OAuth token from IVAO...");

    const response = await axios.post(
      "https://api.ivao.aero/v2/oauth/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: client_id,
        client_secret: client_secret,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (!response.data.access_token) {
      throw new Error("No access token returned from IVAO.");
    }

    accessToken = response.data.access_token;
    tokenExpiration = now + response.data.expires_in * 1000;

    
    return accessToken;
  } catch (error) {
    console.error("OAuth Token Fetch Failed:");
    console.error("Status:", error.response?.status);
    console.error("Response:", error.response?.data);
    console.error("Message:", error.message);
    return null;
  }
}

// Secure Endpoint: Get Aircraft Data
app.get("/api/aircraft/:callsign", async (req, res) => {
  const { callsign } = req.params;
  if (!callsign) {
    return res.status(400).json({ error: "Missing callsign." });
  }

  const token = await fetchOAuthToken();
  if (!token) {
    return res.status(500).json({ error: "Unable to obtain OAuth token." });
  }

  try {
    const response = await axios.get(WHAZZUP_V2_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const pilots = response.data.clients.pilots;
    const aircraft = pilots.find(
      (p) => p.callsign.toUpperCase() === callsign.toUpperCase()
    );

    if (!aircraft) {
      return res
        .status(404)
        .json({ error: `Aircraft '${callsign}' not found.` });
    }

    res.json({
        callsign: aircraft.callsign,
        latitude: aircraft.lastTrack?.latitude ?? null,
        longitude: aircraft.lastTrack?.longitude ?? null,
        altitude: aircraft.lastTrack?.altitude ?? 0,
        ground_speed: aircraft.lastTrack?.groundSpeed ?? 0,
        departure: aircraft.flightPlan?.departureId?.toUpperCase() ?? "Unknown",
        destination: aircraft.flightPlan?.arrivalId?.toUpperCase() ?? "Unknown",
        route: aircraft.flightPlan?.route ?? "No Route",
        heading: aircraft.lastTrack?.heading ?? 0,
        aircraft: aircraft.flightPlan?.aircraftId ?? "Unknown",  
    });
  } catch (error) {
    console.error("Error Fetching Aircraft Data:", error.message);
    res.status(500).json({ error: "Unexpected server error." });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
