// client/src/components/GeolocateButton.jsx
import React, { useState } from "react";

/**
 * Props:
 * - onLocate({ lat, lon })
 */
export default function GeolocateButton({ onLocate }) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [coords, setCoords] = useState(null);

  const requestLocation = () => {
    setErr("");
    setCoords(null);

    if (!navigator.geolocation) {
      setErr("Geolocation not supported");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLoading(false);
        const { latitude, longitude, accuracy } = pos.coords;
        // store coords so user can confirm
        setCoords({ latitude, longitude, accuracy });
        // also print to console for debugging
        console.info("Geolocation position:", pos.coords, "timestamp:", pos.timestamp);
      },
      (error) => {
        setLoading(false);
        console.warn("Geolocation error", error);
        if (error.code === 1) setErr("Permission denied");
        else if (error.code === 2) setErr("Position unavailable");
        else if (error.code === 3) setErr("Request timed out");
        else setErr("Could not get location");
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
    );
  };

  const confirmAndSend = () => {
    if (!coords) return;
    // call parent with lat/lon
    onLocate({ lat: coords.latitude, lon: coords.longitude });
    // clear coords after use
    setCoords(null);
  };

  return (
    <div style={{ display: "inline-block", marginLeft: 8 }}>
      <button
        onClick={requestLocation}
        disabled={loading}
        className="geopin"
        title="Use my location"
      >
        {loading ? "Locating…" : "📍"}
      </button>

      {err && <div style={{ color: "#b91c1c", marginTop: 6 }}>{err}</div>}

      {coords && (
        <div style={{ marginTop: 8, padding: 8, border: "1px solid #eee", borderRadius: 6, background: "#fff" }}>
          <div style={{ fontSize: 13, marginBottom: 6 }}>
            <strong>Detected location</strong>
          </div>
          <div style={{ fontSize: 13 }}>Latitude: {coords.latitude.toFixed(6)}</div>
          <div style={{ fontSize: 13 }}>Longitude: {coords.longitude.toFixed(6)}</div>
          <div style={{ fontSize: 13 }}>Accuracy: ±{Math.round(coords.accuracy)} m</div>

          <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
            <button onClick={confirmAndSend} style={{ padding: "6px 10px", borderRadius: 6 }}>
              Confirm
            </button>
            <button
              onClick={() => setCoords(null)}
              style={{ padding: "6px 10px", borderRadius: 6, background: "#eee", border: "1px solid #ddd" }}
            >
              Cancel
            </button>
          </div>

          <div style={{ marginTop: 6, fontSize: 12, color: "#6b7280" }}>
            Tip: if accuracy is large (hundreds of meters), try disabling VPN or use a device with GPS.
          </div>
        </div>
      )}
    </div>
  );
}
