const axios = require('axios');
const OPENWEATHER_KEY = process.env.OPENWEATHER_API_KEY;
const BASE = 'https://api.openweathermap.org/data/2.5';

function kelvinToCelsius(k){ return +(k - 273.15).toFixed(1); }

function buildQuery(params){
  if(params.q) return `q=${encodeURIComponent(params.q)}`;
  if(params.lat && params.lon) return `lat=${encodeURIComponent(params.lat)}&lon=${encodeURIComponent(params.lon)}`;
  return '';
}

exports.getCurrent = async (req, res) => {
  try {
    const { q, lat, lon } = req.query;
    const qstr = buildQuery({ q, lat, lon });
    if(!qstr) return res.status(400).json({ message: 'Provide q=city or lat & lon' });

    const url = `${BASE}/weather?${qstr}&appid=${OPENWEATHER_KEY}`;
    const r = await axios.get(url);
    const d = r.data;
    const payload = {
      city: d.name,
      country: d.sys?.country,
      temp: kelvinToCelsius(d.main.temp),
      description: d.weather?.[0]?.description,
      humidity: d.main.humidity,
      wind: d.wind.speed,
      raw: d
    };
    res.json(payload);
  } catch (err) {
    res.status(err.response?.status || 500).json({ message: err.response?.data?.message || err.message });
  }
};

exports.getForecast = async (req, res) => {
  try {
    const { q, lat, lon } = req.query;
    const qstr = buildQuery({ q, lat, lon });
    if(!qstr) return res.status(400).json({ message: 'Provide q=city or lat & lon' });

    const url = `${BASE}/forecast?${qstr}&appid=${OPENWEATHER_KEY}`;
    const r = await axios.get(url);
    const list = r.data.list || [];

    const daily = {};
    list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const day = date.toISOString().slice(0,10);
      if (!daily[day]) daily[day] = [];
      daily[day].push(item);
    });

    const result = Object.keys(daily).slice(0,5).map(day => {
      const arr = daily[day];
      const temps = arr.map(i => i.main.temp);
      const avgK = temps.reduce((a,b)=>a+b,0)/temps.length;
      const descriptions = arr.map(i => i.weather[0].description);
      const main = descriptions.sort((a,b) =>
        descriptions.filter(x=>x===a).length - descriptions.filter(x=>x===b).length
      ).pop();
      return {
        date: day,
        avgTempC: +(avgK - 273.15).toFixed(1),
        description: main
      };
    });

    res.json({ city: r.data.city, forecast: result });
  } catch (err) {
    res.status(err.response?.status || 500).json({ message: err.response?.data?.message || err.message });
  }
};
