# Cuervo Flight Tracker

Real-time airspace monitoring for Discord powered by the OpenSky Network API. Built and maintained by [cuervodev](https://github.com/cuervodev).

Available as standalone implementations in both **Python** and **Node.js**.

---

## Overview

Cuervo Flight Tracker continuously monitors a geographic bounding box for aircraft activity. When a flight enters the configured airspace, the system retrieves its telemetry and dispatches a detailed Discord webhook embed containing:

- Callsign and ICAO24 transponder address
- Country of origin
- Geographic coordinates (latitude, longitude)
- Barometric altitude (feet)
- Ground speed (knots)
- True track / heading (degrees)
- Operational status (Airborne or On Ground)

---

## Project Structure

```text
discord-flight-tracker/
├── Python/
│   ├── .env.example
│   ├── requirements.txt
│   ├── config.py
│   ├── utils.py
│   ├── opensky.py
│   ├── discord_notify.py
│   └── main.py
├── NodeJS/
│   ├── .env.example
│   ├── package.json
│   └── src/
│       ├── config.js
│       ├── utils.js
│       ├── opensky.js
│       ├── discord.js
│       └── index.js
├── .gitignore
└── README.md
```

---

## Configuration

Duplicate `.env.example` to `.env` inside the implementation directory you plan to use (`Python/.env` or `NodeJS/.env`):

| Variable | Description | Default |
|---|---|---|
| `DISCORD_WEBHOOK_URL` | Discord incoming webhook URL | *(Required)* |
| `BOT_NAME` | Display name for the Discord bot | `Cuervo Flight Tracker` |
| `AVATAR_URL` | Avatar image URL for the Discord webhook | *(Optional)* |
| `AREA_NAME` | Human-readable name of the monitored zone | `Monitored Airspace` |
| `LAT_MIN` | Minimum latitude (southern boundary) | `0.0` |
| `LAT_MAX` | Maximum latitude (northern boundary) | `0.0` |
| `LON_MIN` | Minimum longitude (western boundary) | `0.0` |
| `LON_MAX` | Maximum longitude (eastern boundary) | `0.0` |
| `POLL_INTERVAL` | Polling frequency in seconds | `15` |

> Note: The embed footer and terminal headers are fixed to `github.com/cuervodev/discord-flight-tracker`.

### Defining Bounding Box Coordinates

You can determine your target coordinates using tools like [BoundingBox Web tool](http://boundingbox.klokantech.com) or Google Maps:

1. `LAT_MIN`: South boundary latitude
2. `LAT_MAX`: North boundary latitude
3. `LON_MIN`: West boundary longitude
4. `LON_MAX`: East boundary longitude

---

## Getting Started

### Python Version

Requires Python 3.9+.

```bash
cd Python
pip install -r requirements.txt
cp .env.example .env
# Edit your variables in .env
python main.py
```

### Node.js Version

Requires Node.js 18+.

```bash
cd NodeJS
npm install
cp .env.example .env
# Edit your variables in .env
npm start
```

---

## Technical Notes

- **API Rate Limits**: The OpenSky Network anonymous API imposes request quotas. It is strongly recommended to keep `POLL_INTERVAL` at or above 15 seconds.
- **Deduplication**: Aircraft active in memory are tracked continuously to ensure alerts are only dispatched upon first entry into the bounding box.

---

## Author & Repository

- **Author**: [cuervodev](https://github.com/cuervodev)
- **Repository**: [github.com/cuervodev/discord-flight-tracker](https://github.com/cuervodev/discord-flight-tracker)
