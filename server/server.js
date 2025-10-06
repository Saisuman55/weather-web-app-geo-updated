const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const weatherCtrl = require('./controllers/weatherController');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/weather/current', weatherCtrl.getCurrent);
app.get('/api/weather/forecast', weatherCtrl.getForecast);
app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
