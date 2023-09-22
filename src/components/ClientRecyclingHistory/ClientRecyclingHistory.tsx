import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../utils/firebase.config";

import RecycleCard from "../../components/RecycleCard/RecycleCard";
import { AppContextValuesProps, useAppContext } from "../../context/appContext";
import {
  UserAuthContextProps,
  useUserAuth,
} from "../../context/userAuthContext";

const ClientRecyclingHistory = () => {
  const { getRecyclingHistory, appContextLoading }: AppContextValuesProps =
    useAppContext();

  const { user }: UserAuthContextProps | any = useUserAuth();
  const [recyclingHistoryData, setRecyclingHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: any; // Declare a variable to hold the unsubscribe function

    async function fetchData() {
      try {
        const data = await getRecyclingHistory(user.uid);
        setRecyclingHistoryData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(`Error fetching recycling history: ${error}`);
      }
    }

    if (user) {
      // Create a Firestore query for real-time updates
      const recyclingHistoryQuery = query(
        collection(db, "users", user.uid, "recyclingHistory"),
        orderBy("dateAdded")
      );

      // Set up a listener for real-time updates
      unsubscribe = onSnapshot(recyclingHistoryQuery, (snapshot) => {
        const updatedData: any = snapshot.docs.map((doc) => doc.data());
        setRecyclingHistoryData(updatedData);
      });
    }

    fetchData(); // Fetch initial data

    // Cleanup function to unsubscribe when component unmounts
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, appContextLoading]);

  return (
    <>
      {isLoading ? (
        <div className="w-full flex items-center justify-center">
          <div className="loader h-7 w-7 border-1"></div>
        </div>
      ) : (
        <div>
          {recyclingHistoryData.length === 0 ? (
            <p className="text-sm text-center">No recycling history 😥</p>
          ) : (
            recyclingHistoryData.map((recyclingHistory: any, index: number) => (
              <RecycleCard
                key={index}
                recycleDate={recyclingHistory?.dateAdded}
                companyName={recyclingHistory?.companyName}
                totalItemsRecycled={recyclingHistory?.totalItemsRecycled}
              />
            ))
          )}
        </div>
      )}
    </>
  );
};

export default ClientRecyclingHistory;
