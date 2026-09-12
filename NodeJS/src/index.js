import { POLL_INTERVAL, AREA_NAME } from "./config.js";
import { getAircraft } from "./opensky.js";
import { sendFlightAlert } from "./discord.js";
import { cleanCallsign, sleep } from "./utils.js";

async function main() {
  console.log("Cuervo Flight Tracker by cuervodev");
  console.log(`Tracking airspace: ${AREA_NAME}`);
  let knownAircraft = new Set();

  while (true) {
    try {
      const aircraft = await getAircraft();
      const currentAircraft = new Set();

      for (const state of aircraft) {
        const icao24 = state[0];
        if (!icao24) continue;

        currentAircraft.add(icao24);

        if (!knownAircraft.has(icao24)) {
          await sendFlightAlert(state);
          const callsign = cleanCallsign(state[1]);
          const status = state[8] ? "GROUND" : "AIR";
          console.log(`[+] ${callsign} | ${icao24.toUpperCase()} | ${status}`);
        }
      }

      knownAircraft = currentAircraft;
      await sleep(POLL_INTERVAL);
    } catch (error) {
      console.error(`[ERROR] ${error.message}`);
      await sleep(POLL_INTERVAL);
    }
  }
}

process.on("SIGINT", () => {
  console.log("\nStopping tracker...");
  process.exit(0);
});

main();
