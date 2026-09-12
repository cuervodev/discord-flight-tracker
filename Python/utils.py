def clean_callsign(callsign):
    if not callsign:
        return "N/A"
    return callsign.strip()

def meters_to_feet(meters):
    if meters is None:
        return "N/A"
    return f"{meters * 3.28084:,.0f} ft"

def ms_to_knots(speed):
    if speed is None:
        return "N/A"
    return f"{speed * 1.94384:.0f} kt"

def degrees(value):
    if value is None:
        return "N/A"
    return f"{value:.0f}°"
