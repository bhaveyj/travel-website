import express from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

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
        const {
            origin,
            destination,
            departureDate,
            returnDate,
            adults,
            children,
            infants,
            cabinClass
        } = req.body;

        // Generate different flight options based on search parameters
        const airlines = [
            { name: "Emirates", code: "EK" },
            { name: "Qatar Airways", code: "QR" },
            { name: "Etihad Airways", code: "EY" },
            { name: "Turkish Airlines", code: "TK" },
            { name: "Lufthansa", code: "LH" }
        ];

        // Generate 3-5 random flights
        const numFlights = Math.floor(Math.random() * 3) + 3; // 3 to 5 flights
        const flights = [];

        for (let i = 0; i < numFlights; i++) {
            const airline = airlines[Math.floor(Math.random() * airlines.length)];
            const basePrice = cabinClass === 'ECONOMY' ? 500 : 
                            cabinClass === 'PREMIUM_ECONOMY' ? 800 :
                            cabinClass === 'BUSINESS' ? 1500 : 2500;
            
            // Add some randomness to price
            const price = (basePrice + Math.random() * 200).toFixed(2);
            
            // Generate random departure time between 6 AM and 10 PM
            const departureHour = 6 + Math.floor(Math.random() * 16);
            const departureTime = new Date(departureDate);
            departureTime.setHours(departureHour, Math.floor(Math.random() * 60), 0);
            
            // Flight duration between 1 and 8 hours
            const durationHours = 1 + Math.floor(Math.random() * 7);
            const durationMinutes = Math.floor(Math.random() * 60);
            const arrivalTime = new Date(departureTime);
            arrivalTime.setHours(departureTime.getHours() + durationHours);
            arrivalTime.setMinutes(departureTime.getMinutes() + durationMinutes);

            flights.push({
                legs: [{
                    carriers: [{
                        name: airline.name,
                        code: airline.code,
                        number: `${Math.floor(Math.random() * 900) + 100}`
                    }],
                    departure: departureTime.toISOString(),
                    arrival: arrivalTime.toISOString(),
                    origin: { code: origin.toUpperCase() },
                    destination: { code: destination.toUpperCase() },
                    durationInMinutes: durationHours * 60 + durationMinutes
                }],
                price: { 
                    total: price,
                    currency: "USD"
                }
            });
        }

        // Sort flights by price
        flights.sort((a, b) => parseFloat(a.price.total) - parseFloat(b.price.total));
        
        res.json({ itineraries: flights });
    } catch (error) {
        console.error('Flight search error:', error);
        res.status(500).json({ error: 'Error searching flights' });
    }
});

export default router; 