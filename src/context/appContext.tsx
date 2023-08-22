/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
import { useUserAuth, UserAuthContextProps } from "./userAuthContext";

export const AppContext = createContext({});

interface AppContextProps {
  children?: React.ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProps) => {
  const { user, getDocumentData, loading }: UserAuthContextProps =
    useUserAuth();

  const [appContextLoading, setAppContextLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<any>({});
  const [appContextError, setAppContextError] = useState<string | null>(null); // New state for error handling

  useEffect(() => {
    if (!loading && user) {
      getDocumentData("users", user.uid)
        .then((documentData: any) => {
          if (documentData) {
            console.log(`Document data ${documentData.location.longitude}`);
            setUserData(documentData);
            setAppContextLoading(false);
            setAppContextError(null); // Clear any previous error
          } else {
            console.log("Document not found");
            setAppContextLoading(false);
          }
        })
        .catch((error: Error) => {
          console.error(error);
          setAppContextLoading(false);
          setAppContextError("An error occurred while fetching user data."); // Set error message
        });
    }
  }, [loading, user]);

  const value = {
    username: userData.username,
    appContextLoading: appContextLoading,
    loading: loading,
    userData: userData,
    appContextError: appContextError, // Include error state in the value
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
