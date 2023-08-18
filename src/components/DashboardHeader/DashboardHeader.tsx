/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";

interface DashboardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const DashboardHeader: React.FC = ({
  className,
  ...others
}: DashboardHeaderProps): JSX.Element => {
  const [isNotificationDropdownVisible, setIsNotificationDropdownVisible] =
    useState(false);
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] =
    useState(false);

  const notificationRef: any = useRef(null);
  const profileRef: any = useRef(null);

  useEffect(() => {
    const closeDropdowns = (event: MouseEvent) => {
      if (
        (isNotificationDropdownVisible &&
          notificationRef.current &&
          !notificationRef.current.contains(event.target as Node)) ||
        (isProfileDropdownVisible &&
          profileRef.current &&
          !profileRef.current.contains(event.target as Node))
      ) {
        setIsNotificationDropdownVisible(false);
        setIsProfileDropdownVisible(false);
      }
    };

    window.addEventListener("click", closeDropdowns);

    return () => {
      window.removeEventListener("click", closeDropdowns);
    };
  }, [isNotificationDropdownVisible, isProfileDropdownVisible]);

  const toggleNotificationDropdown = () => {
    setIsNotificationDropdownVisible(!isNotificationDropdownVisible);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownVisible(!isProfileDropdownVisible);
  };

  const notificationItems = [
    { id: 1, text: "New message from admin" },
    { id: 2, text: "Reminder: Meeting at 3 PM" },
    { id: 3, text: "Your submission has been approved" },
  ];

  const profileMenuItems = [
    { id: 1, text: "Edit Profile" },
    { id: 2, text: "Change Password" },
    { id: 3, text: "Logout" },
  ];

  return (
    <section
      className={`dashboard-header w-full flex items-center justify-between p-2 mb-3 ${className}`}
      {...others}
    >
      <section className="greeting">
        <h3 className="text-[20px] md:text-2xl font-bold capitalize ">
          welcome chief 👋
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
                  className="text-sm p-2 hover:bg-green-10 rounded"
                >
                  {item.text}
                </p>
              ))}
            </div>
          )}
        </section>

        <section className="profile-image cursor-pointer relative">
          <section
            className="bg-green-300 h-10 w-10 rounded-full"
            onClick={toggleProfileDropdown}
          ></section>
          {isProfileDropdownVisible && (
            <div className="notification-dropdown absolute  top-full w-72 right-0 bg-white z-[100] rounded-md shadow-md p-4">
              <h4 className="mb-2 font-bold text-gray-800 capitalize">
                Profile Menu
              </h4>
              {profileMenuItems.map((item) => (
                <p
                  key={item.id}
                  className="text-sm p-2 hover:bg-green-10 rounded"
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
