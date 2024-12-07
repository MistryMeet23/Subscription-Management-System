import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const accessToken = localStorage.getItem("accessToken");
  const roleId = parseInt(localStorage.getItem("role_Id"), 10);

  if (!accessToken || !allowedRoles.includes(roleId)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
