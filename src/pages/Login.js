// Login.js

import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (email === "admin@123.com" && password === "admin@123") {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/students"); // Navigate to students page after login
      } else {
        setError("Invalid credentials.");
      }
    } catch (err) {
      setError("Login failed: " + err.message);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", maxWidth: 400, margin: "auto", padding: 2 }}>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Button onClick={handleLogin} variant="contained" color="primary" fullWidth>
        Login
      </Button>
    </Box>
  );
};

export default Login;
