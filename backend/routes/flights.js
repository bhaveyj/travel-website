const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

// Search flights
router.post('/search', verifyToken, async (req, res) => {
    try {
        // Mock response for testing
        const mockFlights = {
            itineraries: [
                {
                    legs: [{
                        carriers: [{
                            name: "Emirates",
                            code: "EK",
                            number: "123"
                        }],
                        departure: "2024-04-20T10:00:00",
                        arrival: "2024-04-20T14:00:00",
                        origin: { code: "DXB" },
                        destination: { code: "LHR" },
                        durationInMinutes: 240
                    }],
                    price: { total: "599.99" }
                },
                {
                    legs: [{
                        carriers: [{
                            name: "Qatar Airways",
                            code: "QR",
                            number: "456"
                        }],
                        departure: "2024-04-20T12:00:00",
                        arrival: "2024-04-20T16:00:00",
                        origin: { code: "DXB" },
                        destination: { code: "LHR" },
                        durationInMinutes: 240
                    }],
                    price: { total: "649.99" }
                }
            ]
        };
        
        res.json(mockFlights);
    } catch (error) {
        console.error('Flight search error:', error);
        res.status(500).json({ error: 'Error searching flights' });
    }
});

// Get popular destinations
router.get('/popular-destinations', verifyToken, async (req, res) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://skyscanner44.p.rapidapi.com/popular-destinations',
            headers: {
                'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
        res.json(response.data);
    } catch (error) {
        console.error('Popular destinations error:', error);
        res.status(500).json({ error: 'Error fetching popular destinations' });
    }
});

// Get flight price history
router.get('/price-history', verifyToken, async (req, res) => {
    try {
        const { origin, destination, departureDate } = req.query;

        const options = {
            method: 'GET',
            url: 'https://skyscanner44.p.rapidapi.com/price-history',
            params: {
                origin,
                destination,
                departureDate
            },
            headers: {
                'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
        res.json(response.data);
    } catch (error) {
        console.error('Price history error:', error);
        res.status(500).json({ error: 'Error fetching price history' });
    }
});

module.exports = router; 