/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  useUserAuth,
  UserAuthContextProps,
} from "../../context/userAuthContext";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebase.config";
import SubmissionCard from "../SubmissionCard/SubmissionCard";
import { formatDateFromTimestamp } from "../../utils/utilis";

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
          No collection found 😔
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
