import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography } from "@mui/material";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully! Please log in.");
      navigate("/");
    } catch (error) {
      console.error("Signup Error:", error);
      alert(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Sign Up</Typography>
      <TextField fullWidth label="Email" margin="normal" onChange={(e) => setEmail(e.target.value)} />
      <TextField fullWidth label="Password" type="password" margin="normal" onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" color="primary" fullWidth onClick={handleSignup}>Sign Up</Button>
    </Container>
  );
};

export default Signup;
