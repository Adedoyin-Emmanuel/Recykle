import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";

interface DashboardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  onProfilePage?: boolean;
  onRecyklePage?: boolean;
  onMarketPlacePage?: boolean;
  others?: React.Attributes;
}

const Dashboard = ({
  className,
  children,
  onProfilePage,
  onRecyklePage,
  onMarketPlacePage,
  ...others
}: DashboardProps): JSX.Element => {
  return (
    <Sidebar
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

export default Dashboard;
