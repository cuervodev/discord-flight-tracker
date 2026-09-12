import os
from dotenv import load_dotenv

load_dotenv()

DISCORD_WEBHOOK_URL = os.getenv("DISCORD_WEBHOOK_URL", "")
BOT_NAME = os.getenv("BOT_NAME", "Cuervo Flight Tracker")
AVATAR_URL = os.getenv("AVATAR_URL", "")

LAT_MIN = float(os.getenv("LAT_MIN", "0.0"))
LAT_MAX = float(os.getenv("LAT_MAX", "0.0"))
LON_MIN = float(os.getenv("LON_MIN", "0.0"))
LON_MAX = float(os.getenv("LON_MAX", "0.0"))

POLL_INTERVAL = int(os.getenv("POLL_INTERVAL", "15"))
AREA_NAME = os.getenv("AREA_NAME", "Monitored Airspace")

OPENSKY_URL = "https://opensky-network.org/api/states/all"
