import React from "react";
import DashboardComponent from "../../components/DashboardComponent/DashboardComponent";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import UtilityBox from "../../components/UtilityBox/UtilityBox";
import Dollar from "./../../assets/dollar-circle.svg";
import Submitted from "./../../assets/clipboard-tick-2.svg";
import TrashBin from "../../assets/recycle-icon.svg";
import RecycleCard from "../../components/RecycleCard/RecycleCard";
import SubmissionCard from "../../components/SubmissionCard/SubmissionCard";

const Dashboard = (): JSX.Element => {
  return (
    <DashboardComponent onDashboardPage>
      <DashboardHeader />

      <div className="w-full flex flex-col lg:flex-row gap-x-5">
        <div className="first-section w-full lg:w-8/12">
          <div className="grid p-3 lg:grid-cols-3 gap-10">
            <UtilityBox>
              <img src={Dollar} alt="dollar-bill" className="h-10 w-10" />
              <p className="total-balance capitalize text-sm">reykle points</p>

              <p className="font-bold">1,500</p>
            </UtilityBox>

            <UtilityBox>
              <img src={TrashBin} alt="dollar-bill" className="h-10 w-10" />

              <p className="total-balance capitalize text-sm">items recycled</p>

              <p className="font-bold">500</p>
            </UtilityBox>

            <UtilityBox>
              <img src={Submitted} alt="dollar-bill" className="h-10 w-10" />

              <p className="total-balance capitalize text-sm">
                items submitted
              </p>

              <p className="font-bold">50</p>
            </UtilityBox>
          </div>

          <section className="recycle-history my-5 ">
            <h4 className="capitalize font-bold text-[20px]">
              recycle history
            </h4>
          </section>

          <section className="recycling-transactions mt-5 ">
            <RecycleCard
              recycleDate="September 14th 2023, at 11:30pm"
              recyclingPointsEarned={10}
            />

            <RecycleCard
              recycleDate="November 30th 2023, at 4:30pm"
              recyclingPointsEarned={14}
            />

            <RecycleCard
              recycleDate="September 20th 2023, at 4:30pm"
              recyclingPointsEarned={50}
            />
          </section>
        </div>

        <div className="second-section w-full lg:w-4/12 h-screen mt-16">
          <h4 className="capitalize font-bold text-[20px] md:mx-5 md:p-3">
            recent submission
          </h4>
          <section className="submission-cards  md:w-11/12 flex flex-col items-center justify-center mx-auto">
            <SubmissionCard
              status="pending"
              submissionCompany="recykle"
              submissionDate="September 14th 2023"
            />

            <SubmissionCard
              status="success"
              submissionCompany="scrapay"
              submissionDate="December 20th 2023"
            />

            <SubmissionCard
              status="failed"
              submissionCompany="bulaba"
              submissionDate="August 26th 2023"
            />
          </section>
        </div>
      </div>
    </DashboardComponent>
  );
};

export default Dashboard;
