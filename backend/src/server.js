import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import authRoute from "./routes/authRoute.js";
import aiRoute from "./routes/aiRoute.js";
import currencyRoute from "./routes/currencyRoute.js";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/ai", aiRoute);
app.use("/api/currency", currencyRoute);

app.get("/", (req, res) => {
  res.send("Welcome to AI Travel API! 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
