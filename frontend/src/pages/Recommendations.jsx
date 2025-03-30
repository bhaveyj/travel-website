import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Recommendations.css";

const Recommendations = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  
  useEffect(() => {
    if (!location.state || !location.state.preferences) {
      navigate("/");
      return;
    }

    const fetchRecommendations = async () => {
      try {
        const API_KEY = "YOUR_GEMINI_API_KEY"; // Replace with actual key
        const response = await axios.post(
          "https://api.gemini.google.com/v1/travel-recommendations",
          {
            preferences: location.state.preferences,
          },
          { headers: { Authorization: `Bearer ${API_KEY}` } }
        );
        setRecommendations(response.data.recommendations.slice(0, 3));
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, [location, navigate]);

  return (
    <div className="recommendations-container">
      <h2>Your Travel Recommendations</h2>
      {recommendations.length > 0 ? (
        recommendations.map((rec, index) => (
          <div key={index} className="recommendation-card">
            <h4>{rec.name}</h4>
            <p>Places to Visit: {rec.places.join(", ")}</p>
            <p>Estimated Budget: {rec.budget}</p>
          </div>
        ))
      ) : (
        <p>Loading recommendations...</p>
      )}
      <button onClick={() => navigate("/")}>Go Back</button>
    </div>
  );
};

export default Recommendations;
