import React from "react";
import Dashboard from "../Dashboard/Dashboard";

const Recycle: React.FC = (): JSX.Element => {
  return (
    <Dashboard onRecyklePage>
      <h1 className="font-bold text-green-300 text-4xl capitalize">
        hello recykle page
      </h1>
    </Dashboard>
  );
};

export default Recycle;
