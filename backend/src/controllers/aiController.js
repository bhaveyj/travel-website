// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from "dotenv";

// dotenv.config();
// const genAI = new GoogleGenerativeAI(process.env.OPENAI_API_KEY);

// export const getAIRecommendations = async (req, res) => {
//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//     const userPrompt = req.body.prompt || "Recommend a travel destination for adventure seekers";
//     const response = await model.generateContent(userPrompt);

//     res.json({ recommendations: response.response.text() });
//   } catch (error) {
//     console.error("Gemini API error:", error);
//     res.status(500).json({ error: "Failed to fetch AI recommendations" });
//   }
// };
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.OPENAI_API_KEY);

export const getAIRecommendations = async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const { destinationType, preferredClimate, budget, tripDuration } = req.body;

    const formattedPrompt = `
      Suggest a travel destination based on these preferences:
      - Type: ${destinationType}
      - Climate: ${preferredClimate}
      - Budget: ${budget}
      - Duration: ${tripDuration}
      Provide the response in JSON format like this:
      {
        "name": "Destination Name",
        "placesToVisit": ["Place 1", "Place 2", "Place 3"],
        "estimatedBudget": "Estimated budget in "
      }
    `;

    const response = await model.generateContent(formattedPrompt);
    
    let textResponse = response.response.text();

    // ✅ Remove backticks and "```json" if present
    textResponse = textResponse.replace(/```json|```/g, "").trim();

    let recommendations;
    try {
      recommendations = JSON.parse(textResponse);
    } catch (error) {
      console.error("Failed to parse AI response:", error);
      return res.status(500).json({ error: "Invalid AI response format" });
    }

    res.json(recommendations);
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Failed to fetch AI recommendations" });
  }
};
