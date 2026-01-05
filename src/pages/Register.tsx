import React, { useState } from "react";
import { authClient } from "../api/auth-client";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const { error } = await authClient.signUp.email({
      email,
      password,
      name,
      callbackURL: "/login", // Register hole login-e niye jabe
    });

    if (error) {
      alert(error.message || "Registration failed!");
    } else {
      alert("Registration successful! Please login.");
      navigate("/login");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h2>Create Account</h2>
      <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} style={inputStyle} />
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
      <button onClick={handleRegister} style={buttonStyle}>Register</button>
    </div>
  );
};

const inputStyle = { display: "block", marginBottom: "10px", width: "100%", padding: "8px" };
const buttonStyle = { width: "100%", padding: "10px", cursor: "pointer", backgroundColor: "#28a745", color: "white", border: "none" };

export default Register;