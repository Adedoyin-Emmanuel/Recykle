/* eslint-disable @typescript-eslint/no-explicit-any */
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Timestamp } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Collection from "../../components/Collection/Collection";
import CompanyClientSubmission from "../../components/CompanyClientSubmission/CompanyClientSubmission";
import CompanyDashboardComponent from "../../components/CompanyDashboardComponent/CompanyDashboardComponent";
import {
  CompanyAppContextValuesProps,
  useCompanyAppContext,
} from "../../context/companyAppContext";
import { navigateToCompanyDashboard } from "../../utils/navigate";
import { formatDateFromTimestamp } from "../../utils/utilis";

interface SubmissionDataProps {
  id: string;
  userId: string;
  status: "pending" | "success" | "failed";
  submittedBy: string;
  submittedAt: Timestamp;
  companyId: string;
}

const ViewClientSubmission: React.FC = (): JSX.Element => {
  const { submissionId }: string | any = useParams();
  const [submissionData, setSubmissionData] = useState<SubmissionDataProps>();
  const [recyclables, setRecyclables] = useState<any>({});
  const [viewActionContainer, setViewActionContainer] =
    useState<boolean>(false);

  const {
    deleteUserSubmission,
    acceptUserSubmission,
    cancelUserSubmission,
    getUserSubmissionById,
    companyLoading,
    company,
  }: CompanyAppContextValuesProps = useCompanyAppContext();
  const navigateTo = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getUserSubmissionById(submissionId, company.uid);

        setSubmissionData(result);
        setRecyclables(result.itemsSubmitted);
      } catch (error: unknown) {
        console.error("Error fetching user submissions:", error);
      }
    }

    fetchData();
  }, [company, submissionId]);

  const handleDeleteButtonClick = async () => {
    submissionData &&
      (await deleteUserSubmission(
        submissionData.id,
        company.uid,
        submissionData.userId
      ));

    navigateToCompanyDashboard(navigateTo);
  };

  const handleActionButtonClick = () => {
    setViewActionContainer(!viewActionContainer);
  };

  const handleAcceptButtonClick = async () => {
    submissionData &&
      (await acceptUserSubmission(
        submissionData.id,
        company.uid,
        submissionData.userId
      ));

    navigateToCompanyDashboard(navigateTo);
  };

  const handleCancelButtonClick = async () => {
    submissionData &&
      (await cancelUserSubmission(
        submissionData.id,
        company.uid,
        submissionData.userId
      ));

    navigateToCompanyDashboard(navigateTo);
  };

  return (
    <CompanyDashboardComponent onDashboardPage>
      <section className="current-submission my-5 ">
        <h3 className="text-green-300 capitalize text-[20px] md:text-[22px] font-bold my-5">
          {submissionData && submissionData.submittedBy} submitted a recycling
          request
        </h3>
        <section className="submission-container lg:w-1/2 p-1">
          <FontAwesomeIcon
            icon={faPen}
            className="block relative z-[100] left-full top-14 text-[16px]  hover:bg-slate-100 bg-green-100 text-white transform-gpu duration-100 ease-in-out -translate-x-7 translate-y-8 rounded-full p-2 hover:text-green-300 cursor-pointer"
            title="Actions"
            onClick={handleActionButtonClick}
          />

          {submissionData && (
            <CompanyClientSubmission
              linkTo={`/company/dashboard/submissions/${submissionData.id}`}
              key={submissionData.id}
              status={submissionData.status}
              submittedBy={
                submissionData.submittedBy.length > 10
                  ? submissionData.submittedBy.substring(0, 10)
                  : submissionData.submittedBy
              }
              submissionDate={formatDateFromTimestamp(
                submissionData.submittedAt
              )}
            />
          )}

          <AnimatePresence>
            {viewActionContainer && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="relative left-2/3 md:left-3/4 button-container flex items-center justify-between my-5 flex-col bg-slate-50  rounded-lg w-1/3 p-2"
              >
                <button
                  className="mt-3 px-3 py-2 rounded-[30px] w-10/12 flex items-center justify-center gap-x-3  capitalize text-[13px] border-2  border-red-500 text-center hover:bg-red-500  hover:text-white hover:border-transparent transition-colors ease-linear duration-100"
                  onClick={handleDeleteButtonClick}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentcolor"
                  >
                    <path d="M20.9997 6.72998C20.9797 6.72998 20.9497 6.72998 20.9197 6.72998C15.6297 6.19998 10.3497 5.99998 5.11967 6.52998L3.07967 6.72998C2.65967 6.76998 2.28967 6.46998 2.24967 6.04998C2.20967 5.62998 2.50967 5.26998 2.91967 5.22998L4.95967 5.02998C10.2797 4.48998 15.6697 4.69998 21.0697 5.22998C21.4797 5.26998 21.7797 5.63998 21.7397 6.04998C21.7097 6.43998 21.3797 6.72998 20.9997 6.72998Z" />
                    <path d="M8.50074 5.72C8.46074 5.72 8.42074 5.72 8.37074 5.71C7.97074 5.64 7.69074 5.25 7.76074 4.85L7.98074 3.54C8.14074 2.58 8.36074 1.25 10.6907 1.25H13.3107C15.6507 1.25 15.8707 2.63 16.0207 3.55L16.2407 4.85C16.3107 5.26 16.0307 5.65 15.6307 5.71C15.2207 5.78 14.8307 5.5 14.7707 5.1L14.5507 3.8C14.4107 2.93 14.3807 2.76 13.3207 2.76H10.7007C9.64074 2.76 9.62074 2.9 9.47074 3.79L9.24074 5.09C9.18074 5.46 8.86074 5.72 8.50074 5.72Z" />
                    <path d="M15.2104 22.7501H8.79039C5.30039 22.7501 5.16039 20.8201 5.05039 19.2601L4.40039 9.19007C4.37039 8.78007 4.69039 8.42008 5.10039 8.39008C5.52039 8.37008 5.87039 8.68008 5.90039 9.09008L6.55039 19.1601C6.66039 20.6801 6.70039 21.2501 8.79039 21.2501H15.2104C17.3104 21.2501 17.3504 20.6801 17.4504 19.1601L18.1004 9.09008C18.1304 8.68008 18.4904 8.37008 18.9004 8.39008C19.3104 8.42008 19.6304 8.77007 19.6004 9.19007L18.9504 19.2601C18.8404 20.8201 18.7004 22.7501 15.2104 22.7501Z" />
                    <path d="M13.6601 17.25H10.3301C9.92008 17.25 9.58008 16.91 9.58008 16.5C9.58008 16.09 9.92008 15.75 10.3301 15.75H13.6601C14.0701 15.75 14.4101 16.09 14.4101 16.5C14.4101 16.91 14.0701 17.25 13.6601 17.25Z" />
                    <path d="M14.5 13.25H9.5C9.09 13.25 8.75 12.91 8.75 12.5C8.75 12.09 9.09 11.75 9.5 11.75H14.5C14.91 11.75 15.25 12.09 15.25 12.5C15.25 12.91 14.91 13.25 14.5 13.25Z" />
                  </svg>
                  <p>delete</p>
                </button>
                <button
                  className="mt-3 px-3 py-2 rounded-[30px] w-10/12 flex items-center justify-center gap-x-3  capitalize text-[13px] border-2  border-green-300 text-center hover:bg-green-300  hover:text-white hover:border-transparent transition-colors ease-linear duration-100"
                  onClick={handleAcceptButtonClick}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentcolor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z" />
                    <path d="M10.5795 15.5801C10.3795 15.5801 10.1895 15.5001 10.0495 15.3601L7.21945 12.5301C6.92945 12.2401 6.92945 11.7601 7.21945 11.4701C7.50945 11.1801 7.98945 11.1801 8.27945 11.4701L10.5795 13.7701L15.7195 8.6301C16.0095 8.3401 16.4895 8.3401 16.7795 8.6301C17.0695 8.9201 17.0695 9.4001 16.7795 9.6901L11.1095 15.3601C10.9695 15.5001 10.7795 15.5801 10.5795 15.5801Z" />
                  </svg>
                  <p>approve</p>
                </button>
                <button
                  className="mt-3 px-3 py-2 rounded-[30px] w-10/12 flex items-center justify-center gap-x-3 capitalize text-[13px] border-2  border-yellow-300 text-center hover:bg-yellow-300  hover:text-white hover:border-transparent transition-colors ease-linear duration-100"
                  onClick={handleCancelButtonClick}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentcolor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.0002 21H10.2802C8.66023 21 7.11023 20.31 6.03023 19.12L2.50023 15.24C0.820234 13.4 0.820234 10.62 2.50023 8.77L6.03023 4.89C7.11023 3.69 8.66023 3 10.2802 3H17.0002C20.1702 3 22.7502 5.58 22.7502 8.75V15.25C22.7502 18.42 20.1702 21 17.0002 21ZM10.2802 4.5C9.09023 4.5 7.94023 5.01 7.14023 5.89L3.60023 9.78C2.45023 11.05 2.45023 12.96 3.60023 14.23L7.13023 18.11C7.93023 18.99 9.08024 19.5 10.2702 19.5H17.0002C19.3402 19.5 21.2502 17.59 21.2502 15.25V8.75C21.2502 6.41 19.3402 4.5 17.0002 4.5H10.2802Z" />
                    <path d="M16 15.22C15.81 15.22 15.62 15.15 15.47 15L10.53 10.05C10.24 9.75996 10.24 9.27996 10.53 8.98996C10.82 8.69996 11.3 8.69996 11.59 8.98996L16.53 13.94C16.82 14.23 16.82 14.71 16.53 15C16.38 15.15 16.19 15.22 16 15.22Z" />
                    <path d="M11.06 15.22C10.87 15.22 10.68 15.15 10.53 15C10.24 14.71 10.24 14.23 10.53 13.94L15.47 8.99997C15.76 8.70997 16.24 8.70997 16.53 8.99997C16.82 9.28997 16.82 9.76997 16.53 10.06L11.59 15C11.44 15.15 11.25 15.22 11.06 15.22Z" />
                  </svg>
                  <p>cancel</p>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <h4 className="capitalize font-bold text-[20px] md:p-3 my-5">
          submitted{" "}
          {!companyLoading && recyclables.length > 0 && recyclables.length}{" "}
          recyclables
        </h4>
        <section className="submission-container lg:w-1/2">
          {!companyLoading &&
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
    </CompanyDashboardComponent>
  );
};

export default ViewClientSubmission;
