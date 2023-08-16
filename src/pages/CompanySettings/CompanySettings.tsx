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
import CompanyProfileCard from "../../components/CompanyProfileCard/CompanyProfileCard";
import SettingsCard from "../../components/SettingsCard/SettingsCard";
import { useNavigate } from "react-router-dom";
import { navigateToCompanyAuth } from "../../utils/navigate";

const CompanySettings = (): JSX.Element => {
  const navigateTo = useNavigate();

  const allSettings = [
    {
      name: "Account",
      subText: "Security notifications, change number",
      icon: faKey,
      onClick: () => {
        console.log(` settings clicked`);
      },
    },

    {
      name: "Privacy",
      subText: "block contacts, disappearing messages",
      icon: faLock,
      onClick: () => {
        console.log(` settings clicked`);
      },
    },

    {
      name: "Help",
      subText: "Help centre, contact us, privacy policy",
      icon: faQuestionCircle,
      onClick: () => {
        console.log(` settings clicked`);
      },
    },

    {
      name: "Invite",
      subText: "invite your friends to Recykle",
      icon: faUsers,
      onClick: () => {
        console.log(` settings clicked`);
      },
    },

    {
      name: "Register Recycling Company",
      subText: "Register your recycling company with Recykle",
      icon: faRecycle,
      onClick: () => {
        navigateToCompanyAuth(navigateTo);
      },
    },
  ];

  const mapSettingsTags = allSettings.map((element, index: number) => {
    const { name, subText, icon, onClick } = element;

    return (
      <SettingsCard
        key={index}
        settingsCardHeaderText={name}
        settingsCardSubText={subText}
        settingsCardIcon={icon}
        onClick={onClick}
      />
    );
  });

  return (
    <CompanyDashboardComponent onSettingsPage>
      <section className="profile-section w-full lg:w-2/4 mx-auto flex flex-col items-start justify-start gap-3">
        <CompanyProfileCard
          companyProfileImage={RecycleLogo}
          isVerified
          companyProfileName="Recykle"
          companyProfileUsername="recykle"
          companyProfileDescription="Bridging the gap between recycling companies and consumers "
          className="md:mt-0 m-2"
        />
        <hr />
        {mapSettingsTags}
        <section className="action-buttons"></section>
      </section>
    </CompanyDashboardComponent>
  );
};

export default CompanySettings;
