import React from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = true;

  return <>{isAuthenticated ? children : <Navigate to={"/auth"} />}</>;
};

export default ProtectedRoute;
