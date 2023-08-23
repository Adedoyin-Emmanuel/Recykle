import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDashboard,
  faUser,
  faRecycle,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import CompanyMobileNav from "../CompanyMobileNav/CompanyMobileNav";

import {
  navigateToCompanyDashboard,
  navigateToCompanyProfile,
  navigateToCompanySettings,
  navigateToCompanyManageMaterials,
} from "../../utils/navigate";

import { useNavigate } from "react-router-dom";
import {
  useCompanyAppContext,
  CompanyAppContextValuesProps,
} from "../../context/companyAppContext";
import CompanyAvatar from "../CompanyAvatar/CompanyAvatar";
interface CompanySideBarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
  onDashboardPage?: boolean;
  onProfilePage?: boolean;
  onServicePage?: boolean;
  onSettingsPage?: boolean;
}
const CompanySideBar = ({
  className,
  children,
  onDashboardPage,
  onProfilePage,
  onServicePage,
  onSettingsPage,
  ...others
}: CompanySideBarProps): JSX.Element => {
  const navigateTo = useNavigate();

  const { companyData }: CompanyAppContextValuesProps =
    useCompanyAppContext();

  const handleDashboardClick = () => {
    navigateToCompanyDashboard(navigateTo);
  };

  const handleSettingsClick = () => {
    navigateToCompanySettings(navigateTo);
  };

  const handleServiceClick = () => {
    navigateToCompanyManageMaterials(navigateTo);
  };

  const handleProfileClick = () => {
    navigateToCompanyProfile(navigateTo);
  };
  return (
    <section
      className={`parent h-screen w-screen flex justify-between ${className}`}
    >
      <section
        className={`sidenav bg-green-5 h-screen hidden md:flex  md:w-3/12  lg:w-2/12 items-center justify-start flex-col ${className} p-0  fixed `}
        {...others}
      >
        <section className="header-section w-full flex items-center justify-start my-5 flex-col">
          <section className="w-3/4 flex flex-col items-start mx-3">
            <CompanyAvatar size="50" />
            <section className="profile-name mt-5">
              <h3 className="font-bold capitalize flex">
                {companyData.fullname}
                {companyData.verified && (
                  <p className="m-0 px-[5px]">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="dodgerblue"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21.5609 10.7386L20.2009 9.15859C19.9409 8.85859 19.7309 8.29859 19.7309 7.89859V6.19859C19.7309 5.13859 18.8609 4.26859 17.8009 4.26859H16.1009C15.7109 4.26859 15.1409 4.05859 14.8409 3.79859L13.2609 2.43859C12.5709 1.84859 11.4409 1.84859 10.7409 2.43859L9.17086 3.80859C8.87086 4.05859 8.30086 4.26859 7.91086 4.26859H6.18086C5.12086 4.26859 4.25086 5.13859 4.25086 6.19859V7.90859C4.25086 8.29859 4.04086 8.85859 3.79086 9.15859L2.44086 10.7486C1.86086 11.4386 1.86086 12.5586 2.44086 13.2486L3.79086 14.8386C4.04086 15.1386 4.25086 15.6986 4.25086 16.0886V17.7986C4.25086 18.8586 5.12086 19.7286 6.18086 19.7286H7.91086C8.30086 19.7286 8.87086 19.9386 9.17086 20.1986L10.7509 21.5586C11.4409 22.1486 12.5709 22.1486 13.2709 21.5586L14.8509 20.1986C15.1509 19.9386 15.7109 19.7286 16.1109 19.7286H17.8109C18.8709 19.7286 19.7409 18.8586 19.7409 17.7986V16.0986C19.7409 15.7086 19.9509 15.1386 20.2109 14.8386L21.5709 13.2586C22.1509 12.5686 22.1509 11.4286 21.5609 10.7386ZM16.1609 10.1086L11.3309 14.9386C11.1909 15.0786 11.0009 15.1586 10.8009 15.1586C10.6009 15.1586 10.4109 15.0786 10.2709 14.9386L7.85086 12.5186C7.56086 12.2286 7.56086 11.7486 7.85086 11.4586C8.14086 11.1686 8.62086 11.1686 8.91086 11.4586L10.8009 13.3486L15.1009 9.04859C15.3909 8.75859 15.8709 8.75859 16.1609 9.04859C16.4509 9.33859 16.4509 9.81859 16.1609 10.1086Z"
                        fill="dodgerblue"
                      />
                    </svg>
                  </p>
                )}
              </h3>

              <p className="text-slate-500">@{companyData.username}</p>
            </section>
          </section>

          <section
            className={`rounded p-3 w-3/4 flex flex-col items-center justify-around gap-4 capitalize   hover:bg-green-200 hover:text-white cursor-pointer my-16 ${
              onDashboardPage && "bg-green-200 text-white"
            }`}
            onClick={handleDashboardClick}
          >
            <FontAwesomeIcon icon={faDashboard} size={"lg"} className="" />
            dashboard
          </section>

          <section
            className={`rounded p-3 w-3/4 flex flex-col items-center justify-around gap-4 capitalize   hover:bg-green-200 hover:text-white cursor-pointer my-16 ${
              onProfilePage && "bg-green-200 text-white"
            }`}
            onClick={handleProfileClick}
          >
            <FontAwesomeIcon icon={faUser} size={"lg"} className="" />
            profile
          </section>

          <section
            className={`rounded p-3 w-3/4 flex flex-col items-center justify-around gap-4 capitalize   hover:bg-green-200 hover:text-white cursor-pointer my-16 ${
              onServicePage && "bg-green-200 text-white"
            }`}
            onClick={handleServiceClick}
          >
            <FontAwesomeIcon icon={faRecycle} size={"lg"} className="" />
            services
          </section>

          <section
            className={`rounded p-3 w-3/4 flex flex-col items-center justify-around gap-4 capitalize   hover:bg-green-200 hover:text-white cursor-pointer my-16 ${
              onSettingsPage && "bg-green-200 text-white"
            }`}
            onClick={handleSettingsClick}
          >
            <FontAwesomeIcon icon={faGear} size={"lg"} className="" />
            settings
          </section>
        </section>
      </section>

      <section className="w-full md:w-3/4 lg:w-5/6 md:p-8 p-2 pl-1/4 overflow-y-auto ml-auto">
        {children}
      </section>

      <CompanyMobileNav
        onDashboardPage={onDashboardPage}
        onProfilePage={onProfilePage}
        onServicePage={onServicePage}
        onSettingsPage={onSettingsPage}
      />
    </section>
  );
};

export default CompanySideBar;
