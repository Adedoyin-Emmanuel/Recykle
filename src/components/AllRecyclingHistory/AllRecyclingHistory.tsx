import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  CompanyAppContextValuesProps,
  useCompanyAppContext,
} from "../../context/companyAppContext";
import {
  CompanyAuthContextProps,
  useCompanyAuth,
} from "../../context/companyAuthContext";
import { db } from "../../utils/firebase.config";
import CompanyRecycleCard from "../CompanyRecycleCard/CompanyRecycleCard";

const AllRecyclingHistory = () => {
  const { getRecyclingHistory, companyLoading }: CompanyAppContextValuesProps =
    useCompanyAppContext();

  const [recyclingHistoryData, setRecyclingHistoryData] = useState([]);
  const { company }: CompanyAuthContextProps = useCompanyAuth();

  useEffect(() => {
    const recyclingHistoryQuery = query(
      collection(db, "companies", company.uid, "recyclingHistory"),
      orderBy("dateAdded")
    );

    // Set up a listener for real-time updates
    const unsubscribe = onSnapshot(recyclingHistoryQuery, (querySnapshot) => {
      const data: any = querySnapshot.docs.map((doc) => doc.data());
      setRecyclingHistoryData(data);
    });

    return () => {
      // Clean up the listener when the component unmounts
      unsubscribe();
    };
  }, [company]);

  return (
    <>
      {recyclingHistoryData && recyclingHistoryData.length > 0 ? (
        recyclingHistoryData?.map((recyclingHistory: any, index: number) => (
          <CompanyRecycleCard
            key={index}
            recycleDate={recyclingHistory?.dateAdded}
            username={recyclingHistory?.submittedBy}
            totalItemsRecycled={recyclingHistory?.totalItemsRecycled}
          />
        ))
      ) : (
        <div className="w-full flex items-center justify-center">
          {!companyLoading && recyclingHistoryData?.length === 0 ? (
            <p className="text-sm text-center">No recycling history 😥</p>
          ) : (
            <div className="loader h-7 w-7 border-1"></div>
          )}
        </div>
      )}
    </>
  );
};

export default AllRecyclingHistory;
