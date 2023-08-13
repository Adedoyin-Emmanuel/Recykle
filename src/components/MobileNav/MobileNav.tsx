import React from "react";
import { useNavigate } from "react-router-dom";
import {
  navigateToMarketPlace,
  navigateToProfile,
  navigateToRecycling,
} from "../../utils/navigate";

interface MobileNavProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  onRecyklePage?: boolean;
  onProfilePage?: boolean;
  onMarketPlacePage?: boolean;
  others?: React.Attributes;
}

const MobileNav = ({
  className,
  children,
  onRecyklePage,
  onProfilePage,
  onMarketPlacePage,
  ...others
}: MobileNavProps): JSX.Element => {
  const marketPlaceIconColor = onMarketPlacePage ? "#2EB875" : "#292D32";
  const profilePageIconColor = onProfilePage ? "#2EB875" : "#292D32";
  const recyklePageIcon = onRecyklePage ? "#2EB875" : "#292D32";

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
    <section
      className={`mobile-nav w-screen flex items-center justify-between absolute right-0 left-0 bottom-0 md:hidden ${className}`}
      {...others}
    >
      {children}

      <section className="mobile-items m-8" onClick={handleRecykleClick}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="h-8 w-8"
          fill={recyklePageIcon}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.9997 6.72998C20.9797 6.72998 20.9497 6.72998 20.9197 6.72998C15.6297 6.19998 10.3497 5.99998 5.11967 6.52998L3.07967 6.72998C2.65967 6.76998 2.28967 6.46998 2.24967 6.04998C2.20967 5.62998 2.50967 5.26998 2.91967 5.22998L4.95967 5.02998C10.2797 4.48998 15.6697 4.69998 21.0697 5.22998C21.4797 5.26998 21.7797 5.63998 21.7397 6.04998C21.7097 6.43998 21.3797 6.72998 20.9997 6.72998Z"
            fill={recyklePageIcon}
          />
          <path
            d="M8.50074 5.72C8.46074 5.72 8.42074 5.72 8.37074 5.71C7.97074 5.64 7.69074 5.25 7.76074 4.85L7.98074 3.54C8.14074 2.58 8.36074 1.25 10.6907 1.25H13.3107C15.6507 1.25 15.8707 2.63 16.0207 3.55L16.2407 4.85C16.3107 5.26 16.0307 5.65 15.6307 5.71C15.2207 5.78 14.8307 5.5 14.7707 5.1L14.5507 3.8C14.4107 2.93 14.3807 2.76 13.3207 2.76H10.7007C9.64074 2.76 9.62074 2.9 9.47074 3.79L9.24074 5.09C9.18074 5.46 8.86074 5.72 8.50074 5.72Z"
            fill={recyklePageIcon}
          />
          <path
            d="M15.2104 22.7501H8.79039C5.30039 22.7501 5.16039 20.8201 5.05039 19.2601L4.40039 9.19007C4.37039 8.78007 4.69039 8.42008 5.10039 8.39008C5.52039 8.37008 5.87039 8.68008 5.90039 9.09008L6.55039 19.1601C6.66039 20.6801 6.70039 21.2501 8.79039 21.2501H15.2104C17.3104 21.2501 17.3504 20.6801 17.4504 19.1601L18.1004 9.09008C18.1304 8.68008 18.4904 8.37008 18.9004 8.39008C19.3104 8.42008 19.6304 8.77007 19.6004 9.19007L18.9504 19.2601C18.8404 20.8201 18.7004 22.7501 15.2104 22.7501Z"
            fill={recyklePageIcon}
          />
          <path
            d="M13.6601 17.25H10.3301C9.92008 17.25 9.58008 16.91 9.58008 16.5C9.58008 16.09 9.92008 15.75 10.3301 15.75H13.6601C14.0701 15.75 14.4101 16.09 14.4101 16.5C14.4101 16.91 14.0701 17.25 13.6601 17.25Z"
            fill={recyklePageIcon}
          />
          <path
            d="M14.5 13.25H9.5C9.09 13.25 8.75 12.91 8.75 12.5C8.75 12.09 9.09 11.75 9.5 11.75H14.5C14.91 11.75 15.25 12.09 15.25 12.5C15.25 12.91 14.91 13.25 14.5 13.25Z"
            fill={recyklePageIcon}
          />
        </svg>
      </section>
      <section className="mobile-items m-8" onClick={handleMarketPlaceClick}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="w-8 h-8 text-green-300"
          fill={marketPlaceIconColor}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.4904 22.75H7.50042C5.78042 22.75 4.49043 22.29 3.69043 21.38C2.89043 20.47 2.58042 19.15 2.79042 17.44L3.69043 9.94C3.95043 7.73 4.51043 5.75 8.41043 5.75H15.6104C19.5004 5.75 20.0604 7.73 20.3304 9.94L21.2304 17.44C21.4304 19.15 21.1304 20.48 20.3304 21.38C19.5004 22.29 18.2204 22.75 16.4904 22.75ZM8.40042 7.25C5.52042 7.25 5.38042 8.38999 5.17042 10.11L4.27043 17.61C4.12043 18.88 4.30042 19.81 4.81042 20.38C5.32042 20.95 6.22042 21.24 7.50042 21.24H16.4904C17.7704 21.24 18.6704 20.95 19.1804 20.38C19.6904 19.81 19.8704 18.88 19.7204 17.61L18.8204 10.11C18.6104 8.37999 18.4804 7.25 15.5904 7.25H8.40042Z"
            fill={marketPlaceIconColor}
          />
          <path
            d="M16 8.75C15.59 8.75 15.25 8.41 15.25 8V4.5C15.25 3.42 14.58 2.75 13.5 2.75H10.5C9.42 2.75 8.75 3.42 8.75 4.5V8C8.75 8.41 8.41 8.75 8 8.75C7.59 8.75 7.25 8.41 7.25 8V4.5C7.25 2.59 8.59 1.25 10.5 1.25H13.5C15.41 1.25 16.75 2.59 16.75 4.5V8C16.75 8.41 16.41 8.75 16 8.75Z"
            fill={marketPlaceIconColor}
          />
          <path
            d="M20.41 17.7812H8C7.59 17.7812 7.25 17.4412 7.25 17.0312C7.25 16.6213 7.59 16.2812 8 16.2812H20.41C20.82 16.2812 21.16 16.6213 21.16 17.0312C21.16 17.4412 20.82 17.7812 20.41 17.7812Z"
            fill={marketPlaceIconColor}
          />
        </svg>
      </section>
      <section className="mobile-items m-8" onClick={handleProfileClick}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="w-8 h-8"
          fill={profilePageIconColor}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 12.75C8.83 12.75 6.25 10.17 6.25 7C6.25 3.83 8.83 1.25 12 1.25C15.17 1.25 17.75 3.83 17.75 7C17.75 10.17 15.17 12.75 12 12.75ZM12 2.75C9.66 2.75 7.75 4.66 7.75 7C7.75 9.34 9.66 11.25 12 11.25C14.34 11.25 16.25 9.34 16.25 7C16.25 4.66 14.34 2.75 12 2.75Z"
            fill={profilePageIconColor}
          />
          <path
            d="M20.5901 22.75C20.1801 22.75 19.8401 22.41 19.8401 22C19.8401 18.55 16.3202 15.75 12.0002 15.75C7.68015 15.75 4.16016 18.55 4.16016 22C4.16016 22.41 3.82016 22.75 3.41016 22.75C3.00016 22.75 2.66016 22.41 2.66016 22C2.66016 17.73 6.85015 14.25 12.0002 14.25C17.1502 14.25 21.3401 17.73 21.3401 22C21.3401 22.41 21.0001 22.75 20.5901 22.75Z"
            fill={profilePageIconColor}
          />
        </svg>
      </section>
    </section>
  );
};

export default MobileNav;
