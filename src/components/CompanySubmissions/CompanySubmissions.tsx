import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  CompanyAppContextValuesProps,
  useCompanyAppContext,
} from "../../context/companyAppContext";
import {
  CompanyAuthContextProps,
  useCompanyAuth,
} from "../../context/companyAuthContext";
import { db } from "../../utils/firebase.config";
import { formatDateFromTimestamp } from "../../utils/utilis";
import CompanyClientSubmission from "../CompanyClientSubmission/CompanyClientSubmission";

const CompanySubmissions = () => {
  const [userSubmissions, setUserSubmissions] = useState([]);
  const { getUsersSubmission }: CompanyAppContextValuesProps =
    useCompanyAppContext();
  const { company }: CompanyAuthContextProps = useCompanyAuth();

  useEffect(() => {
    // Create a Firestore query for real-time updates
    const userSubmissionsQuery = query(
      collection(db, "companies", company.uid, "submissions")
    );

    // Set up a listener for real-time updates
    const unsubscribe = onSnapshot(userSubmissionsQuery, (querySnapshot) => {
      const submissions: any = querySnapshot.docs.map((doc) => doc.data());
      setUserSubmissions(submissions);
    });

    return () => {
      unsubscribe();
    };
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
