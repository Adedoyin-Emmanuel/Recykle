/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useUserAuth, userAuthContextProps } from "./userAuthContext";
import Container from "../components/Container/Container";

export const AppContext = createContext({});

interface AppContextProps {
  children?: React.ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProps) => {
  const {
    user,
    getDocumentData,
    loading,
  }: userAuthContextProps | any = useUserAuth();

  const [appContextLoading, setAppContextLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    if (!loading && user) {
      getDocumentData("users", user.uid)
        .then((documentData: any) => {
          if (documentData) {
            console.log(`Document data ${documentData.location.longitude}`);
            setUserData(documentData);
            setAppContextLoading(false);
          } else {
            console.log("Document not found");
            setAppContextLoading(false);
          }
        })
        .catch((error: any) => {
          console.log(error);
          setAppContextLoading(false);
        });
    }
  }, [loading, user]);

  /* Conditional rendering based on data availability */
  if (appContextLoading) {
    return (
      <Container>
        <div className="loader"></div>
      </Container>
    );
  }

  const value = {
    username: userData.username,
    appContextLoading: appContextLoading,
    loading: loading,
    userData: userData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
