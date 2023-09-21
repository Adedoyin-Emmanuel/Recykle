/* eslint-disable @typescript-eslint/no-explicit-any */
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CompanyAppContextValuesProps,
  useCompanyAppContext,
} from "../../context/companyAppContext";
import {
  CompanyAuthContextProps,
  useCompanyAuth,
} from "../../context/companyAuthContext";
import Notification from "../../utils/toast";
import { getFirstName } from "../../utils/utilis";
import CompanyAvatar from "../CompanyAvatar/CompanyAvatar";

interface CompanyDashboardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  submissionElementRef?: React.RefObject<HTMLDivElement>;
  recyclableElementRef?: React.RefObject<HTMLDivElement>;
  recycleHistoryRef?: React.RefObject<HTMLDivElement>;
}

const CompanyDashboardHeader = ({
  className,
  submissionElementRef,
  recyclableElementRef,
  recycleHistoryRef,
  ...others
}: CompanyDashboardHeaderProps): JSX.Element => {
  const [isNotificationDropdownVisible, setIsNotificationDropdownVisible] =
    useState(false);
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] =
    useState(false);

  const { companyData, companyContextLoading }: CompanyAppContextValuesProps =
    useCompanyAppContext();
  const { logout }: CompanyAuthContextProps = useCompanyAuth();

  const toast = new Notification();

  const notificationRef: any = useRef(null);
  const profileRef: any = useRef(null);

  const navigateTo = useNavigate();

  useEffect(() => {
    const closeDropdowns = (event: MouseEvent) => {
      if (
        isNotificationDropdownVisible &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationDropdownVisible(false);
      }
    };

    window.addEventListener("click", closeDropdowns);

    return () => {
      window.removeEventListener("click", closeDropdowns);
    };
  }, [isNotificationDropdownVisible]);

  useEffect(() => {
    const closeDropdowns = (event: MouseEvent) => {
      if (
        isProfileDropdownVisible &&
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownVisible(false);
      }
    };

    window.addEventListener("click", closeDropdowns);

    return () => {
      window.removeEventListener("click", closeDropdowns);
    };
  }, [isProfileDropdownVisible]);

  const toggleNotificationDropdown = () => {
    setIsNotificationDropdownVisible(!isNotificationDropdownVisible);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownVisible(!isProfileDropdownVisible);
  };

  const notificationItems = [
    {
      id: 1,
      text: "New message from henqsoft",
      onClick: () => {
        console.log(`Hello notification`);
      },
    },
    {
      id: 2,
      text: "Reminder: Meeting at 3 PM",
      onClick: () => {
        console.log(`Hello notification`);
      },
    },
    {
      id: 3,
      text: "Recycling successful",
      onClick: () => {
        console.log(`Hello notification`);
      },
    },
  ];

  const profileMenuItems = [
    {
      id: 1,
      text: "view submissions",
      onClick: () => {
        if (submissionElementRef?.current) {
          submissionElementRef.current.scrollIntoView({
            behavior: "smooth",
          });
          setIsProfileDropdownVisible(false);
        }
      },
    },

    {
      id: 2,
      text: "recycle history",
      onClick: () => {
        if (recycleHistoryRef?.current) {
          recycleHistoryRef.current.scrollIntoView({
            behavior: "smooth",
          });
          setIsProfileDropdownVisible(false);
        }
      },
    },
    {
      id: 3,
      text: "your recyclables",
      onClick: () => {
        if (recyclableElementRef?.current) {
          recyclableElementRef.current.scrollIntoView({
            behavior: "smooth",
          });
          setIsProfileDropdownVisible(false);
        }
      },
    },

    {
      id: 4,
      text: "view profile",
      onClick: () => {
        navigateTo("/company/dashboard/profile/edit");
      },
    },

    {
      id: 5,
      text: "settings ",
      onClick: () => {
        navigateTo("/company/dashboard/settings");
      },
    },

    {
      id: 6,
      text: "Logout",
      onClick: () => {
        logout();
        toast.success("Logging out");
        navigateTo("/company/auth?login=true");
      },
    },
  ];

  return (
    <section
      className={`dashboard-header w-full flex items-center justify-between p-2 mb-3 ${className}`}
      {...others}
    >
      <section className="greeting">
        <h3 className="text-[18px] md:text-2xl font-bold capitalize ">
          hi {!companyContextLoading && getFirstName(companyData.fullname)} 👋
        </h3>
      </section>

      <section className="action-icons flex items-center justify-around gap-x-5">
        <section
          className="notification cursor-pointer relative"
          ref={notificationRef}
        >
          <FontAwesomeIcon
            icon={faBell}
            size={"lg"}
            className="transition-colors transform-gpu hover:bg-slate-100 p-3 shadow-sm rounded-full hover:text-green-300"
            onClick={toggleNotificationDropdown}
          />

          <section
            className="notification-numbers absolute top-7 left-4 bg-green-10 flex items-center justify-center p-3 h-5 w-9 rounded-full"
            onClick={toggleNotificationDropdown}
          >
            <p className="notification-number text-[11px] font-bold ">10+</p>
          </section>
          {isNotificationDropdownVisible && (
            <div className="notification-dropdown absolute  top-full w-72 right-0 bg-white z-[100] rounded-md shadow-md p-4">
              <h4 className="mb-2 font-bold text-gray-800 capitalize">
                Notifications
              </h4>
              {notificationItems.map((item) => (
                <p
                  key={item.id}
                  className="text-sm p-2 hover:bg-green-10 rounded capitalize"
                  onClick={() => item.onClick()}
                >
                  {item.text}
                </p>
              ))}
            </div>
          )}
        </section>

        <section
          className="profile-image cursor-pointer relative"
          ref={profileRef}
        >
          <CompanyAvatar onClick={toggleProfileDropdown} />
          {isProfileDropdownVisible && (
            <div className="profile-dropdown absolute  top-full w-72 right-0 bg-white z-[100] rounded-md shadow-md p-4">
              <h4 className="mb-2 font-bold text-gray-800 capitalize">
                Profile Menu
              </h4>
              {profileMenuItems.map((item) => (
                <p
                  key={item.id}
                  className="text-[12px] md:text-sm p-3 hover:bg-green-10 rounded capitalize mt-2 cursor-pointer"
                  onClick={() => item.onClick()}
                >
                  {item.text}
                </p>
              ))}
            </div>
          )}
        </section>
      </section>
    </section>
  );
};

export default CompanyDashboardHeader;
