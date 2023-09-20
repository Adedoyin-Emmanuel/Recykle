/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  CompanyAppContextValuesProps,
  useCompanyAppContext,
} from "../../context/companyAppContext";
import {
  CompanyAuthContextProps,
  useCompanyAuth,
} from "../../context/companyAuthContext";
import { formatDateFromTimestamp } from "../../utils/utilis";
import CompanyClientSubmission from "../CompanyClientSubmission/CompanyClientSubmission";

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
    <>
      {userSubmissions && userSubmissions?.length > 0 ? (
        userSubmissions?.map((submission: any) => (
          <CompanyClientSubmission
            linkTo={`submissions/${submission.id}`}
            key={submission.id}
            submittedBy={submission.submittedBy}
            submissionDate={formatDateFromTimestamp(submission.submittedAt)}
            status={submission.status}
          />
        ))
      ) : (
        <p>No submissions found 😥</p>
      )}
    </>
  );
};

export default CompanySubmissions;
