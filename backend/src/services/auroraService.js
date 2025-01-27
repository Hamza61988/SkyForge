

// BEFORE MODIFYING THIS BE SURE TO READ AND CHECK: "SKYFORGE_LOGUPDATER.MD" RUNWAYLINK SECTION 


const net = require("net");
const axios = require("axios");

const AURORA_HOST = "localhost";
const AURORA_PORT = 1130;
const IVAO_WHAZZUP_URL = "https://api.ivao.aero/v2/whazzup";

/**
 * Checks if Aurora is running by attempting a TCP connection.
 * @returns {Promise<boolean>} - True if Aurora is running, otherwise false.
 */
async function checkAuroraConnection() {
  return new Promise((resolve) => {
    const client = new net.Socket();

    client.connect(AURORA_PORT, AURORA_HOST, () => {
      console.log("Connected to Aurora!");
      resolve(true);
      client.destroy();
    });

    client.on("error", () => {
      console.log("Aurora not detected.");
      resolve(false);
      client.destroy();
    });
  });
}

/**
 * Fetches flight plan from Aurora if connected, otherwise from IVAO Whazzup API.
 * @param {string} callsign - The aircraft callsign.
 * @returns {Promise<Object>} - Flight plan data or error message.
 */
async function getFlightPlan(callsign) {
  try {
    const isConnected = await checkAuroraConnection();

    if (isConnected) {
      console.log("Fetching flight plan from Aurora...");
      return await getFlightPlanFromAurora(callsign);
    } else {
      console.log("Fetching flight plan from IVAO API...");
      return await getFlightPlanFromIVAO(callsign);
    }
  } catch (error) {
    console.error("Error fetching flight plan:", error.message);
    return { error: "Failed to retrieve flight plan." };
  }
}

/**
 * Fetches flight plan from Aurora.
 * @param {string} callsign - The aircraft callsign.
 * @returns {Promise<Object>} - Parsed flight plan data.
 */
async function getFlightPlanFromAurora(callsign) {
  return new Promise((resolve, reject) => {
    const client = new net.Socket();

    client.connect(AURORA_PORT, AURORA_HOST, () => {
      client.write(`#FP;${callsign}\r\n`);
    });

    client.on("data", (data) => {
      const response = data.toString().trim();
      const parts = response.split(";");

      if (parts[0] === "#FP" && parts[1] === callsign) {
        resolve({
          departure: parts[2],
          destination: parts[3],
          alternate: parts[4] || "N/A",
          aircraftType: parts[5] || "Unknown",
          cruisingAltitude: parts[10] || "N/A",
          route: parts[14] || "Direct",
          remarks: parts[15] || "No remarks",
        });
      } else {
        reject(new Error("Invalid response from Aurora."));
      }

      client.destroy();
    });

    client.on("error", () => {
      reject(new Error("Aurora connection failed."));
      client.destroy();
    });
  });
}

/**
 * Fetches flight plan from IVAO Whazzup API.
 * @param {string} callsign - The aircraft callsign.
 * @returns {Promise<Object>} - Flight plan data or error message.
 */
async function getFlightPlanFromIVAO(callsign) {
  try {
    const response = await axios.get(IVAO_WHAZZUP_URL);

    if (!response.data || !response.data.pilots) {
      throw new Error("Invalid response from IVAO API.");
    }

    const pilotData = response.data.pilots.find((pilot) => pilot.callsign === callsign);

    if (!pilotData) {
      return { error: "Flight plan not found for this callsign." };
    }

    return {
      departure: pilotData.flight_plan.departure,
      destination: pilotData.flight_plan.destination,
      alternate: pilotData.flight_plan.alternate || "N/A",
      aircraftType: pilotData.flight_plan.aircraft || "Unknown",
      cruisingAltitude: pilotData.flight_plan.altitude,
      route: pilotData.flight_plan.route || "Direct",
      remarks: pilotData.flight_plan.remarks || "No remarks",
    };
  } catch (error) {
    console.error("Error fetching flight plan from IVAO:", error.message);
    return { error: "Failed to retrieve flight plan from IVAO." };
  }
}

module.exports = { getFlightPlan, checkAuroraConnection };
