// // // import React, { useState, useEffect } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import axios from "axios";
// // // import "../Home.css";

// // // const Home = () => {
// // //   const navigate = useNavigate();
// // //   const [amount, setAmount] = useState("");
// // //   const [fromCurrency, setFromCurrency] = useState("USD");
// // //   const [toCurrency, setToCurrency] = useState("INR");
// // //   const [converted, setConverted] = useState("");
// // //   const [user, setUser] = useState(null);

// // //   useEffect(() => {
// // //     // Check if user is logged in
// // //     const storedUser = localStorage.getItem("user");
// // //     if (storedUser) {
// // //       setUser(storedUser);
// // //     }
// // //   }, []);

// // //   const convertCurrency = async () => {
// // //     if (!amount) {
// // //       alert("Please enter an amount");
// // //       return;
// // //     }

// // //     try {
// // //       const API_KEY = "376f648e7a4eef13bd519ef3"; // Replace with actual API key
// // //       const response = await axios.get(
// // //         `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`
// // //       );

// // //       const rate = response.data.conversion_rates[toCurrency];
// // //       setConverted((amount * rate).toFixed(2) + " " + toCurrency);
// // //     } catch (error) {
// // //       console.error("Error fetching conversion rate:", error);
// // //       setConverted("Conversion failed");
// // //     }
// // //   };

// // //   return (
// // //     <div>
// // //       {/* Navbar */}
// // //       <nav className="navbar">
// // //         <h1 className="brand">Bon Voyage</h1>
// // //         {user ? (
// // //           <div>
// // //             <span className="welcome-text">Welcome, {user}</span>
// // //             <button
// // //               className="login-btn"
// // //               onClick={() => {
// // //                 localStorage.removeItem("token");
// // //                 localStorage.removeItem("user");
// // //                 window.location.reload();
// // //               }}
// // //             >
// // //               Logout
// // //             </button>
// // //           </div>
// // //         ) : (
// // //           <button className="login-btn" onClick={() => navigate("/register")}>
// // //             Login
// // //           </button>
// // //         )}
// // //       </nav>
// // //       <img src="/bgg.jpg" className="background-image" alt="Background" />

// // //       {/* Home Content */}
// // //       <div className="home-container">
// // //         <div className="home-content">
// // //           <h2>Welcome to Bon Voyage!</h2>
// // //           <p>
// // //             Your one-stop destination for personalized travel recommendations.
// // //           </p>

// // //           {/* Currency Converter Positioned Below the Text on the Right */}
// // //           <div className="currency-converter">
// // //             <h3>Currency Converter</h3>
// // //             <div className="converter-inputs">
// // //               <input
// // //                 type="number"
// // //                 placeholder="Enter amount"
// // //                 value={amount}
// // //                 onChange={(e) => setAmount(e.target.value)}
// // //               />

// // //               <select
// // //                 value={fromCurrency}
// // //                 onChange={(e) => setFromCurrency(e.target.value)}
// // //               >
// // //                 <option value="USD">USD</option>
// // //                 <option value="INR">INR</option>
// // //                 <option value="EUR">EUR</option>
// // //               </select>

// // //               <select
// // //                 value={toCurrency}
// // //                 onChange={(e) => setToCurrency(e.target.value)}
// // //               >
// // //                 <option value="INR">INR</option>
// // //                 <option value="USD">USD</option>
// // //                 <option value="EUR">EUR</option>
// // //               </select>

// // //               <button onClick={convertCurrency} className="convert-btn">
// // //                 Convert
// // //               </button>
// // //             </div>

// // //             {converted && <p className="converted-text">≈ {converted}</p>}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Home;

// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import "../Home.css";
// // import AIRecommendation from "../components/AIRecommendation";
// // import WeatherMiniMap from "../components/Map";

// // const Home = () => {
// //   const navigate = useNavigate();
// //   const [amount, setAmount] = useState("");
// //   const [fromCurrency, setFromCurrency] = useState("USD");
// //   const [toCurrency, setToCurrency] = useState("INR");
// //   const [converted, setConverted] = useState("");
// //   const [user, setUser] = useState(null);

// //   // AI Recommendation State
// //   const [prompt, setPrompt] = useState("");
// //   const [recommendations, setRecommendations] = useState("");

