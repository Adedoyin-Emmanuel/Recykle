/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { User as FirebaseUser } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../utils/firebase.config";
import Notification from "../utils/toast";
import { CompanyAuthContextProps, useCompanyAuth } from "./companyAuthContext";

interface CompanyAppContextProps {
  children?: React.ReactNode;
}

export interface CompanyAppContextValuesProps {
  username: string;
  company: FirebaseUser | any;
  companyContextLoading: boolean;
  companyLoading: boolean;
  companyData: any;
  appContextError: any;
  addServiceItem: (
    companyId: string,
    serviceDetails: {
      serviceName: string;
      serviceCategory: string;
    }
  ) => any;
  getCompanyServiceCollection: (companyId: string) => any;
  updateCompanyServiceItem: (
    companyId: string,
    itemId: string,
    updatedItemDetails: any
  ) => void;
  deleteCompanyServiceItem: (companyId: string, itemId: string) => void;
  getUsersSubmission: (companyId: string) => any;
  getUserSubmissionById: (submissionId: string, companyId: string) => any;
  deleteUserSubmission: (
    submissionId: string,
    userId: string,
    companyId: string
  ) => any;
  acceptUserSubmission: (
    submissionId: string,
    userId: string,
    companyId: string
  ) => any;
  cancelUserSubmission: (
    submissionId: string,
    userId: string,
    companyId: string
  ) => any;
}

export const CompanyAppContext = createContext<CompanyAppContextValuesProps>({
  username: "",
  company: null,
  companyContextLoading: true,
  companyLoading: true,
  companyData: {},
  appContextError: {},
  addServiceItem: async () => null,
  getCompanyServiceCollection: async () => null,
  updateCompanyServiceItem: async () => null,
  deleteCompanyServiceItem: async () => null,
  getUsersSubmission: async () => null,
  getUserSubmissionById: async () => null,
  deleteUserSubmission: async () => null,
  acceptUserSubmission: async () => null,
  cancelUserSubmission: async () => null,
});

