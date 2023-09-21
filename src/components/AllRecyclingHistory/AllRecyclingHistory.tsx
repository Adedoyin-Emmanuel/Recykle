import { useEffect, useState } from "react";
import {
  CompanyAppContextValuesProps,
  useCompanyAppContext,
} from "../../context/companyAppContext";
import {
  CompanyAuthContextProps,
  useCompanyAuth,
} from "../../context/companyAuthContext";
import { formatDateFromTimestamp } from "../../utils/utilis";
import CompanyRecycleCard from "../CompanyRecycleCard/CompanyRecycleCard";

const AllRecyclingHistory = () => {
  const { getRecyclingHistory, companyLoading }: CompanyAppContextValuesProps =
    useCompanyAppContext();

  const [recyclingHistoryData, setRecyclingHistoryData] = useState([]);
  const { company }: CompanyAuthContextProps = useCompanyAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getRecyclingHistory(company.uid);
        setRecyclingHistoryData(data);
        console.log(data);
      } catch (error) {
        console.log(`Error fetching recycling history: ${error}`);
      }
    }

    fetchData();
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
