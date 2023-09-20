/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Submitted from "./../../assets/clipboard-tick.svg";
import { Timestamp } from "firebase/firestore";
import { Link } from "react-router-dom";

interface CompanyClientSubmissionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  submissionDate: Timestamp | any;
  submittedBy: string;
  status: "success" | "failed" | "pending";
  linkTo: string;
}

const CompanyClientSubmission = ({
  className,
  submissionDate,
  submittedBy,
  status,
  linkTo,
  ...others
}: CompanyClientSubmissionProps): JSX.Element => {
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
            {submittedBy?.length > 10
              ? `${submittedBy.substring(0, 10)} ...`
              : submittedBy}
          </p>
        </section>
        <StatusMapper />
      </section>
    </Link>
  );
};

export default CompanyClientSubmission;
