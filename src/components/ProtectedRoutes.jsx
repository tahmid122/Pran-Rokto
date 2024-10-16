import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoutes;
