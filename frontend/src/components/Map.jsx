import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const WeatherMiniMap = () => {
  const openWeatherTileUrl = `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=6275dc61d23c72dd11418c151cffd560`;

  return (
    <div>
      <h3 style={{ 
        textAlign: "center", 
        marginBottom: "10px", 
        color: "#333",
        fontSize: "20px",
        fontWeight: "600"
      }}>
        Heatmap
      </h3>
      <div style={{ width: "300px", height: "200px", borderRadius: "10px", overflow: "hidden", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" }}>
        <MapContainer center={[20, 0]} zoom={1.5} style={{ width: "100%", height: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <TileLayer url={openWeatherTileUrl} />
        </MapContainer>
      </div>
    </div>
  );
};

export default WeatherMiniMap;
