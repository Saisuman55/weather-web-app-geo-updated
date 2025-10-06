import React from 'react';
export default function CurrentWeather({ data }) {
  if (!data) return null;
  return (
    <div className="card current">
      <h2>{data.city}, {data.country}</h2>
      <p><strong>{data.temp}°C</strong> — {data.description}</p>
      <p>Humidity: {data.humidity}% • Wind: {data.wind} m/s</p>
    </div>
  );
}
