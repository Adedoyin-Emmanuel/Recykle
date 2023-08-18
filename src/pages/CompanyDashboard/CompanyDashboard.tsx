import React from "react";
import CompanyDashboardComponent from "../../components/CompanyDashboardComponent/CompanyDashboardComponent";
import CompanyDashboardHeader from "../../components/CompanyDashboardHeader/CompanyDashboardHeader";
import UtilityBox from "../../components/UtilityBox/UtilityBox";
import TrashBin from "../../assets/recycle-icon.svg";
import Submitted from "./../../assets/clipboard-tick-2.svg";
import Feedback from "./../../assets/messages.svg";
import CompanyChart from "../../components/CompanyChart/CompanyChart";
import RecycleCard from "../../components/RecycleCard/RecycleCard";
import Collection from "../../components/Collection/Collection";
import CompanyClientSubmission from "../../components/CompanyClientSubmission/CompanyClientSubmission";

const CompanyDashboard: React.FC = (): JSX.Element => {
  const recyclables = [
    {
      name: "Cardboard Boxes",
      category: "Paper and Cardboard",
      dateAdded: "2023-06-10",
    },
    { name: "Plastic Bottles", category: "Plastics", dateAdded: "2023-06-08" },
    { name: "Glass Jars", category: "Glass", dateAdded: "2023-06-09" },
    { name: "Trees", category: "Organic Waste", dateAdded: "2023-06-09" },
    {
      name: "car batteries",
      category: "Hazardous Waste",
      dateAdded: "2023-06-11",
    },
  ];

  return (
    <CompanyDashboardComponent onDashboardPage>
      <CompanyDashboardHeader />

      <div className="w-full flex flex-col xl:flex-row gap-x-5 ">
        <div className="first-section w-full xl:w-8/12 flex flex-col items-center justify-center">
          <div className="grid p-3 lg:grid-cols-3 gap-10 w-full">
            <UtilityBox>
              <img src={TrashBin} alt="dollar-bill" className="h-10 w-10" />

              <p className="total-balance capitalize text-sm">items recycled</p>

              <p className="font-bold">2.5k</p>
            </UtilityBox>

            <UtilityBox>
              <img src={Submitted} alt="dollar-bill" className="h-10 w-10" />

              <p className="total-balance capitalize text-sm">items received</p>

              <p className="font-bold">50</p>
            </UtilityBox>

            <UtilityBox>
              <img src={Feedback} alt="dollar-bill" className="h-10 w-10" />

              <p className="total-balance capitalize text-sm">users feedback</p>

              <p className="font-bold">5.3k</p>
            </UtilityBox>
          </div>

          <section className="growth-statistic mt-16 mb-2 w-full ">
            <h4 className="capitalize font-bold text-[20px]">
              growth statistic
            </h4>

            <CompanyChart />
          </section>

          <section className="recycle-history mt-20 w-full">
            <h4 className="capitalize font-bold text-[20px]">
              recycle history
            </h4>
          </section>

          <section className="recycling-transactions mt-5 w-full">
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

        <div className="second-section w-full xl:w-4/12 mt-16 md:mt-0 grid grid-cols-1 items-center justify-center">
          <section className="submission-cards  md:w-11/12 flex flex-col items-center justify-center xl:mx-auto mb-16">
            <section className="header w-full flex">
              <h4 className="capitalize font-bold text-[20px] md:p-3">
                recent submission
              </h4>
            </section>
            <CompanyClientSubmission
              submittedBy="emmysoft"
              submissionDate="14/09/2023"
            />

            <CompanyClientSubmission
              submittedBy="henqsoft"
              submissionDate="20/09/2023"
            />

            <CompanyClientSubmission
              submittedBy="benrobo"
              submissionDate="26/08/2023"
            />
          </section>

          <section className="submission-cards  md:w-11/12 flex flex-col items-center justify-center xl:mx-auto mb-16">
            <section className="header w-full flex">
              <h4 className="capitalize font-bold text-[20px] md:p-3">
                your recyclables
              </h4>
            </section>
            {recyclables.map((recyclable, index) => (
              <Collection key={index} {...recyclable} />
            ))}
          </section>
        </div>
      </div>
    </CompanyDashboardComponent>
  );
};

export default CompanyDashboard;
