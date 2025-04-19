import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Recommendations.css";

const Recommendations = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("recommendationData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFormData(parsedData);
      fetchRecommendations(parsedData);
    } else {
      navigate("/home");
    }
  }, [navigate]);

  const API_URL = import.meta.env.VITE_BACKEND_URL + "/api/ai/recommend";


  const fetchRecommendations = async (data) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to use this feature!");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (response.ok) {
        setRecommendations(responseData);
      } else {
        setRecommendations({ error: responseData.error });
      }
    } catch (error) {
      console.error("Request failed:", error);
      setRecommendations({ error: "An error occurred. Please try again." });
    }

    setLoading(false);
  };

  return (
    <div className="recommendations-page">
      <nav className="navbar">
        <h1 className="brand" onClick={() => navigate("/home")}>Bon Voyage</h1>
        <div className="nav-buttons">
          <button className="btn" onClick={() => navigate("/home")}>
            Home
          </button>
          <button className="btn" onClick={() => navigate("/about")}>
            About
          </button>
          <button className="btn" onClick={() => navigate("/blog")}>
            Blog
          </button>
          <button className="btn" onClick={() => navigate("/flights")}>
            Flights
          </button>
        </div>
      </nav>

      <div className="recommendations-container">
        <div className="recommendations-form">
          <h2>Your Travel Preferences</h2>
          {formData && (
            <div className="preferences-display">
              <div className="preference-item">
                <h4>Destination Type</h4>
                <p>{formData.destinationType}</p>
              </div>
              <div className="preference-item">
                <h4>Preferred Climate</h4>
                <p>{formData.preferredClimate}</p>
              </div>
              <div className="preference-item">
                <h4>Budget</h4>
                <p>${formData.budget}</p>
              </div>
              <div className="preference-item">
                <h4>Trip Duration</h4>
                <p>{formData.tripDuration} days</p>
              </div>
              <button onClick={() => navigate("/home")} className="back-btn">
                Back to Home
              </button>
            </div>
          )}
        </div>

        <div className="recommendation-results">
          <h2>Your Personalized Recommendations</h2>
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Generating your personalized recommendations...</p>
            </div>
          ) : recommendations ? (
            recommendations.error ? (
              <div className="error-message">{recommendations.error}</div>
            ) : (
              <div className="recommendation-card">
                <h3>{recommendations.name}</h3>
                <div className="budget-section">
                  <h4>Estimated Budget</h4>
                  <p className="budget-amount">{recommendations.estimatedBudget} </p>
                </div>
                <div className="places-section">
                  <h4>Places to Visit</h4>
                  <ul>
                    {recommendations.placesToVisit.map((place, index) => (
                      <li key={index}>{place}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Recommendations; 