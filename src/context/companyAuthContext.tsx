/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState, useEffect } from "react";
import Notification from "../utils/toast";
import { auth, db, storage } from "../utils/firebase.config";
import {
  doc,
  setDoc,
  updateDoc,
  query,
  collection,
  where,
  getDocs,
  getDoc,
  serverTimestamp,
  GeoPoint,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
  onAuthStateChanged,
} from "firebase/auth";

interface companyAuthProps {
  children: React.ReactNode;
}

export interface CompanyAuthContextProps {
  company: FirebaseUser | any;
  companyLoading: boolean;
  isAuthenticated: boolean;
  loginWithCredentials: (email: string, password: string) => Promise<boolean>;
  registerWithCredentials: (
    email: string,
    password: string,
    fullname: string,
    username: string
  ) => Promise<boolean>;
  logout: () => void;
  updateCompanyLocation: (
    company: FirebaseUser,
    latitude: number,
    longitude: number
  ) => Promise<boolean>;
  getUsername: (user: any) => Promise<string | null>;
  getDocumentData: (
    collectionName: string,
    documentId: string
  ) => Promise<any | null>;
  updateCompanyDetails: (
    company: FirebaseUser,
    latitude: number,
    longitude: number,
    companyAddress: string,
    companyLogoFile: File,
    companyNumber: number
  ) => Promise<any | null>;
}

const CompanyAuthContext = createContext<CompanyAuthContextProps>({
  company: null,
  companyLoading: true,
  isAuthenticated: false,
  loginWithCredentials: async () => false,
  registerWithCredentials: async () => false,
  logout: () => {},
  updateCompanyLocation: async () => false,
  getUsername: async () => null,
  getDocumentData: async () => null,
  updateCompanyDetails: async () => null,
});

export const CompanyAuthProvider = ({ children }: companyAuthProps) => {
  const [company, setCompany] = useState<any>(null);
  const [companyLoading, setCompanyLoading] = useState<boolean>(true);
  const toast = new Notification(3000);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCompany(user);
      setCompanyLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const loginWithCredentials = async (email: string, password: string) => {
    try {
      const companyCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setCompany(companyCredentials.user);
      toast.success("Login successful");
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Login error");
      return false;
    }
  };

  const isAuthenticated = !!company; // Determine whether user is authenticated

  const registerWithCredentials = async (
    email: string,
    password: string,
    fullname: string,
    username: string
  ) => {
    try {
      const usernameTaken = await checkIfUsernameIsTaken(username);

      if (!usernameTaken) {
        const companyCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await setDoc(doc(db, "companies", companyCredentials.user.uid), {
          fullname: fullname,
          username: username,
          email: email,
          dateCreated: serverTimestamp(),
          itemsRecycled: 0,
          profileImageUrl: "",
          role: "company",
          itemsReceived: 0,
          verified: true,
          lastLogin: serverTimestamp(),
          usersFeedback: 0,
        });
        setCompany(companyCredentials.user);
        toast.success("Company registered successfully");
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Signup error");
      return false;
    }
  };

  const checkIfUsernameIsTaken = async (username: string) => {
    if (!username) return "errror with username";

    try {
      const querySnapshot = await getDocs(
        query(collection(db, "companies"), where("username", "==", username))
      );

      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking username:", error);
      return error; // Return true if an error occurs to be cautious
    }
  };
  const updateCompanyDetails = async (
    company: FirebaseUser,
    latitude: number,
    longitude: number,
    companyAddress: string,
    companyLogoFile: File,
    companyNumber: number
  ) => {
    try {
      const companyLocation = new GeoPoint(latitude, longitude);

      if (!companyLogoFile.type.startsWith("image/")) {
        toast.error("Invalid file type. Please upload an image.");
        return;
      }

      if (companyLogoFile) {
        const companyLogoStorageRef = ref(
          storage,
          `companyLogo/${company.uid}`
        );
        const uploadTask = await uploadBytes(
          companyLogoStorageRef,
          companyLogoFile
        );
        const logoUrl = await getDownloadURL(uploadTask.ref);

        const companyDocRef = doc(db, "companies", company.uid);
        await updateDoc(companyDocRef, {
          location: companyLocation,
          address: companyAddress,
          logo: logoUrl,
          number: companyNumber,
        });
      } else {
        const companyDocRef = doc(db, "companies", company.uid);

        await updateDoc(companyDocRef, {
          location: companyLocation,
          address: companyAddress,
          number: companyNumber,
        });
      }

      toast.success("Details updated successfully");
      return true;
    } catch (error) {
      console.error("Error updating company details:", error);
      toast.error("Failed to update details");
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCompany(null);
    } catch (error) {
      console.error(error);
    }
  };

  const updateCompanyLocation = async (
    company: FirebaseUser,
    latitude: number,
    longitude: number
  ): Promise<boolean> => {
    try {
      if (!company || !latitude || !longitude) {
        console.log(company);
        toast.error("Invalid user or location data");
        return false;
      }

      const location = new GeoPoint(latitude, longitude);
      await setDoc(
        doc(db, "companies", company.uid),
        { location },
        { merge: true }
      );
      toast.success("Location saved");
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Error saving location");
      return false;
    }
  };

  const getUsername = async (user: any) => {
    if (!user) return;

    try {
      const { uid }: string | any = user;
      const userRef = collection(db, "companies");
      const q = query(userRef, where("userId", "==", uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        return userDoc.data().username;
      } else {
        return null; // No company found with the given company
      }
    } catch (error) {
      console.error("Error getting username:", error);
      return null;
    }
  };

  const getDocumentData = async (
    collectionName: string,
    documentId: string
  ) => {
    try {
      const documentRef = doc(db, collectionName, documentId);
      const documentSnapshot = await getDoc(documentRef);

      if (documentSnapshot.exists()) {
        const documentData = documentSnapshot.data();
        return documentData;
      } else {
        return null; // Document not found
      }
    } catch (error) {
      console.error("Error getting document data:", error);
      return null;
    }
  };

  const value: CompanyAuthContextProps = {
    company: company,
    companyLoading: companyLoading,
    isAuthenticated,
    updateCompanyLocation: updateCompanyLocation,
    loginWithCredentials,
    registerWithCredentials,
    logout,
    getUsername,
    getDocumentData,
    updateCompanyDetails,
  };

  return (
    <CompanyAuthContext.Provider value={value}>
      {children}
    </CompanyAuthContext.Provider>
  );
};

export const useCompanyAuth = () => {
  return useContext(CompanyAuthContext);
};
