# Weather Web App (Minor Project) - Geo version

## Project Title & Objective
**Title:** Weather Web App (with Geolocation)  
**Objective:** Build a compact full-stack weather application that fetches and displays current weather and a 5-day forecast for a searched city or the user's device location. The backend proxies requests to OpenWeatherMap to keep the API key secret on the server side.

---

## Live Demo Links
- **Backend (Render):** https://weather-web-app-1-znh5.onrender.com  
- **Frontend (Vercel):** https://weather-web-pg4fta2e1-swaggersamantaray-9948s-projects.vercel.app

---

## Setup Quick Start

### Backend
```bash
cd server
cp .env.example .env
# set OPENWEATHER_API_KEY in .env
npm install
npm run dev
```

### Frontend (local)
```bash
cd client
echo REACT_APP_API_URL=http://localhost:5000/api > .env.development
npm install
npm start
```

---
Add screenshots in `screenshots/` folder and push to GitHub. Do not commit `.env` files.


## Update
Added Confirm UI for Geolocation showing coords and accuracy before fetching weather.
