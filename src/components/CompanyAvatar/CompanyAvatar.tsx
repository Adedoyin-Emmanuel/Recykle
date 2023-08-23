/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Avatar, { ReactAvatarProps } from "react-avatar";
import { useCompanyAppContext, CompanyAppContextValuesProps } from "../../context/companyAppContext";

interface CompanyAvatarProps extends ReactAvatarProps {
  className?: string;
  size?: string;
  profileImageUrl?: string;
  onClick?: () => void;
}

const CompanyAvatar = ({
  className,
  size,
  onClick,
  ...others
}: CompanyAvatarProps): JSX.Element => {
  const {companyData}: CompanyAppContextValuesProps = useCompanyAppContext();

  return (
    <Avatar
      name={companyData.fullname}
      maxInitials={2}
      size={size || "40"}
      {...others}
      color={"#2EB875"}
      round={true}
      className={`rounded-full h-10 w-10 text-sm cursor-pointer${className}`}
      onClick={onClick}
      src={companyData?.logo}
    />
  );
};

export default CompanyAvatar;
