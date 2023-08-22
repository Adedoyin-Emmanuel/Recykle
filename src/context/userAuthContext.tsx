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
  User as FirebaseUser,
  onAuthStateChanged,
} from "firebase/auth";

interface userAuthProps {
  children: React.ReactNode;
}

export interface UserAuthContextProps {
  user: FirebaseUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  loginWithCredentials: (email: string, password: string) => Promise<boolean>;
  loginWithGoogleAccount: () => Promise<boolean>;
  registerWithCredentials: (
    email: string,
    password: string,
    fullname: string,
    username: string
  ) => Promise<boolean>;
  registerWithGoogleAccount: () => Promise<boolean>;
  logout: () => void;
  updateUserLocation: (
    user: FirebaseUser,
    latitude: number,
    longitude: number
  ) => Promise<boolean>;
  getUsername: (user: any) => Promise<string | null>;
  getDocumentData: (
    collectionName: string,
    documentId: string
  ) => Promise<any | null>;
}

const UserAuthContext = createContext<UserAuthContextProps>({
  user: null,
  loading: true,
  isAuthenticated: false,
  loginWithCredentials: async () => false,
  loginWithGoogleAccount: async () => false,
  registerWithCredentials: async () => false,
  registerWithGoogleAccount: async () => false,
  logout: () => {},
  updateUserLocation: async () => false,
  getUsername: async () => null,
  getDocumentData: async () => null,
});

export const UserAuthProvider = ({ children }: userAuthProps) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const googleProvider = new GoogleAuthProvider();
  const toast = new Notification(3000);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
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
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Login error");
      return false;
    }
  };

  const loginWithGoogleAccount = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const newUser = result.user;

      // Check if the user's email is already registered
      const existingUserQuerySnapshot = await getDocs(
        query(collection(db, "users"), where("email", "==", newUser.email))
      );

      if (!existingUserQuerySnapshot.empty) {
        setUser(user);
        toast.success("Login successful");
        return true;
      } else {
        // User's email is not registered, show an error message
        toast.error("This email is not registered. Please sign up.");
        logout();
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const isAuthenticated = !!user; // Determine whether user is authenticated

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
          totalRecyclePoints: 0,
        });
        setUser(userCredentials.user);
        toast.success("User created successfully");
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

  const registerWithGoogleAccount = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        fullname: user.displayName,
        username: user.displayName?.toLowerCase().split(" ").join(""),
        email: user.email,
        dateCreated: serverTimestamp(),
        itemsSubmitted: 0,
        profileImageUrl: user.photoURL,
        role: "user",
        totalItemsRecycled: 0,
        verified: false,
        lastLogin: serverTimestamp(),
        totalRecyclePoints: 0,
      });

      setUser(user);
      toast.success("User created successfully");
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Signup error");
      return false;
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
    user: FirebaseUser,
    latitude: number,
    longitude: number
  ): Promise<boolean> => {
    try {
      if (!user || !latitude || !longitude) {
        console.log(user);
        toast.error("Invalid user or location data");
        return false;
      }

      const location = new GeoPoint(latitude, longitude);
      await setDoc(doc(db, "users", user.uid), { location }, { merge: true });
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

  const value: UserAuthContextProps = {
    user,
    loading,
    isAuthenticated,
    updateUserLocation,
    loginWithCredentials,
    loginWithGoogleAccount,
    registerWithCredentials,
    registerWithGoogleAccount,
    logout,
    getUsername,
    getDocumentData,
  };

  return (
    <UserAuthContext.Provider value={value}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(UserAuthContext);
};
