import React from "react";
import CompanyDashboardComponent from "../../components/CompanyDashboardComponent/CompanyDashboardComponent";
import RecycleLogo from "./../../assets/trash.svg";
import VerifiedLogo from "./../../assets/verify.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCalendar,
  faRecycle,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import {
  navigateToCompanySettings,
  navigateToCompanyProfileEdit,
} from "../../utils/navigate";
import { useNavigate } from "react-router-dom";

const CompanyProfile: React.FC = (): JSX.Element => {
  const navigateTo = useNavigate();

  const handleSettingsButtonClick = () => {
    navigateToCompanySettings(navigateTo);
  };

  const handleProfileEditIconClick = () => {
    navigateToCompanyProfileEdit(navigateTo);
  };

  return (
    <CompanyDashboardComponent onProfilePage>
      <section className="profile-section w-full lg:w-2/4 mx-auto flex flex-col items-start justify-start gap-3">
        <section className="flex items-center justify-center w-full">
          <img
            src={RecycleLogo}
            alt="profile picture"
            className="h-44 w-48 rounded-full "
          />
          <FontAwesomeIcon
            icon={faPen}
            className="hover:bg-slate-100 bg-green-100 text-white transform-gpu duration-100 ease-in-out -translate-x-20 translate-y-20 rounded-full p-3 hover:text-green-300 cursor-pointer"
            size={"lg"}
            title="Edit profile"
            onClick={handleProfileEditIconClick}
          />
        </section>
        <section className="action-buttons w-full flex items-center justify-end">
          <button
            className="rounded-[30px] capitalize w-[120px] h-10  md:w-32 md:h-10 lg:w-28 text-sm m-3 flex items-center justify-around transition-colors duration-100 ease-in-out border-2 border-green-300 hover:bg-green-300 hover:text-white"
            onClick={handleSettingsButtonClick}
          >
            <FontAwesomeIcon icon={faGear} />
            settings
          </button>
        </section>
        <section className="profile-details my-5 mx-3">
          <h3 className="profile-name font-bold capitalize text-[1.3rem] flex items-center justify-start gap-x-3">
            Recykle
            <p>
              <img src={VerifiedLogo} alt="verified logo" />
            </p>
          </h3>
          <p className="profile-username text-slate-500">@recykle</p>

          <p className="profile-description my-2 capitalize">
            Bridging the gap between recycling companies and post consumers
          </p>

          <p className="profile-location flex items-center justify-start gap-x-2 mb-1">
            <FontAwesomeIcon icon={faLocationDot} />
            123, Ikorodu road, Lagos
          </p>

          <p className="profile-join-date flex items-center justify-start gap-x-2 mb-1">
            <FontAwesomeIcon icon={faCalendar} />
            Joined september 2022
          </p>

          <p className="profile-join-date flex items-center justify-start gap-x-2 mb-1">
            <FontAwesomeIcon icon={faRecycle} />
            Over 150 transactions
          </p>
        </section>
      </section>
    </CompanyDashboardComponent>
  );
};

export default CompanyProfile;
