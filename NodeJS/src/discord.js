import { DISCORD_WEBHOOK_URL, BOT_NAME, AVATAR_URL, AREA_NAME } from "./config.js";
import { cleanCallsign, metersToFeet, msToKnots, degrees } from "./utils.js";

const FOOTER_TEXT = "github.com/cuervodev/discord-flight-tracker";

export async function sendFlightAlert(state) {
  if (!DISCORD_WEBHOOK_URL) return;

  const icao24 = state[0];
  const callsign = cleanCallsign(state[1]);
  const originCountry = state[2] || "N/A";
  const longitude = state[5];
  const latitude = state[6];
  const altitude = state[7];
  const onGround = state[8];
  const velocity = state[9];
  const heading = state[10];

  const posStr = (latitude !== null && longitude !== null && latitude !== undefined && longitude !== undefined)
    ? `\`${latitude.toFixed(4)}, ${longitude.toFixed(4)}\``
    : "N/A";

  const fields = [
    { name: "Callsign", value: `\`${callsign}\``, inline: true },
    { name: "ICAO24", value: `\`${icao24.toUpperCase()}\``, inline: true },
    { name: "Country", value: originCountry, inline: true },
    { name: "Position", value: posStr, inline: false },
    { name: "Altitude", value: metersToFeet(altitude), inline: true },
    { name: "Speed", value: msToKnots(velocity), inline: true },
    { name: "Heading", value: degrees(heading), inline: true },
    { name: "Status", value: onGround ? "On Ground" : "Airborne", inline: true }
  ];

  const embed = {
    title: `Flight Detected: ${callsign}`,
    description: `Aircraft detected in ${AREA_NAME}.`,
    fields,
    footer: { text: FOOTER_TEXT },
    timestamp: new Date().toISOString()
  };

  const payload = {
    username: BOT_NAME,
    embeds: [embed]
  };

  if (AVATAR_URL) {
    payload.avatar_url = AVATAR_URL;
  }

  const response = await fetch(DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10000)
  });

  if (!response.ok) {
    throw new Error(`Discord Webhook error: ${response.status} ${response.statusText}`);
  }
}
