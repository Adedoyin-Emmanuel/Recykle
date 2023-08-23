/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Navigate } from "react-router-dom";
import {
  useCompanyAppContext,
  CompanyAppContextValuesProps,
} from "../../context/companyAppContext";
import {
  useCompanyAuth,
  CompanyAuthContextProps,
} from "../../context/companyAuthContext";
import Container from "../Container/Container";

type CompanyProtectedRouteProps = {
  children: React.ReactNode;
};

const CompanyProtectedRoute = ({ children }: CompanyProtectedRouteProps) => {
  const { companyLoading }: CompanyAppContextValuesProps =
    useCompanyAppContext();
  const { isAuthenticated }: CompanyAuthContextProps = useCompanyAuth();

  if (companyLoading) {
    return (
      <Container>
        <div className="loader"></div>
      </Container>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/company/auth?login=true" />;
  }

  return <>{children}</>;
};

export default CompanyProtectedRoute;
