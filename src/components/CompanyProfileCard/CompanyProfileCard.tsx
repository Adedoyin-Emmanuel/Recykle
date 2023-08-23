import React from "react";
import { useNavigate } from "react-router-dom";
import { navigateToCompanyProfileEdit } from "../../utils/navigate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import VerifiedIcon from "./../../assets/verify.svg";
import {
  useCompanyAppContext,
  CompanyAppContextValuesProps,
} from "../../context/companyAppContext";
import CompanyAvatar from "../CompanyAvatar/CompanyAvatar";

interface CompanyProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const CompanyProfileCard = ({
  className,
  ...others
}: CompanyProfileCardProps): JSX.Element => {
  const navigateTo = useNavigate();
  const { companyData }: CompanyAppContextValuesProps = useCompanyAppContext();
  const handleProfileCardClick = () => {
    navigateToCompanyProfileEdit(navigateTo);
  };

  const handleProfileEditIconClick = () => {
    navigateToCompanyProfileEdit(navigateTo);
  };

  const HeaderSection = () => {
    return companyData.verified ? (
      <>
        <h4 className="recycling-company-name font-bold flex">
          {companyData.fullname}
          <p className="m-0 px-[5px]">
            <img
              src={VerifiedIcon}
              alt="company-verified"
              width={20}
              height={20}
            />
          </p>
        </h4>
        <p className="text-sm text-slate-500 mb-1">@{companyData.username}</p>
      </>
    ) : (
      <>
        <h4 className="recycling-company-name font-bold">
          {companyData.fullname}
        </h4>
        <p className="text-sm text-slate-500 mb-1">@{companyData.username}</p>
      </>
    );
  };

  return (
    <section
      className={`user-profile-card w-full cursor-pointer hover:bg-slate-50 flex items-center md:justify-around ${className}`}
      {...others}
      onClick={handleProfileCardClick}
    >
      <section className="image flex items-center justify-center">
        <CompanyAvatar size="80" />

        <FontAwesomeIcon
          icon={faPen}
          className="bg-green-100 hover:bg-slate-200 text-white duration-100 transform-gpu -translate-x-8 translate-y-6 ease-in-out rounded-full p-2 hover:text-black cursor-pointer"
          size={"1x"}
          title="Edit profile"
          onClick={handleProfileEditIconClick}
        />
      </section>
      <section className="profile-name">
        <HeaderSection />
        <p className="profile-description text-[15px]">
          Bridging the gap between recycling companies and consumers
        </p>
      </section>
    </section>
  );
};

export default CompanyProfileCard;
