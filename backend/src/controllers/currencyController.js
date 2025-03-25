import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const convertCurrency = async (req, res) => {
  try {
    const { from, to, amount } = req.body;

    if (!from || !to || !amount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const apiKey = process.env.CURRENCY_API_KEY;
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`;

    const response = await axios.get(url);
    const rate = response.data.conversion_rates[to];

    if (!rate) {
      return res.status(400).json({ error: "Invalid currency code" });
    }

    const convertedAmount = (amount * rate).toFixed(2);
    res.json({ from, to, amount, convertedAmount, rate });
  } catch (error) {
    console.error("Currency conversion error:", error);
    res.status(500).json({ error: "Failed to convert currency" });
  }
};
