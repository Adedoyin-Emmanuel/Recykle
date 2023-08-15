import React from "react";
import DashboardComponent from "../../components/DashboardComponent/DashboardComponent";

const MarketPlace: React.FC = (): JSX.Element => {
  return (
    <DashboardComponent onMarketPlacePage>
      <h1 className="font-bold text-green-300 text-4xl capitalize">
        hello market place page
      </h1>
    </DashboardComponent>
  );
};

export default MarketPlace;
