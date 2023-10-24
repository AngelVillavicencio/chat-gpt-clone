import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../features/context/authContext/Index";

const ProtectedRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  console.log("PROTECTED");
  if (loading) return <h1>LOADING</h1>;

  if (!user) return <Navigate to="/login"></Navigate>;

  return <>{children}</>;
};
export default ProtectedRoutes;
