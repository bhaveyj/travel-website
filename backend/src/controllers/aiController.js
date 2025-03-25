import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.OPENAI_API_KEY);

export const getAIRecommendations = async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const userPrompt = req.body.prompt || "Recommend a travel destination for adventure seekers";
    const response = await model.generateContent(userPrompt);

    res.json({ recommendations: response.response.text() });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Failed to fetch AI recommendations" });
  }
};
