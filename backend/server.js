const express = require("express");
const axios = require("axios");
const cors = require("cors");

require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient(); 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const SECRET_KEY = process.env.JWT_SECRET 
const authRoutes = require("./src/routes/auth"); 

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
    credentials: true,  
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use("/api/auth", authRoutes);


//  Authentication Routes 

// **Register User**
app.post("/api/auth/register", async (req, res) => {
  try {
      const { username, email, password } = req.body;

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) return res.status(400).json({ message: "Email already exists" });

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const newUser = await prisma.user.create({
          data: { username, email, password: hashedPassword },
      });

      res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
      console.error("Registration Error:", error); 
      res.status(500).json({ message: "Error registering user", error: error.message });
  }
});


// **Login User**
app.post("/api/auth/login", async (req, res) => {
  try {
      const { email, password } = req.body;

      // Check if user exists
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) return res.status(400).json({ message: "Invalid email or password" });

      // Validate password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(400).json({ message: "Invalid email or password" });

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "7d" });

      res.json({ message: "Login successful", token });
  } catch (error) {
      res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

function authenticateToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
      const verified = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
      req.user = verified;
      next();
  } catch (error) {
      res.status(401).json({ message: "Invalid token" });
  }
}


const WHAZZUP_V2_URL = "https://api.ivao.aero/v2/tracker/whazzup";

const client_id = process.env.IVAO_CLIENT_ID;
const client_secret = process.env.IVAO_CLIENT_SECRET;

let accessToken = null;
let tokenExpiration = 0;

//Fetch OAuth Token
async function fetchOAuthToken() {
  const now = Date.now();

  if (accessToken && now < tokenExpiration) {
    return accessToken;
  }

  try {

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

//Get Aircraft Data
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
  console.log(`Running on port: ${PORT}`);
});
