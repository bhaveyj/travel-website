// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { PrismaClient } from "@prisma/client";
// import authRoute from "./routes/authRoute.js";
// import aiRoute from "./routes/aiRoute.js";
// import currencyRoute from "./routes/currencyRoute.js";
// import flightsRoute from "./routes/flightsRoute.js";

// dotenv.config();
// const app = express();
// const prisma = new PrismaClient();

// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//   })
// );
// app.use(express.json());

// app.use("/api/auth", authRoute);
// app.use("/api/ai", aiRoute);
// app.use("/api/currency", currencyRoute);
// app.use("/api/flights", flightsRoute);

// app.get("/", (req, res) => {
//   res.send("Welcome to AI Travel API! 🚀");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import authRoute from "./routes/authRoute.js";
import aiRoute from "./routes/aiRoute.js";
import currencyRoute from "./routes/currencyRoute.js";
import flightsRoute from "./routes/flightsRoute.js";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

// Allowed Origins (can include both local and production URLs)
const allowedOrigins = [
  "http://localhost:3000",  // For local development
  "https://travel-website-five-zeta.vercel.app",  // Production URL (Vercel)
];

// CORS middleware to allow specific origins and handle credentials
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        // !origin allows requests from Postman or similar tools
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,  // Allow credentials (cookies) to be sent with the request
  })
);

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/ai", aiRoute);
app.use("/api/currency", currencyRoute);
app.use("/api/flights", flightsRoute);

app.get("/", (req, res) => {
  res.send("Welcome to AI Travel API! 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
