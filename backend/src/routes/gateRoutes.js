const express = require("express");
const { assignGate } = require("../services/gateService");

const router = express.Router();

router.get("/:airport", async (req, res) => {
  try {
    const airport = req.params.airport;
    const gate = await assignGate(airport);
    res.json({ airport, assignedGate: gate });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch gate information" });
  }
});

module.exports = router;
