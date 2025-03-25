import express from "express";
import { getAIRecommendations } from "../controllers/aiController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/recommend",authenticate,  getAIRecommendations);

export default router;
