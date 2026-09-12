import requests
from config import OPENSKY_URL, LAT_MIN, LAT_MAX, LON_MIN, LON_MAX

def get_aircraft():
    params = {
        "lamin": LAT_MIN,
        "lomin": LON_MIN,
        "lamax": LAT_MAX,
        "lomax": LON_MAX
    }
    response = requests.get(OPENSKY_URL, params=params, timeout=10)
    response.raise_for_status()
    data = response.json()
    return data.get("states") or []
