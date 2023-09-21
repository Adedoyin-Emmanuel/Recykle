import { useEffect, useState } from "react";
import RecycleCard from "../../components/RecycleCard/RecycleCard";
import { AppContextValuesProps, useAppContext } from "../../context/appContext";
import {
  UserAuthContextProps,
  useUserAuth,
} from "../../context/userAuthContext";

const ClientRecyclingHistory = () => {
  const {
    getRecyclingHistory,
    loading,
    appContextLoading,
  }: AppContextValuesProps = useAppContext();
  const [recyclingHistoryData, setRecyclingHistoryData] = useState([]);
  const { user }: UserAuthContextProps | any = useUserAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        console.log(user);
        const data = await getRecyclingHistory(user.uid);
        setRecyclingHistoryData(data);
        console.log(recyclingHistoryData);
      } catch (error) {
        console.log(`Error fetching recycling history: ${error}`);
      }
    }

    fetchData();
  }, [user, loading, appContextLoading]);

  return (
    <>
      {recyclingHistoryData && recyclingHistoryData.length > 0 ? (
        recyclingHistoryData?.map((recyclingHistory: any, index: number) => (
          <RecycleCard
            key={index}
            recycleDate={recyclingHistory?.dateAdded}
            companyName={recyclingHistory?.companyName}
            totalItemsRecycled={recyclingHistory?.totalItemsRecycled}
          />
        ))
      ) : (
        <div className="w-full flex items-center justify-center">
          {!appContextLoading && recyclingHistoryData?.length === 0 ? (
            <p className="text-sm text-center">No recycling history 😥</p>
          ) : (
            <div className="loader h-7 w-7 border-1"></div>
          )}
        </div>
      )}
    </>
  );
};

export default ClientRecyclingHistory;
