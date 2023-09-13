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
      {submissions.length == 0 && (
        <p className="font-medium capitalize block text-center w-full">
          You have no submissions yet !
        </p>
      )}
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
