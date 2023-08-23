import React from "react";
import DashboardComponent from "../../components/DashboardComponent/DashboardComponent";
import Container from "../../components/Container/Container";

const MarketPlace: React.FC = (): JSX.Element => {
  return (
    <DashboardComponent onMarketPlacePage>
      <Container>
        <h1 className="font-bold text-green-300 text-2xl capitalize">
          Marketplace is coming soon 🚀
        </h1>
      </Container>
    </DashboardComponent>
  );
};

export default MarketPlace;
