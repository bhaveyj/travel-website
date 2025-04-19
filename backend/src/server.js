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

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
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
