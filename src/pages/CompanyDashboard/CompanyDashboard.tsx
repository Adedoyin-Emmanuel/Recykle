import React from "react";
import CompanyDashboardComponent from "../../components/CompanyDashboardComponent/CompanyDashboardComponent";
const CompanyDashboard: React.FC = (): JSX.Element => {
  return (
    <CompanyDashboardComponent onDashboardPage>
      <h3 className="text-green-300 font-bold text-2xl capitalize">
        welcome to dashboard page
      </h3>
    </CompanyDashboardComponent>
  );
};

export default CompanyDashboard;
