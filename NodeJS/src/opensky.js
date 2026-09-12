import { OPENSKY_URL, LAT_MIN, LAT_MAX, LON_MIN, LON_MAX } from "./config.js";

export async function getAircraft() {
  const url = new URL(OPENSKY_URL);
  url.searchParams.set("lamin", LAT_MIN.toString());
  url.searchParams.set("lomin", LON_MIN.toString());
  url.searchParams.set("lamax", LAT_MAX.toString());
  url.searchParams.set("lomax", LON_MAX.toString());

  const response = await fetch(url.toString(), { signal: AbortSignal.timeout(10000) });
  if (!response.ok) {
    throw new Error(`OpenSky API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.states || [];
}
