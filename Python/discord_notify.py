from datetime import datetime, timezone
import requests
from config import DISCORD_WEBHOOK_URL, BOT_NAME, AVATAR_URL, AREA_NAME
from utils import clean_callsign, meters_to_feet, ms_to_knots, degrees

FOOTER_TEXT = "github.com/cuervodev/discord-flight-tracker"

def send_flight_alert(state):
    if not DISCORD_WEBHOOK_URL:
        return

    icao24 = state[0]
    callsign = clean_callsign(state[1])
    origin_country = state[2] or "N/A"
    longitude = state[5]
    latitude = state[6]
    altitude = state[7]
    on_ground = state[8]
    velocity = state[9]
    heading = state[10]

    pos_str = f"`{latitude:.4f}, {longitude:.4f}`" if latitude is not None and longitude is not None else "N/A"

    fields = [
        {"name": "Callsign", "value": f"`{callsign}`", "inline": True},
        {"name": "ICAO24", "value": f"`{icao24.upper()}`", "inline": True},
        {"name": "Country", "value": origin_country, "inline": True},
        {"name": "Position", "value": pos_str, "inline": False},
        {"name": "Altitude", "value": meters_to_feet(altitude), "inline": True},
        {"name": "Speed", "value": ms_to_knots(velocity), "inline": True},
        {"name": "Heading", "value": degrees(heading), "inline": True},
        {"name": "Status", "value": "On Ground" if on_ground else "Airborne", "inline": True}
    ]

    embed = {
        "title": f"Flight Detected: {callsign}",
        "description": f"Aircraft detected in {AREA_NAME}.",
        "fields": fields,
        "footer": {"text": FOOTER_TEXT},
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

    payload = {
        "username": BOT_NAME,
        "embeds": [embed]
    }

    if AVATAR_URL:
        payload["avatar_url"] = AVATAR_URL

    response = requests.post(DISCORD_WEBHOOK_URL, json=payload, timeout=10)
    response.raise_for_status()
