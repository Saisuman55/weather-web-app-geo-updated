import React from 'react';
export default function Forecast({ forecast=[] }) {
  if (!forecast.length) return null;
  return (
    <div className="forecast">
      {forecast.map(f => (
        <div key={f.date} className="day">
          <div>{f.date}</div>
          <div>{f.avgTempC}°C</div>
          <div>{f.description}</div>
        </div>
      ))}
    </div>
  );
}
