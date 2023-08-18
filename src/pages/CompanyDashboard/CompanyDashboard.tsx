import React from "react";
import CompanyDashboardComponent from "../../components/CompanyDashboardComponent/CompanyDashboardComponent";
import CompanyDashboardHeader from "../../components/CompanyDashboardHeader/CompanyDashboardHeader";

const CompanyDashboard: React.FC = (): JSX.Element => {
  return (
    <CompanyDashboardComponent onDashboardPage>
      <CompanyDashboardHeader />
    </CompanyDashboardComponent>
  );
};

export default CompanyDashboard;