// //   useEffect(() => {
// //     const storedUser = localStorage.getItem("user");
// //     if (storedUser) {
// //       setUser(storedUser);
// //     }
// //   }, []);

// //   const convertCurrency = async () => {
// //     if (!amount) {
// //       alert("Please enter an amount");
// //       return;
// //     }

// //     try {
// //       const API_KEY = "376f648e7a4eef13bd519ef3"; // Replace with actual API key
// //       const response = await axios.get(
// //         `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`
// //       );

// //       const rate = response.data.conversion_rates[toCurrency];
// //       setConverted((amount * rate).toFixed(2) + " " + toCurrency);
// //     } catch (error) {
// //       console.error("Error fetching conversion rate:", error);
// //       setConverted("Conversion failed");
// //     }
// //   };

// //   // Fetch AI Recommendations
// //   const fetchRecommendations = async () => {
// //     if (!prompt.trim()) {
// //       alert("Please enter a prompt");
// //       return;
// //     }

// //     try {
// //       const token = localStorage.getItem("token");
// //       if (!token) {
// //         alert("Please log in to get recommendations");
// //         return;
// //       }

// //       const response = await axios.post(
// //         "http://localhost:5000/api/ai/recommend", // Update with your backend URL
// //         { prompt },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );

// //       setRecommendations(response.data.recommendations);
// //     } catch (error) {
// //       console.error("Error fetching AI recommendations:", error);
// //       setRecommendations("Failed to get recommendations");
// //     }
// //   };

// //   return (
// //     <div>
// //       {/* Navbar */}
// //       <nav className="navbar">
// //         <h1 className="brand">Bon Voyage</h1>
// //         {user ? (
// //           <div>
// //             <span className="welcome-text">Welcome, {user}</span>
// //             <button
// //               className="login-btn"
// //               onClick={() => {
// //                 localStorage.removeItem("token");
// //                 localStorage.removeItem("user");
// //                 window.location.reload();
// //               }}
// //             >
// //               Logout
// //             </button>
// //           </div>
// //         ) : (
// //           <button className="login-btn" onClick={() => navigate("/register")}>
// //             Login
// //           </button>
// //         )}
// //       </nav>
// //       <img src="/back.jpg" className="background-image" alt="Background" />

// //       {/* Home Content */}
// //       <div className="home-container">
// //         {/* <div className="map-container"><WeatherMiniMap /></div> */}
// //         <div className="home-content">
// //           {/* <h2 className="welcome-heading">Welcome to Bon Voyage!</h2>
// //           <p className="welcome-subtext">
// //             Your one-stop destination for personalized travel recommendations.
// //           </p> */}
// //           <AIRecommendation /> {/* ✅ Now using the separate component */}
// //           {/* Currency Converter (Right) */}
// //           <div className="currency-converter">
// //             <h3>Currency Converter</h3>
// //             <div className="converter-inputs">
// //               <input
// //                 type="number"
// //                 placeholder="Enter amount"
// //                 value={amount}
// //                 onChange={(e) => setAmount(e.target.value)}
// //               />

// //               <select
// //                 value={fromCurrency}
// //                 onChange={(e) => setFromCurrency(e.target.value)}
// //               >
// //                 <option value="USD">USD</option>
// //                 <option value="INR">INR</option>
// //                 <option value="EUR">EUR</option>
// //               </select>

// //               <select
// //                 value={toCurrency}
// //                 onChange={(e) => setToCurrency(e.target.value)}
// //               >
// //                 <option value="INR">INR</option>
// //                 <option value="USD">USD</option>
// //                 <option value="EUR">EUR</option>
// //               </select>

// //               <button onClick={convertCurrency} className="convert-btn">
// //                 Convert
// //               </button>
// //             </div>

// //             {converted && <p className="converted-text">≈ {converted}</p>}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Home;
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../Home.css";
// import AIRecommendation from "../components/AIRecommendation";
// import WeatherMiniMap from "../components/Map";

// const Home = () => {
//   const navigate = useNavigate();
//   const [amount, setAmount] = useState("");
//   const [fromCurrency, setFromCurrency] = useState("USD");
//   const [toCurrency, setToCurrency] = useState("INR");
//   const [converted, setConverted] = useState("");
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, []);

//   const convertCurrency = async () => {
//     if (!amount) {
//       alert("Please enter an amount");
//       return;
//     }

