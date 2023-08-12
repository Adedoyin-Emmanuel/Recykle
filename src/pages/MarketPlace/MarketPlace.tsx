import React from "react";
import Dashboard from "../Dashboard/Dashboard";

const MarketPlace: React.FC = (): JSX.Element => {
  return (
    <Dashboard onMarketPlacePage>
      <h1 className="font-bold text-green-300 text-4xl capitalize">
        hello market place page
      </h1>
    </Dashboard>
  );
};

export default MarketPlace;
