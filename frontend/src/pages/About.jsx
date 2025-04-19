import React from "react";
import { useNavigate } from "react-router-dom";
import "../About.css";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <nav className="navbar">
        <h1 className="brand">Bon Voyage</h1>
        <div className="nav-buttons">
          <button className="btn" onClick={() => navigate("/home")}>
            Home
          </button>
          <button className="btn active" onClick={() => navigate("/about")}>
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

      <div className="about-container">
        <div className="about-header">
          <h1>Discover Bon Voyage</h1>
          <p className="tagline">Where AI Meets Adventure</p>
        </div>

        <div className="about-content">
          <section className="vision-section">
            <h2>Our Vision</h2>
            <div className="vision-content">
              <div className="vision-text">
                <p>
                  At Bon Voyage, we envision a world where travel planning is as
                  exciting as the journey itself. Our vision is to revolutionize
                  the way people explore the world by making personalized travel
                  experiences accessible to everyone.
                </p>
                <p>
                  We believe in harnessing the power of artificial intelligence to
                  create meaningful connections between travelers and destinations,
                  ensuring every journey is unique, memorable, and perfectly
                  tailored to individual preferences.
                </p>
              </div>
              <div className="vision-stats">
                <div className="stat-item">
                  <span className="stat-number">10K+</span>
                  <span className="stat-label">Happy Travelers</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">150+</span>
                  <span className="stat-label">Destinations</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">AI Support</span>
                </div>
              </div>
            </div>
          </section>

          <section className="features-section">
            <h2>Why Choose Bon Voyage?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3>Personalized Planning</h3>
                <p>
                  Our AI analyzes your preferences to suggest destinations and
                  experiences that match your travel style perfectly.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🌤️</div>
                <h3>Smart Weather Insights</h3>
                <p>
                  Get real-time weather forecasts and climate trends to plan your
                  trip at the perfect time.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">💡</div>
                <h3>Travel Intelligence</h3>
                <p>
                  Access local insights, hidden gems, and travel tips curated by our
                  advanced AI system.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔄</div>
                <h3>Seamless Experience</h3>
                <p>
                  From planning to booking, enjoy a smooth and intuitive journey
                  with our user-friendly platform.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">💰</div>
                <h3>Best Price Guarantee</h3>
                <p>
                  Our AI constantly monitors prices to ensure you get the best deals
                  on flights, hotels, and activities.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🌱</div>
                <h3>Sustainable Travel</h3>
                <p>
                  Eco-friendly travel options and carbon footprint tracking to help
                  you make environmentally conscious travel decisions.
                </p>
              </div>
            </div>
          </section>

          <section className="contact-section">
            <h2>Start Your Journey</h2>
            <p>
              Ready to explore the world with an intelligent travel companion?
              We're here to help you create unforgettable memories.
            </p>
            <div className="contact-info">
              <p>📧 Email: hello@bonvoyage.com</p>
              <p>📱 Phone: +91 98xxxxxxxx </p>
              <p>📍 Location: New Delhi, IN</p>
            </div>
            <button className="cta-button" onClick={() => navigate("/home")}>
              Plan Your Trip
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About; 