
// BEFORE MODIFYING THIS BE SURE TO READ AND CHECK: "SKYFORGE_LOGUPDATER.MD" RUNWAYLINK SECTION 


async function assignGate(airport) {
    const availableGates = ["A1", "A2", "B3", "C4", "D5"]; // Example gates
    const randomGate = availableGates[Math.floor(Math.random() * availableGates.length)];
    return randomGate;
  }
  
  module.exports = { assignGate };
  