export const CompanyAppContextProvider = ({
  children,
}: CompanyAppContextProps) => {
  const { company, getDocumentData, companyLoading }: CompanyAuthContextProps =
    useCompanyAuth();

  const [appContextLoading, setAppContextLoading] = useState<boolean>(true);
  const [companyData, setCompanyData] = useState<any>({});
  const [appContextError, setAppContextError] = useState<string | null>(null);
  const toast = new Notification();

  useEffect(() => {
    if (!companyLoading && company) {
      getDocumentData("companies", company.uid)
        .then((documentData: any) => {
          if (documentData) {
            setCompanyData(documentData);
            setAppContextLoading(false);
            setAppContextError(null);
          } else {
            console.log("Document not found");
            setAppContextLoading(false);
          }
        })
        .catch((error: Error) => {
          console.error(error);
          setAppContextLoading(false);
          setAppContextError("An error occurred while fetching user data.");
        });
    }
  }, [companyLoading, company]);

  const addServiceItem = async (companyId: string, serviceDetails: any) => {
    try {
      const companyDocRef = doc(db, "companies", companyId);
      const itemsCollectionRef = collection(
        companyDocRef,
        "serviceCollections"
      );

      await addDoc(itemsCollectionRef, {
        itemName: serviceDetails.serviceName,
        category: serviceDetails.serviceCategory,
        dateAdded: serverTimestamp(),
      });

      await updateDoc(companyDocRef, {
        totalItemsAdded: increment(1),
      });

      console.log("Service added successfully");
      toast.success("Service added successfully");
      return true;
    } catch (error) {
      console.error("Error adding recycling item:", error);
      toast.error("Error adding service");
      return false;
    }
  };

  const getCompanyServiceCollection = async (companyId: string) => {
    try {
      const companyDocRef = doc(db, "companies", companyId);
      const collectionRef = collection(companyDocRef, "itemsCollections");

      const querySnapshot = await getDocs(collectionRef);

      const services = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          name: data.serviceName,
          category: data.serviceCategory,
          dateAdded: data.dateAdded.toDate().toLocaleDateString(),
        };
      });

      return services;
    } catch (error) {
      console.error("Error getting service items:", error);
      return [];
    }
  };

  const getUsersSubmission = async (companyId: string) => {
    try {
      const companyDocRef = doc(db, "companies", companyId);
      const submissionsRef = collection(companyDocRef, "submissions");
      const querySnapshot = await getDocs(submissionsRef);

      const companySubmissions = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return companySubmissions;
    } catch (error) {
      console.error("Error fetching users submissions:", error);
      return [];
    }
  };

  const updateServiceItem = async (
    companyId: string,
    serviceId: string,
    updatedItemDetails: any
  ) => {
    try {
      const companyDocRef = doc(db, "companies", companyId);
      const collectionRef = collection(companyDocRef, "collections");
      const serviceDocRef = doc(collectionRef, serviceId);

      await updateDoc(serviceDocRef, updatedItemDetails);

      toast.success("Service item updated successfully");
    } catch (error) {
      console.error("Error updating recycling item:", error);
      toast.error("Error updating service item");
    }
  };

  const deleteServiceItem = async (companyId: string, serviceId: string) => {
    try {
      const companyDocRef = doc(db, "companies", companyId);
      const collectionRef = collection(companyDocRef, "collections");
      const serviceDocRef = doc(collectionRef, serviceId);

      await deleteDoc(serviceDocRef);

      console.log("Recycling item deleted successfully");
    } catch (error) {
      console.error("Error deleting recycling item:", error);
    }
  };

  const getUserSubmissionById = async (
    submissionId: string,
    companyId: string
  ) => {
    if (!submissionId || !companyId)
      throw new Error("submissionId, userId or companyId is required");

    try {
      const submissionRef = doc(db, "companies", companyId);
      const submissionCollectionRef = collection(submissionRef, "submissions");

      const submissionQuery = query(
        submissionCollectionRef,
        where("id", "==", submissionId)
      );

      const querySnapshot = await getDocs(submissionQuery);

      if (querySnapshot.empty) return null;

      const submisionDoc = querySnapshot.docs[0];
      return submisionDoc.data();
    } catch (error: unknown) {
      toast.error("An error occured when getting user submission");
      console.log(error);
    }
  };

  const deleteUserSubmission = async (
    submissionId: string,
    companyId: string,
    userId: string
  ) => {
    if (!submissionId || !userId || !companyId) {
      throw new Error("userId, submissionId, or companyId is missing");
    }

    try {
      const userDocRef = doc(db, "users", userId);
      const userDocSnapshot = await getDoc(userDocRef);

      if (!userDocSnapshot.exists()) {
        throw new Error(`User document with ID ${userId} does not exist.`);
      }

      const batch = writeBatch(db);

      const submissionCollectionRef = collection(userDocRef, "submissions");
      const companySubmissionRef = doc(db, "companies", companyId);
      const companySubmissionCollectionRef = collection(
        companySubmissionRef,
        "submissions"
      );

      // Query for the submission document
      const submissionQuery = query(
        submissionCollectionRef,
        where("id", "==", submissionId)
      );
      const submissionQuerySnapshot = await getDocs(submissionQuery);

      // Query for the company submission document
      const companySubmissionQuery = query(
        companySubmissionCollectionRef,
        where("id", "==", submissionId)
      );
      const companySubmissionQuerySnapshot = await getDocs(
        companySubmissionQuery
      );

      if (!submissionQuerySnapshot.empty) {
        const submissionDocRef = submissionQuerySnapshot.docs[0].ref;
        batch.delete(submissionDocRef);
      }

      if (!companySubmissionQuerySnapshot.empty) {
        const companySubmissionDocRef =
          companySubmissionQuerySnapshot.docs[0].ref;
        batch.delete(companySubmissionDocRef);
      }

      // Update the user document
      batch.update(userDocRef, {
        itemsSubmitted: increment(-1),
      });

      batch.update(companySubmissionRef, {
        itemsReceived: increment(-1),
      });

      await batch.commit();

      toast.success("Submission deleted successfully");
    } catch (error) {
      toast.error("An error occurred while deleting submission data");
      console.error("Error deleting documents:", error);
      throw error;
    }
  };

  const acceptUserSubmission = async (
    submissionId: string,
    companyId: string,
    userId: string
  ) => {
    if (!submissionId || !userId || !companyId)
      throw new Error("submissionId, userId or companyId must be provided");

    try {
      const userDocRef = doc(db, "users", userId);
      const userDocSnapshot = await getDoc(userDocRef);

      if (!userDocSnapshot.exists()) {
        throw new Error(`User document with ID ${userId} does not exist.`);
      }

      const batch = writeBatch(db);

      const submissionCollectionRef = collection(userDocRef, "submissions");
      const companySubmissionRef = doc(db, "companies", companyId);
      const companySubmissionCollectionRef = collection(
        companySubmissionRef,
        "submissions"
      );

      // Query for the submission document
      const submissionQuery = query(
        submissionCollectionRef,
        where("id", "==", submissionId)
      );
      const submissionQuerySnapshot = await getDocs(submissionQuery);

      // Query for the company submission document
      const companySubmissionQuery = query(
        companySubmissionCollectionRef,
        where("id", "==", submissionId)
      );
      const companySubmissionQuerySnapshot = await getDocs(
        companySubmissionQuery
      );

      if (!submissionQuerySnapshot.empty) {
        const submissionDocRef = submissionQuerySnapshot.docs[0].ref;
        batch.update(submissionDocRef, {
          status: "success",
        });
      }

      if (!companySubmissionQuerySnapshot.empty) {
        const companySubmissionDocRef =
          companySubmissionQuerySnapshot.docs[0].ref;
        batch.update(companySubmissionDocRef, {
          status: "success",
        });
      }

      //dash the user some recycling points
      batch.update(userDocRef, {
        totalRecyclePoints: increment(100),
        totalItemsRecycled: increment(1),
      });

      //update the company total recycling transactions
      batch.update(companySubmissionRef, {
        itemsRecycled: increment(1),
      });

      await batch.commit();
      toast.success("Submission approved successfully");
    } catch (error: unknown) {
      toast.error("An error occurred while approving submission");
      console.error("Error approving documents:", error);
      throw error;
    }
  };

  const cancelUserSubmission = async (
    submissionId: string,
    companyId: string,
    userId: string
  ) => {
    if (!submissionId || !userId || !companyId)
      throw new Error("submissionId, userId or companyId must be provided");
    try {
      const userDocRef = doc(db, "users", userId);
      const userDocSnapshot = await getDoc(userDocRef);

      if (!userDocSnapshot.exists()) {
        throw new Error(`User document with ID ${userId} does not exist.`);
      }

      const batch = writeBatch(db);

      const submissionCollectionRef = collection(userDocRef, "submissions");
      const companySubmissionRef = doc(db, "companies", companyId);
      const companySubmissionCollectionRef = collection(
        companySubmissionRef,
        "submissions"
      );

      // Query for the submission document
      const submissionQuery = query(
        submissionCollectionRef,
        where("id", "==", submissionId)
      );
      const submissionQuerySnapshot = await getDocs(submissionQuery);

      // Query for the company submission document
      const companySubmissionQuery = query(
        companySubmissionCollectionRef,
        where("id", "==", submissionId)
      );
      const companySubmissionQuerySnapshot = await getDocs(
        companySubmissionQuery
      );

      if (!submissionQuerySnapshot.empty) {
        const submissionDocRef = submissionQuerySnapshot.docs[0].ref;
        batch.update(submissionDocRef, {
          status: "failed",
        });
      }

      if (!companySubmissionQuerySnapshot.empty) {
        const companySubmissionDocRef =
          companySubmissionQuerySnapshot.docs[0].ref;
        batch.update(companySubmissionDocRef, {
          status: "failed",
        });
      }

      await batch.commit();
      toast.success("Submission canceled successfully");
    } catch (error: unknown) {
      toast.error("An error occurred while canceling submission");
      console.error("Error canceling documents:", error);
      throw error;
    }
  };

  const value: CompanyAppContextValuesProps = {
    username: companyData.username,
    company: company,
    companyContextLoading: appContextLoading,
    companyLoading: companyLoading,
    companyData: companyData,
    appContextError: appContextError,
    addServiceItem: addServiceItem,
    getCompanyServiceCollection: getCompanyServiceCollection,
    updateCompanyServiceItem: updateServiceItem,
    deleteCompanyServiceItem: deleteServiceItem,
    getUsersSubmission,
    getUserSubmissionById,
    deleteUserSubmission,
    acceptUserSubmission,
    cancelUserSubmission,
  };

  return (
    <CompanyAppContext.Provider value={value}>
      {children}
    </CompanyAppContext.Provider>
  );
};

export const useCompanyAppContext = () => {
  return useContext(CompanyAppContext);
};
