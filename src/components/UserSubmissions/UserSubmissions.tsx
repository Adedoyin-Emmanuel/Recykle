/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  useUserAuth,
  UserAuthContextProps,
} from "../../context/userAuthContext";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebase.config";
import SubmissionCard from "../SubmissionCard/SubmissionCard";

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
      {submissions.map((submission: any, index: number) => (
        <SubmissionCard
          key={index}
          status={submission.status}
          submissionCompany={submission.companyName}
          submissionDate={submission.dateSubmitted
            .toDate()
            .toLocaleDateString()}
        />
      ))}
    </>
  );
};

export default UserSubmissions;
