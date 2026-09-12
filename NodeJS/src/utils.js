export function cleanCallsign(callsign) {
  if (!callsign) return "N/A";
  return callsign.trim();
}

export function metersToFeet(meters) {
  if (meters === null || meters === undefined) return "N/A";
  return `${Math.round(meters * 3.28084).toLocaleString()} ft`;
}

export function msToKnots(speed) {
  if (speed === null || speed === undefined) return "N/A";
  return `${Math.round(speed * 1.94384)} kt`;
}

export function degrees(value) {
  if (value === null || value === undefined) return "N/A";
  return `${Math.round(value)}°`;
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
