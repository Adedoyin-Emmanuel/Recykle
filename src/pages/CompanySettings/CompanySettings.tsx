import React from "react";
import CompanyDashboardComponent from "../../components/CompanyDashboardComponent/CompanyDashboardComponent";
import RecycleLogo from "./../../assets/trash.svg";

import {
  faKey,
  faLock,
  faUsers,
  faRecycle,
} from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import UserProfileCard from "../../components/UserProfileCard/UserProfileCard";
import SettingsCard from "../../components/SettingsCard/SettingsCard";
import { useNavigate } from "react-router-dom";
import { navigateToCompanyAuth } from "../../utils/navigate";

const CompanySettings: React.FC = (): JSX.Element => {
  return (
    <CompanyDashboardComponent onSettingsPage>
      <h3 className="text-green-300 font-bold text-2xl capitalize">
        welcome to settings page
      </h3>
    </CompanyDashboardComponent>
  );
};

export default CompanySettings;
