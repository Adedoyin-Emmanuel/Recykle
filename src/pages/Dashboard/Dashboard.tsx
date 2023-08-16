import React from "react";
import DashboardComponent from "../../components/DashboardComponent/DashboardComponent";

const Dashboard = (): JSX.Element => {
  return (
    <DashboardComponent onDashboardPage>
      <h3 className="text-green-300 capitalize font-bold text-2xl">welcome to dashboard</h3>
    </DashboardComponent>
  );
};

export default Dashboard;
