import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Auth.css";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isRegister
        ? "http://localhost:5000/api/auth/register"
        : "http://localhost:5000/api/auth/login";

      const res = await axios.post(url, formData, { withCredentials: true });
      console.log(`${isRegister ? "Registration" : "Login"} successful:`, res.data);

      if (isRegister) {
        setIsRegister(false); // Switch to login after registering
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
          <h2>{isRegister ? "Register" : "Login"}</h2>
          <form onSubmit={handleSubmit} className="auth-form">
            {isRegister && (
              <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            )}
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">{isRegister ? "Register" : "Login"}</button>
          </form>
          <p className="toggle-auth">
            {isRegister ? "Already registered?" : "Not registered yet?"}
            <span onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? " Login here" : " Register here"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;