//     try {
//       const API_KEY = "YOUR_API_KEY"; // Replace with your API key
//       const response = await axios.get(
//         `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`
//       );

//       const rate = response.data.conversion_rates[toCurrency];
//       setConverted((amount * rate).toFixed(2) + " " + toCurrency);
//     } catch (error) {
//       console.error("Error fetching conversion rate:", error);
//       setConverted("Conversion failed");
//     }
//   };

//   return (
//     <div>
//       {/* Navbar */}
//       <nav className="navbar">
//         <h1 className="brand">Bon Voyage</h1>
//         {user ? (
//           <div>
//             <span className="welcome-text">Welcome, {user}</span>
//             <button
//               className="login-btn"
//               onClick={() => {
//                 localStorage.removeItem("token");
//                 localStorage.removeItem("user");
//                 window.location.reload();
//               }}
//             >
//               Logout
//             </button>
//           </div>
//         ) : (
//           <button className="login-btn" onClick={() => navigate("/register")}>
//             Login
//           </button>
//         )}
//       </nav>
//       <img src="/back.jpg" className="background-image" alt="Background" />

//       {/* Home Content */}
//       <div className="home-container">
//         <div className="map-container">
//           <WeatherMiniMap />
//         </div>
//         <div className="ai-recommendation-container">
//           <AIRecommendation />
//         </div>
//         <div className="currency-converter">
//           <h3>Currency Converter</h3>
//           <div className="converter-inputs">
//             <input
//               type="number"
//               placeholder="Enter amount"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//             />
//             <select
//               value={fromCurrency}
//               onChange={(e) => setFromCurrency(e.target.value)}
//             >
//               <option value="USD">USD</option>
//               <option value="INR">INR</option>
//               <option value="EUR">EUR</option>
//             </select>
//             <select
//               value={toCurrency}
//               onChange={(e) => setToCurrency(e.target.value)}
//             >
//               <option value="INR">INR</option>
//               <option value="USD">USD</option>
//               <option value="EUR">EUR</option>
//             </select>
//             <button onClick={convertCurrency} className="convert-btn">
//               Convert
//             </button>
//           </div>
//           {converted && <p className="converted-text">≈ {converted}</p>}
//         </div>
//       </div>
//       <div className="welcome-heading-container">
//         {/* <h2 className="welcome-heading">Welcome to Bon Voyage!</h2>
//         <p className="welcome-subtext">
//           Your one-stop destination for personalized travel recommendations.
//         </p> */}
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Home.css";
import AIRecommendation from "../components/AIRecommendation";
import WeatherMiniMap from "../components/Map";

const Home = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [converted, setConverted] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const convertCurrency = async () => {
    if (!amount) {
      alert("Please enter an amount");
      return;
    }

    try {
      const API_KEY = "376f648e7a4eef13bd519ef3"; // Replace with actual API key
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`
      );

      const rate = response.data.conversion_rates[toCurrency];
      setConverted((amount * rate).toFixed(2) + " " + toCurrency);
    } catch (error) {
      console.error("Error fetching conversion rate:", error);
      setConverted("Conversion failed");
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="brand">Bon Voyage</h1>
        {user ? (
          <div>
            <span className="welcome-text">Welcome, {user}</span>
            <button
              className="login-btn"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.reload();
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <button className="login-btn" onClick={() => navigate("/register")}>
            Login
          </button>
        )}
      </nav>
      <img src="/back.jpg" className="background-image" alt="Background" />

      {/* Welcome Heading and Subtext */}
      <div className="welcome-heading-container">
        <h2 className="welcome-heading">Welcome to Bon Voyage!</h2>
        <p className="welcome-subtext">
          Your one-stop destination for personalized travel recommendations.
        </p>
      </div>

      {/* Home Content */}
      <div className="home-container">
        <div className="map-container">
          <WeatherMiniMap />
        </div>
        <div className="ai-recommendation-container">
          <AIRecommendation />
        </div>
        <div className="currency-converter">
          <h3>Currency Converter</h3>
          <div className="converter-inputs">
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="EUR">EUR</option>
            </select>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
            <button onClick={convertCurrency} className="convert-btn">
              Convert
            </button>
          </div>
          {converted && <p className="converted-text">≈ {converted}</p>}
        </div>
      </div>
    </div>
  );
};

export default Home;