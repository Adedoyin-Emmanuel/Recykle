import React from "react";
import Submitted from "./../../assets/clipboard-tick.svg";

interface CompanyClientSubmissionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  submissionDate: string;
  submittedBy: string;
  status?: string;
}

const CompanyClientSubmission = ({
  className,
  submissionDate,
  submittedBy,
  ...others
}: CompanyClientSubmissionProps): JSX.Element => {
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
          {submittedBy?.length > 10 ? submittedBy.substring(0, 30) : submittedBy}
        </p>
      </section>
    </section>
  );
};

export default CompanyClientSubmission;
