import React from "react";
import CompanySideBar from "../CompanySideBar/CompanySideBar";

interface CompanyDashboardComponentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  onProfilePage?: boolean;
  onServicePage?: boolean;
  onSettingsPage?: boolean;
  onDashboardPage?: boolean;
}

const CompanyDashboardComponent = ({
  className,
  children,
  onProfilePage,
  onServicePage,
  onSettingsPage,
  onDashboardPage,
  ...others
}: CompanyDashboardComponentProps): JSX.Element => {
  return (
    <CompanySideBar
      onProfilePage={onProfilePage}
      onServicePage={onServicePage}
      onSettingsPage={onSettingsPage}
      onDashboardPage={onDashboardPage}
    >
      <section className={`${className}`} {...others}>
        {children}
      </section>
    </CompanySideBar>
  );
};

export default CompanyDashboardComponent;
