import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRecycle } from "@fortawesome/free-solid-svg-icons";

interface RecycleCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  recycleDate: string;
  recyclingPointsEarned: number;
}

const RecycleCard = ({
  className,
  recycleDate,
  recyclingPointsEarned,
  ...others
}: RecycleCardProps): JSX.Element => {
  return (
    <section
      className={`recycle-card rounded-md p-3 flex items-center justify-between w-full md:w-10/12 mb-1   cursor-pointer ${className} transition-color transform-gpu ease-in-out duration-100 hover:bg-slate-50`}
      {...others}
    >
      <section className="first-section flex items-center gap-x-4 p-1">
        <FontAwesomeIcon
          icon={faRecycle}
          size={"lg"}
          className="text-[20px] p-3 rounded bg-green-100 text-white shadow-sm"
        />

        <p className="recycling-date text-sm">{recycleDate}</p>
      </section>

      <section className="second-section">
        <h3 className="recyclind-points-earned font-bold text-sm md:text-[18px]">
          {recyclingPointsEarned}
        </h3>
      </section>
    </section>
  );
};

export default RecycleCard;
