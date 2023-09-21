/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { AppContextValuesProps, useAppContext } from "../../context/appContext";
import {
  UserAuthContextProps,
  useUserAuth,
} from "../../context/userAuthContext";

import { db } from "../../utils/firebase.config";
import { formatDateFromTimestamp } from "../../utils/utilis";
import SubmissionCard from "../SubmissionCard/SubmissionCard";

const UserSubmissions = () => {
  const { user }: UserAuthContextProps = useUserAuth();
  const [submissions, setSubmissions] = useState<any>([]);
  const { appContextLoading }: AppContextValuesProps = useAppContext();

  useEffect(() => {
    if (user) {
      const userSubmissionsQuery = query(
        collection(db, "users", user.uid, "submissions"),
        orderBy("dateSubmitted", "desc")
      );

      const unsubscribe = onSnapshot(userSubmissionsQuery, (querySnapshot) => {
        const userSubmissions = querySnapshot.docs.map((doc) => doc.data());
        setSubmissions(userSubmissions);
      });

      return () => unsubscribe();
    }
  }, [user]);

  return (
    <>
      {submissions && submissions.length > 0 ? (
        submissions.map((submission: any, index: number) => (
          <SubmissionCard
            linkTo={`submissions/${submission.id}`}
            key={index}
            status={submission.status}
            submissionCompany={
              submission.companyName.length > 10
                ? submission.companyName.substring(0, 10)
                : submission.companyName
            }
            submissionDate={formatDateFromTimestamp(submission.dateSubmitted)}
          />
        ))
      ) : (
        <div className="w-full flex items-center justify-center">
          {!appContextLoading && submissions.length === 0 ? (
            <p className="text-sm text-center">No submissions found 😥</p>
          ) : (
            <div className="loader h-7 w-7 border-1"></div>
          )}
        </div>
      )}
    </>
  );
};

export default UserSubmissions;
