import dotenv from 'dotenv';
import express from 'express';
import axios from 'axios';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());

const PORT = 5000;

const WEATHER_TILE_URL = `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${process.env.OPENWEATHER_API_KEY}`;

app.get("/weather-map", (req, res) => {
  res.json({ tileUrl: WEATHER_TILE_URL });
});

app.listen(PORT, () => console.log(`🌍 Server running on http://localhost:${PORT}`));
