// BEFORE MODIFYING THIS BE SURE TO READ AND CHECK: "SKYFORGE_LOGUPDATER.MD" RUNWAYLINK SECTION 


const express = require("express");
const { getFlightPlan, checkAuroraConnection } = require("../services/auroraService");

const router = express.Router();

// Route to check if Aurora is running
router.get("/check-aurora", async (req, res) => {
  const isConnected = await checkAuroraConnection();
  res.json({ auroraConnected: isConnected });
});

// Route to get a flight plan
router.get("/:callsign", async (req, res) => {
  try {
    const callsign = req.params.callsign;
    const flightData = await getFlightPlan(callsign);

    if (!flightData || flightData.error) {
      return res.status(404).json({ error: "Flight plan not found." });
    }

    res.json(flightData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch flight plan." });
  }
});

module.exports = router;
