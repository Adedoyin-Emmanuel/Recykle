import React from "react";
import DashboardComponent from "../../components/DashboardComponent/DashboardComponent";
import Container from "../../components/Container/Container";

// interface CollectionViewProps {

// }

const CollectionView: React.FC = (): JSX.Element => {
  return (
    <DashboardComponent onDashboardPage>
      <Container>
        <h1 className="font-bold text-green-300 text-2xl capitalize">
          Collection update is coming soon 🚀
        </h1>
      </Container>
    </DashboardComponent>
  );
};

export default CollectionView;
