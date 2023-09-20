/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
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
  const [waitingForData, setWaitingForData] = useState<JSX.Element>(
    <div className="loader h-7 w-7 border-1"></div>
  );

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

  useEffect(() => {
    if (submissions && submissions.length == 0) {
      setWaitingForData(
        <p className="font-medium capitalize block text-center w-full">
          {" "}
          No submissions found 😔
        </p>
      );
    }
  }, [submissions]);

  return (
    <>
      {submissions.length == 0 && waitingForData}
      {submissions.map((submission: any, index: number) => (
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
      ))}
    </>
  );
};

export default UserSubmissions;
