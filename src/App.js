// App.js

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Students from "./pages/Students";
import Login from "./pages/Login";
import { CircularProgress } from "@mui/material";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Students /> : <Login />} />
        <Route path="/students" element={user ? <Students /> : <Login />} />
      </Routes>
    </Router>
  );
};

export default App;
