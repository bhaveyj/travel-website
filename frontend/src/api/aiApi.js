const API_URL = "http://localhost:5000/api/ai/recommend";

export const getRecommendations = async (userInput) => {
  const token = localStorage.getItem("token");  // Get the saved token

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,  // Send token
      },
      body: JSON.stringify(userInput),
    });

    return await response.json();
  } catch (error) {
    console.error("Error fetching AI recommendations:", error);
    return { error: "Failed to get recommendations" };
  }
};
