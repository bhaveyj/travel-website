import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Home.css";
import AIRecommendation from "../components/AIRecommendation";
import WeatherMiniMap from "../components/Map";

const Home = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [converted, setConverted] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const convertCurrency = async () => {
    if (!amount) {
      alert("Please enter an amount");
      return;
    }

    try {
      const API_KEY = "376f648e7a4eef13bd519ef3";
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`
      );

      const rate = response.data.conversion_rates[toCurrency];
      setConverted((amount * rate).toFixed(2) + " " + toCurrency);
    } catch (error) {
      console.error("Error fetching conversion rate:", error);
      setConverted("Conversion failed");
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="brand">Bon Voyage</h1>
        <button className="btn" onClick={() => window.location.reload()}>
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

        {user ? (
          <div>
            <span className="welcome-text">Welcome, {user}</span>
            <button
              className="login-btn"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.reload();
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <button className="login-btn" onClick={() => navigate("/register")}>
            Login
          </button>
        )}
      </nav>
      

      {/* Welcome Heading and Subtext */}
      <div className="welcome-heading-container">
        <h2 className="welcome-heading">Welcome to Bon Voyage!</h2>
        <p className="welcome-subtext">
          Your one-stop destination for personalized travel recommendations.
        </p>
      </div>

      {/* Home Content */}
      <div className="home-container">
        <div className="map-container">
          <WeatherMiniMap />
        </div>
        <div className="ai-recommendation-container">
          <AIRecommendation />
        </div>
        <div className="currency-converter">
          <h3>Currency Converter</h3>
          <div className="converter-inputs">
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CHF">CHF - Swiss Franc</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="SGD">SGD - Singapore Dollar</option>
              <option value="NZD">NZD - New Zealand Dollar</option>
              <option value="MXN">MXN - Mexican Peso</option>
              <option value="HKD">HKD - Hong Kong Dollar</option>
              <option value="TRY">TRY - Turkish Lira</option>
              <option value="KRW">KRW - South Korean Won</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="RUB">RUB - Russian Ruble</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CHF">CHF - Swiss Franc</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="SGD">SGD - Singapore Dollar</option>
              <option value="NZD">NZD - New Zealand Dollar</option>
              <option value="MXN">MXN - Mexican Peso</option>
              <option value="HKD">HKD - Hong Kong Dollar</option>
              <option value="TRY">TRY - Turkish Lira</option>
              <option value="KRW">KRW - South Korean Won</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="RUB">RUB - Russian Ruble</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
            <button onClick={convertCurrency} className="convert-btn">
              Convert
            </button>
          </div>
          {converted && <p className="converted-text">≈ {converted}</p>}
        </div>
      </div>

      {/* Featured Destinations Section */}
      <div className="featured-section">
        <h2 className="section-title">Featured Destinations</h2>
        <div className="destinations-grid">
          <div className="destination-card">
            <div className="destination-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')" }}></div>
            <div className="destination-info">
              <h3>Bali, Indonesia</h3>
              <p>Tropical paradise with beautiful beaches, rich culture, and stunning landscapes.</p>
              <div className="destination-meta">
                <span>Best Time: April-October</span>
                <span>Avg. Cost: $50-100/day</span>
              </div>
            </div>
          </div>
          <div className="destination-card">
            <div className="destination-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')" }}></div>
            <div className="destination-info">
              <h3>Paris, France</h3>
              <p>The city of love, art, fashion, and gastronomy with iconic landmarks.</p>
              <div className="destination-meta">
                <span>Best Time: April-June, Sept-Oct</span>
                <span>Avg. Cost: $150-200/day</span>
              </div>
            </div>
          </div>
          <div className="destination-card">
            <div className="destination-image" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')" }}></div>
            <div className="destination-info">
              <h3>Tokyo, Japan</h3>
              <p>A fascinating blend of traditional culture and cutting-edge technology.</p>
              <div className="destination-meta">
                <span>Best Time: March-May, Sept-Nov</span>
                <span>Avg. Cost: $100-150/day</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Travel Tips Section */}
      <div className="travel-tips-section">
        <h2 className="section-title">Travel Tips</h2>
        <div className="tips-container">
          <div className="tip-card">
            <div className="tip-icon">✈️</div>
            <h3>Booking Flights</h3>
            <p>Book flights 6-8 weeks in advance for the best prices. Consider flying on weekdays for lower fares.</p>
          </div>
          <div className="tip-card">
            <div className="tip-icon">🏨</div>
            <h3>Finding Accommodations</h3>
            <p>Look for accommodations in less touristy areas for better prices. Read reviews carefully before booking.</p>
          </div>
          <div className="tip-card">
            <div className="tip-icon">💰</div>
            <h3>Budgeting</h3>
            <p>Set a daily budget and track your expenses. Look for free activities and local food options to save money.</p>
          </div>
          <div className="tip-card">
            <div className="tip-icon">📱</div>
            <h3>Travel Apps</h3>
            <p>Download offline maps, translation apps, and local transportation apps before your trip.</p>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="newsletter-section">
        <h2 className="section-title">Stay Updated</h2>
        <p className="newsletter-text">Subscribe to our newsletter for travel tips, deals, and destination guides.</p>
        <div className="newsletter-form">
          <input type="email" placeholder="Enter your email" className="newsletter-input" />
          <button className="newsletter-btn">Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default Home;