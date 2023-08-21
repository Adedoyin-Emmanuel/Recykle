/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../utils/firebase.config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

interface userAuthProps {
  children: React.ReactNode;
}

const UserAuth = createContext({});

export const UserAuthProvider = ({ children }: userAuthProps) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsuscribe();
  }, [auth]);

  const loginWithCredentials = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const registerWithCredentials = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (result) => {
          console.log(result);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const registerWithGoogleAccount = async () => {
    try {
      await signInWithPopup(auth, googleProvider).then((result) => {
        const user = result.user;

        console.log(result);
        console.log(user);
        setUser(user);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const loginWithGoogleAccount = async () => {
    try {
      await signInWithPopup(auth, googleProvider).then((result) => {
        const user = result.user;
        setUser(user);
        console.log(`user signed in as ${user}`);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    user,
    loginWithCredentials,
    loginWithGoogleAccount,
    registerWithCredentials,
    registerWithGoogleAccount,
    logout,
  };

  return (
    <UserAuth.Provider value={value}>{!loading && children}</UserAuth.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(UserAuth);
};
