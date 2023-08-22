/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from "react";
import Avatar from "react-avatar";
import {
  useUserAuth,
  userAuthContextProps,
} from "../../context/userAuthContext";
import { useAppContext } from "../../context/appContext";

interface UserAvatarProps {
  className?: string;
  size?: string;
  profileImageUrl?: string;
  onClick?: () => void;
}

const UserAvatar: React.FC = ({
  className,
  size,
  onClick,
  ...others
}: UserAvatarProps): JSX.Element => {
  const { user, loading }: userAuthContextProps | any = useUserAuth();
  const { username, userData }: any = useAppContext();

  if (!loading) {
    console.log(userData.fullname);
    console.log(username);
  }
  return (
    <Avatar
      name={userData.fullname}
      maxInitials={2}
      size={size || "40"}
      {...others}
      color={"#2EB875"}
      round={true}
      className={`rounded-full h-10 w-10 text-sm cursor-pointer${className}`}
      onClick={onClick}
      src={userData?.profileImageUrl}
    />
  );
};

export default UserAvatar;
