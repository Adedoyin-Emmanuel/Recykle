/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import { useUserAuth } from "../../context/userAuthContext";
import Container from "../Container/Container";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { loading }: any = useAppContext(); 
  const { isAuthenticated } = useUserAuth(); 
  
  if (loading) {
   return <Container>
    <div className="loader"></div>
   </Container>
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth?login=true" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
