import React from "react";
import CompanyDashboardComponent from "../../components/CompanyDashboardComponent/CompanyDashboardComponent";

const CompanyProfile: React.FC = (): JSX.Element => {
  return (
    <CompanyDashboardComponent onProfilePage>
      <h3 className="text-green-300 font-bold text-2xl capitalize">
        welcome to profile page
      </h3>
    </CompanyDashboardComponent>
  );
};

export default CompanyProfile;
