import time
from config import POLL_INTERVAL, AREA_NAME
from opensky import get_aircraft
from discord_notify import send_flight_alert
from utils import clean_callsign

def main():
    print("Cuervo Flight Tracker by cuervodev")
    print(f"Tracking airspace: {AREA_NAME}")
    known_aircraft = set()

    while True:
        try:
            aircraft = get_aircraft()
            current_aircraft = set()

            for state in aircraft:
                icao24 = state[0]
                if not icao24:
                    continue

                current_aircraft.add(icao24)

                if icao24 not in known_aircraft:
                    send_flight_alert(state)
                    callsign = clean_callsign(state[1])
                    status = "GROUND" if state[8] else "AIR"
                    print(f"[+] {callsign} | {icao24.upper()} | {status}")

            known_aircraft = current_aircraft
            time.sleep(POLL_INTERVAL)

        except KeyboardInterrupt:
            print("\nStopping tracker...")
            break
        except Exception as error:
            print(f"[ERROR] {error}")
            time.sleep(POLL_INTERVAL)

if __name__ == "__main__":
    main()
