import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Home.css";

const AIRecommendation = () => {
  const navigate = useNavigate();
  const [destinationType, setDestinationType] = useState("");
  const [preferredClimate, setPreferredClimate] = useState("");
  const [budget, setBudget] = useState("");
  const [tripDuration, setTripDuration] = useState("");
  const [error, setError] = useState("");

  const handleGetRecommendations = () => {
    // Validate that all fields are filled
    if (!destinationType || !preferredClimate || !budget || !tripDuration) {
      setError("Please fill in all fields before getting recommendations.");
      return;
    }
    
    // Clear any previous error
    setError("");
    
    // Store the form data in localStorage to access it on the recommendations page
    localStorage.setItem("recommendationData", JSON.stringify({
      destinationType,
      preferredClimate,
      budget,
      tripDuration
    }));
    
    // Navigate to the recommendations page
    navigate("/recommendations");
  };

  return (
    <div className="ai-recommendation">
      <h3>AI Travel Recommendations</h3>
      {error && <div className="error-message">{error}</div>}
      <input
        type="text"
        placeholder="Enter Destination Type (e.g., Beach, Mountains)"
        value={destinationType}
        onChange={(e) => setDestinationType(e.target.value)}
        className="ai-input"
      />
      <input
        type="text"
        placeholder="Preferred Climate (e.g., Warm, Cold)"
        value={preferredClimate}
        onChange={(e) => setPreferredClimate(e.target.value)}
        className="ai-input"
      />
      <input
        type="number"
        placeholder="Enter Budget in USD"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        className="ai-input"
      />
      <input
        type="number"
        placeholder="Trip Duration in Days"
        value={tripDuration}
        onChange={(e) => setTripDuration(e.target.value)}
        className="ai-input"
      />
      <button onClick={handleGetRecommendations} className="recommend-btn">
        Get Recommendations
      </button>
    </div>
  );
};

export default AIRecommendation;
