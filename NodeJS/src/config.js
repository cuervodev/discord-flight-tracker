import dotenv from "dotenv";

dotenv.config();

export const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || "";
export const BOT_NAME = process.env.BOT_NAME || "Cuervo Flight Tracker";
export const AVATAR_URL = process.env.AVATAR_URL || "";

export const LAT_MIN = parseFloat(process.env.LAT_MIN || "0.0");
export const LAT_MAX = parseFloat(process.env.LAT_MAX || "0.0");
export const LON_MIN = parseFloat(process.env.LON_MIN || "0.0");
export const LON_MAX = parseFloat(process.env.LON_MAX || "0.0");

export const POLL_INTERVAL = parseInt(process.env.POLL_INTERVAL || "15", 10) * 1000;
export const AREA_NAME = process.env.AREA_NAME || "Monitored Airspace";

export const OPENSKY_URL = "https://opensky-network.org/api/states/all";
