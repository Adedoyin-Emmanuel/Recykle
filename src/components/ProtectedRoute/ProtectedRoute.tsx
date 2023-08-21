/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuthProvider } from "../../context/userAuthContext";
import {
  useUserAuth,
  userAuthContextProps,
} from "../../context/userAuthContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading }: userAuthContextProps | any = useUserAuth();

  return (
    <UserAuthProvider>
      {!loading && !user ? children : <Navigate to={"/auth?login=true"} />}
    </UserAuthProvider>
  );
};

export default ProtectedRoute;
