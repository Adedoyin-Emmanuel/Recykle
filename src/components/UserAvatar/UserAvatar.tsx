/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Avatar, { ReactAvatarProps } from "react-avatar";
import { useAppContext } from "../../context/appContext";

interface UserAvatarProps extends ReactAvatarProps {
  className?: string;
  size?: string;
  profileImageUrl?: string;
  onClick?: () => void;
}

const UserAvatar = ({
  className,
  size,
  onClick,
  ...others
}: UserAvatarProps): JSX.Element => {
  const { userData }: any = useAppContext();

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
