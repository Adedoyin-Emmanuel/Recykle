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
      } catch (error) {
        console.error("Error fetching user submissions:", error);
      }
    }

    fetchUserSubmissions();
  }, [company]);

  return (
    <div>
      {userSubmissions.map((submission: any) => (
        <CompanyClientSubmission
          key={submission.id} // Assuming each submission has an id
          submittedBy={submission.submittedBy}
          submissionDate={submission.submissionDate}
          status={submission.status}
          // Add other props as needed
        />
      ))}
    </div>
  );
};

export default CompanySubmissions;
