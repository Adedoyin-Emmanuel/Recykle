import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";

interface DashboardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const DashboardHeader: React.FC = ({
  className,
  ...others
}: DashboardHeaderProps): JSX.Element => {
  return (
    <section
      className={`dashboard-header w-full flex items-center justify-between p-2 mb-3 ${className}`}
      {...others}
    >
      <section className="greeting">
        <h3 className="text-[20px] md:text-2xl font-bold capitalize ">
          welcome chief 👋
        </h3>
      </section>

      <section className="action-icons flex items-center justify-around gap-x-5">
        <section className="notification cursor-pointer">
          <FontAwesomeIcon
            icon={faBell}
            size={"lg"}
            className="transition-colors transform-gpu hover:bg-slate-100 p-3 shadow-sm rounded-full hover:text-green-300"
          />
        </section>

        <section className="profile cursor-pointer">
          <section className="bg-green-300 h-10 w-10 rounded-full"></section>
        </section>
      </section>
    </section>
  );
};

export default DashboardHeader;
