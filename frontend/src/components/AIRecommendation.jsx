import React, { useState } from "react";

const AIRecommendation = () => {
  const [prompt, setPrompt] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token"); // Assuming token is stored in localStorage after login

  const fetchRecommendations = async () => {
    if (!token) {
      alert("You must be logged in to use this feature!");
      return;
    }

    setLoading(true);
    setRecommendations("");

    try {
      const response = await fetch("/api/ai/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (response.ok) {
        setRecommendations(data.recommendations);
      } else {
        setRecommendations("Error: " + data.error);
      }
    } catch (error) {
      console.error("Request failed:", error);
      setRecommendations("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", textAlign: "center" }}>
      <h2>AI Travel Recommendations</h2>
      
      <textarea
        rows="3"
        placeholder="Enter your prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />

      <button onClick={fetchRecommendations} disabled={loading} style={{ padding: "10px", cursor: "pointer" }}>
        {loading ? "Loading..." : "Get Recommendations"}
      </button>

      {recommendations && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc", background: "#f9f9f9" }}>
          <strong>AI Response:</strong>
          <p>{recommendations}</p>
        </div>
      )}
    </div>
  );
};

export default AIRecommendation;
