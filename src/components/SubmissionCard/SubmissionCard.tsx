import React from "react";
import Submitted from "./../../assets/clipboard-tick.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface SubmissionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  submissionDate: string;
  submissionCompany: string;
  status: "success" | "failed" | "pending";
}

const SubmissionCard = ({
  className,
  submissionDate,
  submissionCompany,
  status,
  ...others
}: SubmissionCardProps): JSX.Element => {
  const StatusMapper = () => {
    switch (status) {
      case "success":
        return (
          <div className="bg-green-200 text-[12px] font-bold w-24 rounded-xl opacity-90 hover:opacity-100 capitalize p-1 text-center">
            success
          </div>
        );
      case "failed":
        return (
          <div className="bg-red-500 text-[12px] font-bold w-24 text-white rounded-xl opacity-90 hover:opacity-100 capitalize p-1 text-center">
            failed
          </div>
        );
      case "pending":
        return (
          <div className="bg-yellow-300 text-[12px] w-24 font-bold rounded-xl opacity-90 hover:opacity-100 capitalize p-1 text-center">
            pending
          </div>
        );
    }
  };

  return (
    <section
      className={`submission-card rounded-md p-3 flex items-center justify-between w-full mb-1   cursor-pointer ${className} transition-color transform-gpu ease-in-out duration-100 hover:bg-slate-50`}
      {...others}
    >
      <section className="first-section flex items-center gap-x-4 p-1">
        <img
          src={Submitted}
          className="text-[20px] p-3 rounded bg-green-100 text-white shadow-sm"
        />

        <p className="recycling-date text-sm">{submissionDate}</p>
      </section>

      <section className="subbmitted-to flex items-center justify-around gap-x-3">
        <p className="font-bold block text-sm">
          @
          {submissionCompany.length > 10
            ? submissionCompany.substring(0, 30)
            : submissionCompany}
        </p>

        <StatusMapper />
      </section>
    </section>
  );
};

export default SubmissionCard;
