import React, { useState } from "react";
import { authClient } from "../api/auth-client"; // Path thik thakle thakuk

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Email/Password Login Function
  const handleLogin = async () => {
    const { error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/", 
    });

    if (error) {
      alert(error.message || "Login failed!");
    } else {
      alert("Logged in successfully!");
    }
  };

  // Google Login Function (Merged)
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/", // Login seshe home page-e niye jabe
    });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h2>Login</h2>
      
      {/* Email Input */}
      <input 
        type="email" 
        placeholder="Email" 
        onChange={(e) => setEmail(e.target.value)} 
        style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px" }}
      />
      
      {/* Password Input */}
      <input 
        type="password" 
        placeholder="Password" 
        onChange={(e) => setPassword(e.target.value)} 
        style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px" }}
      />
      
      {/* Email Sign In Button */}
      <button onClick={handleLogin} style={{ width: "100%", padding: "10px", cursor: "pointer", marginBottom: "10px" }}>
        Sign In
      </button>

      <div style={{ margin: "10px 0" }}>OR</div>

      {/* Google Sign In Button */}
      <button 
        onClick={handleGoogleLogin} 
        style={{ 
          width: "100%", 
          padding: "10px", 
          cursor: "pointer", 
          backgroundColor: "#4285F4", 
          color: "white", 
          border: "none", 
          borderRadius: "4px",
          fontWeight: "bold"
        }}
      >
        Login with Google
      </button>
    </div>
  );
};

export default Login;