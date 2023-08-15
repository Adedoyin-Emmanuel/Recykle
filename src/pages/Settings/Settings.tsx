import React from "react";
import Dashboard from "../Dashboard/Dashboard";
import Memoji from "./../../assets/memoji.png";

import { faKey, faLock, faUsers } from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import UserProfileCard from "../../components/UserProfileCard/UserProfileCard";
import SettingsCard from "../../components/SettingsCard/SettingsCard";

// import {
//   navigateToSettings,
//   navigateToProfileEdit,
// } from "../../utils/navigate";

//import { useNavigate } from "react-router-dom";

const Settings: React.FC = (): JSX.Element => {
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
    <Dashboard onProfilePage>
      <section className="profile-section w-full lg:w-2/4 mx-auto flex flex-col items-start justify-start gap-3">
        <UserProfileCard
          profileImage={Memoji}
          isVerified
          profileName="Adedoyin Emmanuel"
          profileUsername="doyin"
          profileDescription="Busy, text y'all later 🫵"
        />
        <hr />
        {mapSettingsTags}
        <section className="action-buttons"></section>
      </section>
    </Dashboard>
  );
};

export default Settings;
