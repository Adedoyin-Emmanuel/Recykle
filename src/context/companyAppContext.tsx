/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
import { useCompanyAuth, CompanyAuthContextProps } from "./companyAuthContext";
import {
  addDoc,
  doc,
  collection,
  serverTimestamp,
  updateDoc,
  increment,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase.config";
import Notification from "../utils/toast";
import { User as FirebaseUser } from "firebase/auth";

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
  getUsersSubmission: async () => null
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
