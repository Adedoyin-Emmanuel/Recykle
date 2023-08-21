import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuthProvider } from "../../context/userAuthContext";
//import { useUserAuth } from "../../context/userAuthContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = true;
 

  return (
    <UserAuthProvider>
      {isAuthenticated ? children : <Navigate to={"/auth"} />}
    </UserAuthProvider>
  );
};

export default ProtectedRoute;
