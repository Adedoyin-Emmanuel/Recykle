import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface SettingsCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  settingsCardIcon: IconProp;
  settingsCardHeaderText: string;
  settingsCardSubText: string;
  others?: React.Attributes;
  onClick: () => void;
}

const SettingsCard = ({
  className,
  settingsCardIcon,
  settingsCardHeaderText,
  settingsCardSubText,
  onClick,
  ...others
}: SettingsCardProps): JSX.Element => {
  return (
    <section
      className={`settings-card shadow-sm mt-4 hover:bg-green-5 w-full flex items-center p-5 cursor-pointer ${className}`}
      {...others}
      onClick={onClick}
    >
      <FontAwesomeIcon
        className="w-1/12 "
        size={"lg"}
        icon={settingsCardIcon}
      />

      <section className="settings-card-details w-10/12 md:mx-3 mx-4">
        <h4 className="settings-header-name capialize font-bold">
          {settingsCardHeaderText}
        </h4>

        <p className="text-sm">{settingsCardSubText}</p>
      </section>
    </section>
  );
};

export default SettingsCard;
