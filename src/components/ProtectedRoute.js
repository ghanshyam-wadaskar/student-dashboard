import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (user === undefined) return null; 

  return user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
