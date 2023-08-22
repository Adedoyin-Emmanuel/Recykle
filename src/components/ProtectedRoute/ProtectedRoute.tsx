/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../../context/appContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { userData, loading }:  any = useAppContext();
  console.log(userData);
  return <> {!loading && userData ? children : <Navigate to="/auth?login=true" />} </>;
};

export default ProtectedRoute;
