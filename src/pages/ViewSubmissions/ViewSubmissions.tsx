/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import DashboardComponent from "../../components/DashboardComponent/DashboardComponent";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext, AppContextValuesProps } from "../../context/appContext";
import SubmissionCard from "../../components/SubmissionCard/SubmissionCard";
import { Timestamp } from "firebase/firestore";
import { formatDateFromTimestamp } from "../../utils/utilis";
import Collection from "../../components/Collection/Collection";
import { navigateToDashboard } from "../../utils/navigate";

interface SubmissionDataProps {
  id: string;
  status: "pending" | "success" | "failed";
  companyName: string;
  dateSubmitted: Timestamp;
  companyId: string;
}

const ViewSubmissions: React.FC = (): JSX.Element => {
  const { submissionId }: string | any = useParams();
  const [submissionData, setSubmmissionData] = useState<SubmissionDataProps>();
  const [recyclables, setRecyclables] = useState<any>({});

  const {
    getUserSubmissions,
    user,
    appContextLoading,
    deleteUserSubmission,
  }: AppContextValuesProps = useAppContext();

  const navigateTo = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getUserSubmissions(user.uid, submissionId);
        console.log(result);
        setSubmmissionData(result);
        setRecyclables(result.itemsSubmitted);
      } catch (error: unknown) {
        console.error("Error fetching user submissions:", error);
      }
    }

    fetchData();
  }, [user, submissionId]);

  const handleButtonClick = async () => {
    submissionData && (await deleteUserSubmission(user.uid, submissionData.id, submissionData.companyId));
    navigateToDashboard(navigateTo);
  };
  return (
    <DashboardComponent onDashboardPage>
      <section className="current-submission my-5 ">
        <h3 className="text-green-300 capitalize text-[20px] md:text-[22px] font-bold my-5">
          submitted a recycling request to{" "}
          {submissionData && submissionData.companyName}
        </h3>
        <section className="submission-container lg:w-1/2">
          {submissionData && (
            <SubmissionCard
              linkTo={`/dashboard/submissions/${submissionData.id}`}
              key={submissionData.id}
              status={submissionData.status}
              submissionCompany={
                submissionData.companyName.length > 10
                  ? submissionData.companyName.substring(0, 10)
                  : submissionData.companyName
              }
              submissionDate={formatDateFromTimestamp(
                submissionData.dateSubmitted
              )}
            />
          )}

          <section className="button-container flex items-center justify-end my-5">
            <button
              className="mt-3  px-3 py-2 rounded-[30px] w-42 capitalize text-[13px] border-2  border-red-500 text-center hover:bg-red-500  hover:text-white hover:border-transparent transition-colors ease-linear duration-100"
              onClick={handleButtonClick}
            >
              delete submission
            </button>
          </section>
        </section>

        <h4 className="capitalize font-bold text-[20px] md:p-3 my-5">
          submitted{" "}
          {!appContextLoading && recyclables.length > 0 && recyclables.length}{" "}
          recyclables
        </h4>
        <section className="submission-container lg:w-1/2">
          {!appContextLoading &&
            recyclables.length > 0 &&
            recyclables.map((recyclable: any, index: number) => (
              <Collection
                key={index}
                name={recyclable.name}
                category={recyclable.category}
                dateAdded={recyclable.dateAdded}
                id={recyclable.id}
              />
            ))}
        </section>
      </section>
    </DashboardComponent>
  );
};

export default ViewSubmissions;
