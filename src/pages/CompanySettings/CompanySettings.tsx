import React from "react";
import CompanyDashboardComponent from "../../components/CompanyDashboardComponent/CompanyDashboardComponent";

const CompanySettings: React.FC = (): JSX.Element => {
  return (
    <CompanyDashboardComponent onSettingsPage>
      <h3 className="text-green-300 font-bold text-2xl capitalize">
        welcome to settings page
      </h3>
    </CompanyDashboardComponent>
  );
};

export default CompanySettings;
