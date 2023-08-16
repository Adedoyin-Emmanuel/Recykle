import React from "react";
import CompanyDashboardComponent from "../../components/CompanyDashboardComponent/CompanyDashboardComponent";

const CompanyMaterials: React.FC = (): JSX.Element => {
  return (
    <CompanyDashboardComponent onServicePage>
      <h3 className="text-green-300 font-bold text-2xl capitalize">
        welcome to service page
      </h3>
    </CompanyDashboardComponent>
  );
};

export default CompanyMaterials;
