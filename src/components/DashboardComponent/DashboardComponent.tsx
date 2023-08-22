/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Sidebar from "../Sidebar/Sidebar";
// import { useNavigate } from "react-router-dom";
// import {
//   useUserAuth,
//   userAuthContextProps,
// } from "../../context/userAuthContext";
interface DashboardComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  onDashboardPage?: boolean;
  onProfilePage?: boolean;
  onRecyklePage?: boolean;
  onMarketPlacePage?: boolean;
  others?: React.Attributes;
}

const DashboardComponent = ({
  className,
  children,
  onDashboardPage,
  onProfilePage,
  onRecyklePage,
  onMarketPlacePage,
  ...others
}: DashboardComponentProps): JSX.Element => {

  return (
        <Sidebar
          onDashboardPage={onDashboardPage}
          onProfilePage={onProfilePage}
          onRecyklePage={onRecyklePage}
          onMarketPlacePage={onMarketPlacePage}
        >
          <section className={`${className}`} {...others}>
            {children}
          </section>
        </Sidebar>
  );
};

export default DashboardComponent;
