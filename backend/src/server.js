const express = require("express");
const cors = require("cors");
require("dotenv").config();

const API_KEY = process.env.OPENCAGE_API_KEY;


const callsignRoutes = require("./routes/callsignRoutes");
const gateRoutes = require("./routes/gateRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("./api/callsign", callsignRoutes);
app.use("/api/gates", gateRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));