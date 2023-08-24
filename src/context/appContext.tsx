/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
import { useUserAuth, UserAuthContextProps } from "./userAuthContext";
import {
  addDoc,
  doc,
  collection,
  serverTimestamp,
  updateDoc,
  increment,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../utils/firebase.config";
import Notification from "../utils/toast";
import { User as FirebaseUser } from "firebase/auth";

interface AppContextProps {
  children?: React.ReactNode;
}

export interface AppContextValuesProps {
  username: string;
  user: FirebaseUser | any;
  appContextLoading: boolean;
  loading: boolean;
  userData: any;
  appContextError: any;
  addRecyclingItem: (
    userId: string,
    itemDetails: {
      itemName: string;
      itemCategory: string;
    }
  ) => any;
  getUserRecyclingCollection: (userId: string) => any;
  updateRecyclingItem: (
    userId: string,
    itemId: string,
    updatedItemDetails: any
  ) => void;
  deleteRecyclingItem: (userId: string, itemId: string) => void;
  searchRecyclingCompanies: (searchQuery: string) => any;
  getAllRecyclingCompanies: () => any;
  getRecyclingCompanyById: (companyId: string) => any;
}

export const AppContext = createContext<AppContextValuesProps>({
  username: "",
  user: null,
  appContextLoading: true,
  loading: true,
  userData: {},
  appContextError: {},
  addRecyclingItem: async () => null,
  getUserRecyclingCollection: async () => null,
  updateRecyclingItem: async () => null,
  deleteRecyclingItem: async () => null,
  searchRecyclingCompanies: async () => null,
  getAllRecyclingCompanies: async () => null,
  getRecyclingCompanyById: async () => null,
});

export const AppContextProvider = ({ children }: AppContextProps) => {
  const { user, getDocumentData, loading }: UserAuthContextProps =
    useUserAuth();

  const [appContextLoading, setAppContextLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<any>({});
  const [appContextError, setAppContextError] = useState<string | null>(null);
  const toast = new Notification();

  useEffect(() => {
    if (!loading && user) {
      getDocumentData("users", user.uid)
        .then((documentData: any) => {
          if (documentData) {
            setUserData(documentData);
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
  }, [loading, user]);

  const addRecyclingItem = async (userId: string, itemDetails: any) => {
    try {
      const userDocRef = doc(db, "users", userId);
      const itemsCollectionRef = collection(userDocRef, "itemsCollections");

      await addDoc(itemsCollectionRef, {
        itemName: itemDetails.itemName,
        category: itemDetails.itemCategory,
        dateAdded: serverTimestamp(),
      });

      await updateDoc(userDocRef, {
        totalItemsAdded: increment(1),
      });

      console.log("Recycling item added successfully");
      toast.success("Item added successfully");
      return true;
    } catch (error) {
      console.error("Error adding recycling item:", error);
      toast.error("Error adding item");
      return false;
    }
  };

  const getUserRecyclingCollection = async (userId: string) => {
    try {
      const userDocRef = doc(db, "users", userId);
      const collectionRef = collection(userDocRef, "itemsCollections");

      const querySnapshot = await getDocs(collectionRef);

      const recyclables = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          name: data.itemName,
          category: data.category,
          dateAdded: data.dateAdded.toDate().toLocaleDateString(),
        };
      });

      return recyclables;
    } catch (error) {
      console.error("Error getting recycling items:", error);
      return [];
    }
  };

  const updateRecyclingItem = async (
    userId: string,
    itemId: string,
    updatedItemDetails: any
  ) => {
    try {
      const userDocRef = doc(db, "users", userId);
      const collectionRef = collection(userDocRef, "collections");
      const itemDocRef = doc(collectionRef, itemId);

      await updateDoc(itemDocRef, updatedItemDetails);

      toast.success("Item updated successfully");
    } catch (error) {
      console.error("Error updating recycling item:", error);
      toast.error("Error updating item");
    }
  };

  const deleteRecyclingItem = async (userId: string, itemId: string) => {
    try {
      const userDocRef = doc(db, "users", userId);
      const collectionRef = collection(userDocRef, "collections");
      const itemDocRef = doc(collectionRef, itemId);

      await deleteDoc(itemDocRef);

      console.log("Recycling item deleted successfully");
    } catch (error) {
      console.error("Error deleting recycling item:", error);
    }
  };
  const searchRecyclingCompanies = async (searchQuery: string) => {
    const lowercaseSearchQuery = searchQuery.trim().toLowerCase();
    console.log(lowercaseSearchQuery);
    try {
      const querySnapshot = await getDocs(
        query(
          collection(db, "companies"),
          where("fullname", ">=", lowercaseSearchQuery),
          where("fullname", "<=", lowercaseSearchQuery + "\uf8ff")
        )
      );
      console.log(querySnapshot.docs);
      const results = querySnapshot.docs.map((doc) => doc.data());
      return results;
    } catch (error) {
      console.error("Error searching companies:", error);
      throw error;
    }
  };

  const getAllRecyclingCompanies = async () => {
    const companiesRef = collection(db, "companies");
    try {
      const querySnapshot = await getDocs(companiesRef);

      const recyclingCompanies = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return recyclingCompanies;
    } catch (error) {
      console.error("Error fetching recycling companies:", error);
      return [];
    }
  };

  const getRecyclingCompanyById = async (companyId: string) => {
    const companyRef = doc(db, "companies", companyId);

    try {
      const docSnapshot = await getDoc(companyRef);

      if (docSnapshot.exists()) {
        const companyData = docSnapshot.data();
        return companyData;
      } else {
        console.log("Company not found");
        return null;
      }
    } catch (error) {
      console.error("Error fetching company data:", error);
      return null;
    }
  };

  const value = {
    username: userData.username,
    user: user,
    appContextLoading: appContextLoading,
    loading: loading,
    userData: userData,
    appContextError: appContextError,
    addRecyclingItem,
    getUserRecyclingCollection,
    updateRecyclingItem,
    deleteRecyclingItem,
    searchRecyclingCompanies,
    getAllRecyclingCompanies,
    getRecyclingCompanyById,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
