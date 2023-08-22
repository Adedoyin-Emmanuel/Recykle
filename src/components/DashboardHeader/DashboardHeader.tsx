/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { useUserAuth } from "../../context/userAuthContext";
import { useAppContext } from "../../context/appContext";
import Notification from "../../utils/toast";
import { getFirstName } from "../../utils/utilis";
import UserAvatar from "../UserAvatar/UserAvatar";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const DashboardHeader: React.FC = ({
  className,
  ...others
}: DashboardHeaderProps): JSX.Element => {
  const { logout }: any = useUserAuth();
  const [isNotificationDropdownVisible, setIsNotificationDropdownVisible] =
    useState(false);
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] =
    useState(false);

  const notificationRef: any = useRef(null);
  const profileRef: any = useRef(null);
  const toast = new Notification();
  const navigateTo = useNavigate();

  const { userData, appContextLoading }: any = useAppContext();

  // if (appContextLoading) {
  //   return <div>Loading...</div>; // Show a loading indicator while data is loading
  // }

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
      text: "Scrapay accepted your submission",
      onClick: (id: number) => {
        console.log(`Hello notification ${id}`);
      },
    },
    {
      id: 2,
      text: "Reminder: Meeting at 3 PM",
      onClick: (id: number) => {
        console.log(`Hello notification ${id}`);
      },
    },
    {
      id: 3,
      text: "Recykle accepted your submission",
      onClick: (id: number) => {
        console.log(`Hello notification ${id}`);
      },
    },
  ];

  const profileMenuItems = [
    {
      id: 1,
      text: "items recycled",
      onClick: (id: number) => {
        console.log(`Hello profile item  ${id}`);
      },
    },
    {
      id: 2,
      text: "items submitted",
      onClick: (id: number) => {
        console.log(`Hello profile item  ${id}`);
      },
    },
    {
      id: 3,
      text: "edit profile",
      onClick: (id: number) => {
        console.log(`Hello profile item  ${id}`);
      },
    },

    {
      id: 4,
      text: "change password",
      onClick: (id: number) => {
        console.log(`Hello profile item  ${id}`);
      },
    },

    {
      id: 5,
      text: "log out",
      onClick: () => {
        logout();
        toast.success(`Logging out`);
        navigateTo("/auth?login=true");
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
          hi {!appContextLoading && getFirstName(userData?.fullname)} 👋
        </h3>
      </section>
      {/* Add another section for quick actions so the profile-image would only carry profile items*/}
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
                  className="text-[12px] md:text-sm p-2 hover:bg-green-10 rounded capitalize"
                  onClick={() => item.onClick(item.id)}
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
          <UserAvatar onClick={toggleProfileDropdown} />

          {isProfileDropdownVisible && (
            <div className="profile-dropdown absolute  top-full w-72 right-0 bg-white z-[100] rounded-md shadow-md p-4">
              <h4 className="mb-2 font-bold text-gray-800 capitalize">
                Profile Menu
              </h4>
              {profileMenuItems.map((item) => (
                <p
                  key={item.id}
                  className="text-[12px] md:text-sm p-2 hover:bg-green-10 rounded capitalize"
                  onClick={() => item.onClick(item.id)}
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

export default DashboardHeader;
