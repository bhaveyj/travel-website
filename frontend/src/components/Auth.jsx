import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Auth.css";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(true); // Toggle state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

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
        navigate("/home"); // Redirect after login
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="auth-container">
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
  );
};

export default Auth;


// // export default AuthForm;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../Auth.css" // Import the CSS file

// const Auth = ({ isRegister }) => {
//   const [formData, setFormData] = useState({
//     name: isRegister ? "" : undefined, // Name field only for register
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const url = isRegister
//         ? "http://localhost:5000/api/auth/register"
//         : "http://localhost:5000/api/auth/login";

//       const res = await axios.post(url, formData, { withCredentials: true });
//       console.log(`${isRegister ? "Registration" : "Login"} successful:`, res.data);

//       if (isRegister) {
//         navigate("/login");
//       } else {
//         navigate("/home"); // Redirect to dashboard after login
//       }
//     } catch (error) {
//       console.error("Error:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>{isRegister ? "Register" : "Login"}</h2>
//       <form onSubmit={handleSubmit} className="auth-form">
//         {isRegister && (
//           <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
//         )}
//         <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//         <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//         <button type="submit">{isRegister ? "Register" : "Login"}</button>
//       </form>
//     </div>
//   );
// };

// export default Auth;
