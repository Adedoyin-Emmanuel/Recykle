import { faRecycle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Timestamp } from "firebase/firestore";
import React from "react";
import { formatDateFromTimestamp } from "../../utils/utilis";

interface RecycleCardProps extends React.HTMLAttributes<HTMLDivElement> {
  recycleDate: Timestamp | any;
  username: string;
  totalItemsRecycled: number | string;
}

const CompanyRecycleCard = ({
  recycleDate,
  username,
  totalItemsRecycled,
}: RecycleCardProps) => {
  return (
    <section
      className={`rounded-md p-3 flex items-center justify-between w-full md:w-10/12 mb-1   cursor-pointer  transition-color transform-gpu ease-in-out duration-100 hover:bg-slate-50`}
    >
      <section className="first-section flex items-center gap-x-4 p-1">
        <FontAwesomeIcon
          icon={faRecycle}
          size={"lg"}
          className="text-[20px] p-3 rounded bg-green-100 text-white shadow-sm"
        />

        <p className="text-sm">{formatDateFromTimestamp(recycleDate)}</p>
      </section>

      <section className="username-section">
        <p className="username text-sm font-bold">{`@${username}`}</p>
      </section>

      <section className="second-section">
        <h3 className="recyclind-points-earned font-bold text-sm md:text-[18px]">
          {totalItemsRecycled}
        </h3>
      </section>
    </section>
  );
};
export default CompanyRecycleCard;
