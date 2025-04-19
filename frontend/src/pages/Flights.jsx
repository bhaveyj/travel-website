import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Flights.css';

const Flights = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    adults: 1,
    children: 0,
    infants: 0,
    cabinClass: 'ECONOMY'
  });
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const searchFlights = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to search flights');
        setLoading(false);
        return;
      }
      const API_URL = import.meta.env.VITE_BACKEND_URL;

      const response = await axios.post(`${API_URL}/api/flights/search`, searchParams, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Handle the response data format
      const flightData = response.data;
      if (flightData && Array.isArray(flightData.itineraries)) {
        setFlights(flightData.itineraries);
      } else {
        setFlights([]);
        setError('No flights found for your search criteria');
      }
    } catch (err) {
      console.error('Flight search error:', err);
      if (err.response?.status === 401) {
        setError('Please login to search flights');
      } else if (err.response?.status === 404) {
        setError('Flight search service is currently unavailable');
      } else {
        setError(err.response?.data?.error || 'Error searching flights. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flights-page">
      <nav className="navbar">
        <h1 className="brand">Bon Voyage</h1>
        <div className="nav-buttons">
          <button className="btn" onClick={() => navigate('/home')}>Home</button>
          <button className="btn" onClick={() => navigate('/about')}>About</button>
          <button className="btn" onClick={() => navigate('/blog')}>Blog</button>
          <button className="btn active" onClick={() => navigate('/flights')}>Flights</button>
        </div>
      </nav>

      <div className="flights-container">
        <div className="search-section">
          <h2>Search Flights</h2>
          <form onSubmit={searchFlights} className="search-form">
            <div className="form-group">
              <input
                type="text"
                name="origin"
                placeholder="From (City or Airport)"
                value={searchParams.origin}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="destination"
                placeholder="To (City or Airport)"
                value={searchParams.destination}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="date"
                name="departureDate"
                value={searchParams.departureDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="date"
                name="returnDate"
                value={searchParams.returnDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <select
                name="cabinClass"
                value={searchParams.cabinClass}
                onChange={handleInputChange}
              >
                <option value="ECONOMY">Economy</option>
                <option value="PREMIUM_ECONOMY">Premium Economy</option>
                <option value="BUSINESS">Business</option>
                <option value="FIRST">First Class</option>
              </select>
            </div>
            <div className="form-group passengers">
              <div>
                <label>Adults</label>
                <input
                  type="number"
                  name="adults"
                  min="1"
                  max="9"
                  value={searchParams.adults}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Children</label>
                <input
                  type="number"
                  name="children"
                  min="0"
                  max="9"
                  value={searchParams.children}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Infants</label>
                <input
                  type="number"
                  name="infants"
                  min="0"
                  max="9"
                  value={searchParams.infants}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <button type="submit" className="search-btn" disabled={loading}>
              {loading ? 'Searching...' : 'Search Flights'}
            </button>
          </form>
        </div>

        <div className="results-section">
          {error && <div className="error-message">{error}</div>}
          {loading && <div className="loading">Searching for flights...</div>}
          {flights.length > 0 && (
            <div className="flight-results">
              <h2>Available Flights</h2>
              <div className="flight-cards">
                {flights.map((flight, index) => (
                  <div key={index} className="flight-card">
                    <div className="flight-header">
                      <h3>{flight.legs[0].carriers[0].name}</h3>
                      <span className="flight-number">{flight.legs[0].carriers[0].code} {flight.legs[0].carriers[0].number}</span>
                    </div>
                    <div className="flight-details">
                      <div className="flight-times">
                        <div className="departure">
                          <h4>Departure</h4>
                          <p>{new Date(flight.legs[0].departure).toLocaleTimeString()}</p>
                          <p>{flight.legs[0].origin.code}</p>
                        </div>
                        <div className="duration">
                          <p>{Math.floor(flight.legs[0].durationInMinutes / 60)}h {flight.legs[0].durationInMinutes % 60}m</p>
                          <div className="flight-line"></div>
                        </div>
                        <div className="arrival">
                          <h4>Arrival</h4>
                          <p>{new Date(flight.legs[0].arrival).toLocaleTimeString()}</p>
                          <p>{flight.legs[0].destination.code}</p>
                        </div>
                      </div>
                      <div className="flight-price">
                        <p className="price">${flight.price.total}</p>
                        <p className="price-details">per passenger</p>
                      </div>
                    </div>
                    <button className="book-button">Book Now</button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {!loading && !error && flights.length === 0 && (
            <div className="no-results">
              <p>No flights found. Try adjusting your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Flights; 