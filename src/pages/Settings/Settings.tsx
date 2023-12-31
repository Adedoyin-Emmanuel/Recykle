import React from "react";
import DashboardComponent from "../../components/DashboardComponent/DashboardComponent";

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

const Settings: React.FC = (): JSX.Element => {
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
    <DashboardComponent onProfilePage>
      <section className="profile-section w-full lg:w-2/4 mx-auto flex flex-col items-start justify-start gap-3">
        <UserProfileCard
          className="md:mt-0"
        />
        <hr />
        {mapSettingsTags}
        <section className="action-buttons"></section>
      </section>
    </DashboardComponent>
  );
};

export default Settings;
