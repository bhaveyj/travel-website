import React, { useState } from "react";
import "../Home.css"; // Ensure you import the CSS file

const AIRecommendation = () => {
  const [destinationType, setDestinationType] = useState("");
  const [preferredClimate, setPreferredClimate] = useState("");
  const [budget, setBudget] = useState("");
  const [tripDuration, setTripDuration] = useState("");
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to use this feature!");
      return;
    }

    setLoading(true);
    setRecommendations(null);

    try {
      const response = await fetch("http://localhost:5000/api/ai/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ destinationType, preferredClimate, budget, tripDuration }),
      });

      const data = await response.json();
      if (response.ok) {
        setRecommendations(data);
      } else {
        setRecommendations({ error: data.error });
      }
    } catch (error) {
      console.error("Request failed:", error);
      setRecommendations({ error: "An error occurred. Please try again." });
    }

    setLoading(false);
  };

  return (
    <div className="ai-recommendation">
      <h3>AI Travel Recommendations</h3>

      {/* Destination Type Input */}
      <input
        type="text"
        placeholder="Enter Destination Type (e.g., Beach, Mountains)"
        value={destinationType}
        onChange={(e) => setDestinationType(e.target.value)}
        className="ai-input"
      />

      {/* Climate Preference Input */}
      <input
        type="text"
        placeholder="Preferred Climate (e.g., Warm, Cold)"
        value={preferredClimate}
        onChange={(e) => setPreferredClimate(e.target.value)}
        className="ai-input"
      />

      {/* Budget Input */}
      <input
        type="number"
        placeholder="Enter Budget in USD"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        className="ai-input"
      />

      {/* Trip Duration Input */}
      <input
        type="number"
        placeholder="Trip Duration in Days"
        value={tripDuration}
        onChange={(e) => setTripDuration(e.target.value)}
        className="ai-input"
      />

      {/* Fetch AI Recommendations Button */}
      <button onClick={fetchRecommendations} disabled={loading} className="recommend-btn">
        {loading ? "Loading..." : "Get Recommendations"}
      </button>

      {/* Display AI Response */}
      {recommendations && (
        <div className="recommendation-box">
          {recommendations.error ? (
            <p style={{ color: "red" }}>{recommendations.error}</p>
          ) : (
            <>
              <h4>{recommendations.name}</h4>
              <p className="estimated-budget"><strong>Estimated Budget:</strong> {recommendations.estimatedBudget} USD</p>
              <p><strong>Places to Visit:</strong></p>
              <ul>
                {recommendations.placesToVisit.map((place, index) => (
                  <li key={index}>{place}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AIRecommendation;
