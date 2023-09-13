import React from "react";
import Submitted from "./../../assets/clipboard-tick.svg";
import { Link } from "react-router-dom";

interface SubmissionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  submissionDate: string;
  submissionCompany: string;
  status: "success" | "failed" | "pending";
  linkTo: string;
}

const SubmissionCard = ({
  className,
  submissionDate,
  submissionCompany,
  status,
  linkTo,
  ...others
}: SubmissionCardProps): JSX.Element => {
  const StatusMapper = () => {
    switch (status) {
      case "success":
        return (
          <div className="bg-green-200 text-[11px] font-bold w-20 rounded opacity-90 hover:opacity-100 capitalize p-1 text-center">
            success
          </div>
        );
      case "failed":
        return (
          <div className="bg-red-500 text-[11px] font-bold w-20 text-white rounded opacity-90 hover:opacity-100 capitalize p-1 text-center">
            failed
          </div>
        );
      case "pending":
        return (
          <div className="bg-yellow-300 text-[11px] w-20 font-bold rounded opacity-90 hover:opacity-100 capitalize p-1 text-center">
            pending
          </div>
        );
    }
  };

  return (
    <Link to={linkTo} className="w-full">
      <section
        className={`submission-card rounded-md p-3 flex items-center justify-between w-full mb-1 cursor-pointer ${className} transition-color transform-gpu ease-in-out duration-100 hover:bg-slate-50`}
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
    </Link>
  );
};

export default SubmissionCard;
