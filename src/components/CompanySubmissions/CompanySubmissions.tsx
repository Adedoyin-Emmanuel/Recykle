/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import CompanyClientSubmission from "../CompanyClientSubmission/CompanyClientSubmission";
import {
  useCompanyAppContext,
  CompanyAppContextValuesProps,
} from "../../context/companyAppContext";
import {
  useCompanyAuth,
  CompanyAuthContextProps,
} from "../../context/companyAuthContext";
import { formatDateFromTimestamp } from "../../utils/utilis";

const CompanySubmissions = () => {
  const [userSubmissions, setUserSubmissions] = useState([]);
  const { getUsersSubmission }: CompanyAppContextValuesProps =
    useCompanyAppContext();
  const { company }: CompanyAuthContextProps = useCompanyAuth();

  useEffect(() => {
    async function fetchUserSubmissions() {
      try {
        const submissions = await getUsersSubmission(company.uid);
        setUserSubmissions(submissions);
        console.log(submissions);
      } catch (error) {
        console.error("Error fetching user submissions:", error);
      }
    }

    fetchUserSubmissions();
  }, [company]);

  return (
    <div>
      {userSubmissions?.map((submission: any) => (
        <CompanyClientSubmission
          key={submission.id}
          submittedBy={submission.submittedBy}
          submissionDate={formatDateFromTimestamp(submission.submittedAt)}
          status={submission.status}
        />
      ))}
    </div>
  );
};

export default CompanySubmissions;
