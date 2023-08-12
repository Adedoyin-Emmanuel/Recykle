import React from "react";
import MobileNav from "../MobileNav/MobileNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faTrash,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import {
  navigateToMarketPlace,
  navigateToProfile,
  navigateToRecycling,
} from "../../utils/navigate";
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
  onProfilePage?: boolean;
  onRecyklePage?: boolean;
  onMarketPlacePage?: boolean;
  others?: React.Attributes;
}

const Sidebar = ({
  className,
  children,
  onProfilePage,
  onRecyklePage,
  onMarketPlacePage,
  ...others
}: SidebarProps): JSX.Element => {
  const navigateTo = useNavigate();

  const handleMarketPlaceClick = () => {
    navigateToMarketPlace(navigateTo);
  };

  const handleProfileClick = () => {
    navigateToProfile(navigateTo);
  };

  const handleRecykleClick = () => {
    navigateToRecycling(navigateTo);
  };
  return (
    <section className="parent h-screen w-screen flex">
      <section
        className={`sidenav bg-green-5 h-screen hidden md:flex  md:w-3/12  lg:w-2/12 items-center justify-start flex-col ${className} p-0 `}
        {...others}
      >
        <section className="header-section w-full flex items-center justify-start my-5 flex-col">
          <section className="w-3/4 flex flex-col items-start mx-3">
            <section className="profile-picture bg-green-200 rounded-full w-20 h-20"></section>

            <section className="profile-name mt-5">
              <h4 className="font-bold capitalize text-1xl">
                adedoyin emmanuel
              </h4>

              <p className="text-slate-400 text-sm">@doyin</p>
            </section>
          </section>
        </section>

        <section
          onClick={handleRecykleClick}
          className={`rounded p-3 w-3/4 flex flex-col items-center justify-around gap-4 capitalize   hover:bg-green-200 hover:text-white cursor-pointer my-16 ${
            onRecyklePage && "bg-green-200 text-white"
          }`}
        >
          <FontAwesomeIcon icon={faTrash} size={"lg"} className="" />
          recykle
        </section>

        <section
          onClick={handleProfileClick}
          className={`rounded p-3 w-3/4 flex flex-col items-center justify-around gap-4 capitalize   hover:bg-green-200 hover:text-white cursor-pointer my-16 ${
            onProfilePage && "bg-green-200 text-white"
          }`}
        >
          <FontAwesomeIcon icon={faUser} size={"lg"} className="" />
          profile
        </section>

        <section
          onClick={handleMarketPlaceClick}
          className={`rounded p-3 w-3/4 flex flex-col items-center justify-around gap-4 capitalize   hover:bg-green-200 hover:text-white cursor-pointer my-16 ${
            onMarketPlacePage && "bg-green-200 text-white"
          }`}
        >
          <FontAwesomeIcon icon={faShoppingBag} size={"lg"} className="" />
          marketplace
        </section>
      </section>
      <section className="w-screen other-content m-5">{children}</section>

      <MobileNav
        onProfilePage={onProfilePage}
        onRecyklePage={onRecyklePage}
        onMarketPlacePage={onMarketPlacePage}
      />
    </section>
  );
};

export default Sidebar;
