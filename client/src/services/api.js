import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const client = axios.create({ baseURL: API_URL });

export const weatherApi = {
  getCurrent: (city) => client.get(`/weather/current?q=${encodeURIComponent(city)}`),
  getForecast: (city) => client.get(`/weather/forecast?q=${encodeURIComponent(city)}`),
  getCurrentByCoords: (lat, lon) => client.get(`/weather/current?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`),
  getForecastByCoords: (lat, lon) => client.get(`/weather/forecast?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`)
};

export default client;
