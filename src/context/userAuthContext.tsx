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
  collectionGroup,
  where,
  getDocs,
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
import { navigateToDashboard, navigateToAuth } from "../utils/navigate";

interface userAuthProps {
  children: React.ReactNode;
}

export interface userAuthContextProps {
  user?: any;
  loading?: boolean;
  loginWithCredentials?: () => void;
  loginWithGoogleAccount?: () => void;
  registerWithCredentials: (
    email: string,
    password: string,
    fullname: string,
    username: string
  ) => void;
  registerWithGoogleAccount: () => void;
  logout?: () => void;
  updateUserLocation?: () => void;
}

export const UserAuth = createContext({});
const defaultUserLocation = new GeoPoint(0, 0);

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
      setUser(userCredentials);
      toast.success("Login successful");
      console.log(userCredentials.user);
    } catch (error) {
      console.log(error);
      toast.error("Login error");
    }
  };

  const loginWithGoogleAccount = async () => {
    try {
      await signInWithPopup(auth, googleProvider).then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Login successful");
        console.log(`user signed in as ${user.displayName}`);
      });
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
    }
  };

  const registerWithCredentials = async (
    email: string,
    password: string,
    fullname: string,
    username: string
  ) => {
    try {
      const result = await checkIfUsernameIsTaken(username);

      if (!result) {
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
          location: defaultUserLocation,
        });
        setUser(userCredentials.user);
        toast.success("User created successfully");
        console.log(user);
      } else {
        toast.error("Username already exist");
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Sigup error");
    }
  };

  const registerWithGoogleAccount = async () => {
    try {
      await signInWithPopup(auth, googleProvider).then(async (result) => {
        const user = result.user;

        //store the user details
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
          location: defaultUserLocation,
        });
        setUser(user);
        toast.success("User created successfully");
        console.log(user);
      });
    } catch (error) {
      console.log(error);
      toast.error("Signup error");
    }
  };

  const checkIfUsernameIsTaken = async (username: string) => {
    if (!username) return true;

    try {
      // Create a query to search for documents with the specified username
      const querySnapshot = await getDocs(
        query(collectionGroup(db, "users"), where("username", "==", username))
      );

      return !querySnapshot.empty;
    } catch (error) {
      console.log(error);
      return true;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserLocation = async (latitude: number, longitude: number) => {
    try {
      if (!user || !latitude || !longitude) return;
      const location = new GeoPoint(latitude, longitude);
      await setDoc(doc(db, "users", user.uid), { location }, { merge: true });
      toast.success("Location saved");

      setTimeout(() => {
        navigateToDashboard(navigateTo);
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Error saving location");
      setTimeout(() => {
        navigateToAuth(navigateTo);
      }, 1000);
    }
  };

  const value = {
    user,
    loading,
    loginWithCredentials,
    loginWithGoogleAccount,
    registerWithCredentials,
    registerWithGoogleAccount,
    logout,
    updateUserLocation,
  };

  return <UserAuth.Provider value={value}>{children}</UserAuth.Provider>;
};

export const useUserAuth = () => {
  return useContext(UserAuth);
};
