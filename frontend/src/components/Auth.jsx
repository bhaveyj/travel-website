import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../Auth.css";

const Auth = () => {
  const location = useLocation();
  const isRegisterPage = location.pathname === "/register";
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isRegisterPage
      ? `${API_URL}/api/auth/register`
      : `${API_URL}/api/auth/login`;

      const res = await axios.post(url, formData, { withCredentials: true });
      console.log(`${isRegisterPage ? "Registration" : "Login"} successful:`, res.data);

      if (isRegisterPage) {
        navigate("/login"); // Navigate to login after successful registration
      } else {
        // Store user info in localStorage after login
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", res.data.user.name); // Store username
        navigate("/home");
        window.location.reload(); 
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="auth-container" style={{ display: "flex", height: "100vh" }}>
      <div className="left-side" style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <h1 style={{ fontSize: "3em", marginBottom: "10px" }}>Bon Voyage</h1>
        <p style={{ fontSize: "1.2em", textAlign: "center" }}>
          Your AI Travel Companion: <br />
          Crafting Personalized Journeys
        </p>
      </div>

      <div className="right-side" style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ width: "300px" }}>
          <h2>{isRegisterPage ? "Register" : "Login"}</h2>
          <form onSubmit={handleSubmit} className="auth-form">
            {isRegisterPage && (
              <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            )}
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">{isRegisterPage ? "Register" : "Login"}</button>
          </form>
          <p className="toggle-auth">
            {isRegisterPage ? "Already registered?" : "Not registered yet?"}
            <span onClick={() => navigate(isRegisterPage ? "/login" : "/register")}>
              {isRegisterPage ? " Login here" : " Register here"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;