import React, { useState } from 'react';
import WeatherSearch from './components/WeatherSearch';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import { weatherApi } from './services/api';
import GeolocateButton from './components/GeolocateButton';
import './styles.css';

function App(){
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const doSearch = async (city) => {
    try {
      setErr(''); setLoading(true);
      const [cRes, fRes] = await Promise.all([
        weatherApi.getCurrent(city),
        weatherApi.getForecast(city)
      ]);
      setCurrent(cRes.data);
      setForecast(fRes.data.forecast || []);
    } catch (e) {
      setErr(e.response?.data?.message || 'Could not fetch weather');
    } finally { setLoading(false); }
  };

  const doLocate = async ({ lat, lon }) => {
    try {
      setErr(''); setLoading(true);
      const [cRes, fRes] = await Promise.all([
        weatherApi.getCurrentByCoords(lat, lon),
        weatherApi.getForecastByCoords(lat, lon)
      ]);
      setCurrent(cRes.data);
      setForecast(fRes.data.forecast || []);
    } catch (e) {
      setErr(e.response?.data?.message || 'Could not fetch weather for your location');
    } finally { setLoading(false); }
  };

  return (
    <div className="container">
      <header><h1>Weather Web App</h1></header>

      <div style={{display:'flex', alignItems:'center', gap:8}}>
        <div style={{flex:1,display:'flex'}}>
          <WeatherSearch onSearch={doSearch}/>
        </div>
        <GeolocateButton onLocate={doLocate} />
      </div>

      {loading && <p>Loading…</p>}
      {err && <p className="error">{err}</p>}
      <CurrentWeather data={current} />
      <Forecast forecast={forecast} />
      <footer>Minor Project — Weather Web App</footer>
    </div>
  );
}

export default App;
