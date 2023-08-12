import React from "react";
import Dashboard from "../Dashboard/Dashboard";

const Profile: React.FC = (): JSX.Element => {
  return (
    <Dashboard onProfilePage>
      <h1 className="font-bold text-green-300 text-4xl capitalize">
        hello profile page
      </h1>
    </Dashboard>
  );
};

export default Profile;
