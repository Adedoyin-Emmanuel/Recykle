/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState, useEffect } from "react";
import Notification from "../utils/toast";
import { auth, db } from "../utils/firebase.config";
import {
  doc,
  setDoc,
  GeoPoint,
  query,
  collection,
  where,
  getDocs,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  navigateToDashboard,
  navigateToAuth,
  navigateToDetails,
} from "../utils/navigate";

interface userAuthProps {
  children: React.ReactNode;
}

export interface userAuthContextProps {
  user?: any;
  loading?: boolean;
  loginWithCredentials?: (email: string, password: string) => void;
  loginWithGoogleAccount?: () => void;
  registerWithCredentials: (
    email: string,
    password: string,
    fullname: string,
    username: string
  ) => void;
  registerWithGoogleAccount: () => void;
  logout?: () => void;
  updateUserLocation?: (user: any, latitude: number, longitude: number) => void;
  getUsername?: (user: any) => void;
  getDocumentData?: (collectionName: string, documentId: string) => void;
}

export const UserAuth = createContext({});

export const UserAuthProvider = ({ children }: userAuthProps) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const googleProvider = new GoogleAuthProvider();
  const toast = new Notification();
  const navigateTo = useNavigate();

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsuscribe();
  }, [auth]);

  const loginWithCredentials = async (email: string, password: string) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredentials.user);
      toast.success("Login successful");
      navigateToDashboard(navigateTo);
    } catch (error) {
      console.error(error);
      return toast.error("Login error");
    }
  };

  const loginWithGoogleAccount = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setUser(user);
      toast.success("Login successful");
      navigateToDashboard(navigateTo);
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const registerWithCredentials = async (
    email: string,
    password: string,
    fullname: string,
    username: string
  ) => {
    try {
      const usernameTaken = await checkIfUsernameIsTaken(username);

      if (!usernameTaken) {
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await setDoc(doc(db, "users", userCredentials.user.uid), {
          fullname: fullname,
          username: username,
          email: email,
          dateCreated: serverTimestamp(),
          itemsSubmitted: 0,
          profileImageUrl: "",
          role: "user",
          totalItemsRecycled: 0,
          verified: false,
          lastLogin: serverTimestamp(),
        });
        setUser(userCredentials.user);
        toast.success("User created successfully");
        navigateToDetails(navigateTo);
      } else {
        return;
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Signup error");
      return;
    }
  };

  const registerWithGoogleAccount = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        fullname: user.displayName,
        username: user.displayName?.toLowerCase().split(" ").join(""),
        email: user.email,
        dateCreated: serverTimestamp(),
        profileImageUrl: user.photoURL,
        role: "user",
        totalItemsRecycled: 0,
        verified: false,
        lastLogin: serverTimestamp(),
      });

      setUser(user);
      toast.success("User created successfully");
      navigateToDetails(navigateTo);
    } catch (error) {
      console.error(error);
      toast.error("Signup error");
      return;
    }
  };

  const checkIfUsernameIsTaken = async (username: string) => {
    if (!username) return "errror with username";

    try {
      const querySnapshot = await getDocs(
        query(collection(db, "users"), where("username", "==", username))
      );

      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking username:", error);
      return error; // Return true if an error occurs to be cautious
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };
  const updateUserLocation = async (
    user: any,
    latitude: number,
    longitude: number
  ) => {
    try {
      if (!user || !latitude || !longitude) {
        console.log(user);
        toast.error("Invalid user or location data");
        return;
      }

      const location = new GeoPoint(latitude, longitude);
      await setDoc(doc(db, "users", user.uid), { location }, { merge: true });
      toast.success("Location saved");

      setTimeout(() => {
        navigateToDashboard(navigateTo);
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("Error saving location");
      setTimeout(() => {
        navigateToAuth(navigateTo);
      }, 1000);
    }
  };

  const getUsername = async (user: any) => {
    if (!user) return;

    try {
      const { uid }: string | any = user;
      const userRef = collection(db, "users");
      const q = query(userRef, where("userId", "==", uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        return userDoc.data().username;
      } else {
        return null; // No user found with the given userId
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

  const value: userAuthContextProps = {
    user,
    loading,
    loginWithCredentials,
    loginWithGoogleAccount,
    registerWithCredentials,
    registerWithGoogleAccount,
    logout,
    updateUserLocation,
    getUsername,
    getDocumentData,
  };

  return <UserAuth.Provider value={value}>{children}</UserAuth.Provider>;
};

export const useUserAuth = () => {
  return useContext(UserAuth);
};
