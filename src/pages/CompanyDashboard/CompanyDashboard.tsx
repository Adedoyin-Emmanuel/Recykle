/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import CompanyDashboardComponent from "../../components/CompanyDashboardComponent/CompanyDashboardComponent";
import CompanyDashboardHeader from "../../components/CompanyDashboardHeader/CompanyDashboardHeader";
import UtilityBox from "../../components/UtilityBox/UtilityBox";
import TrashBin from "../../assets/recycle-icon.svg";
import Submitted from "./../../assets/clipboard-tick-2.svg";
import Feedback from "./../../assets/messages.svg";
import CompanyChart from "../../components/CompanyChart/CompanyChart";
import RecycleCard from "../../components/RecycleCard/RecycleCard";
import Collection from "../../components/Collection/Collection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { navigateToRecycling } from "../../utils/navigate";
import { useNavigate } from "react-router-dom";
import {
  useCompanyAppContext,
  CompanyAppContextValuesProps,
} from "../../context/companyAppContext";
import CompanySubmissions from "../../components/CompanySubmissions/CompanySubmissions";
const CompanyDashboard: React.FC = (): JSX.Element => {
  const { companyData }: CompanyAppContextValuesProps = useCompanyAppContext();

  const recyclables = [
    {
      id: "1",
      name: "Cardboard Boxes",
      category: "Paper and Cardboard",
      dateAdded: "2023-06-10",
    },

    {
      id: "2",
      name: "Plastic Bottles",
      category: "Plastics",
      dateAdded: "2023-06-08",
    },
    { id: "3", name: "Glass Jars", category: "Glass", dateAdded: "2023-06-09" },
    {
      id: "4",
      name: "Trees",
      category: "Organic Waste",
      dateAdded: "2023-06-09",
    },
    {
      id: "5",
      name: "car batteries",
      category: "Hazardous Waste",
      dateAdded: "2023-06-11",
    },
  ];

  const [eyeIcon, setEyeIcon] = useState(faEye);
  const [toggler, setToggler] = useState(true);
  const totalItemsRecycled = companyData.itemsRecycled;
  const itemsReceived = companyData.itemsReceived;
  const usersFeedback = companyData.usersFeedback;
  const [itemsRecycled, setItemsRecycled] = useState(totalItemsRecycled);

  const handleIconClick = () => {
    setToggler(!toggler);
  };

  useEffect(() => {
    setEyeIcon(toggler ? faEye : faEyeSlash);
    setItemsRecycled(toggler ? totalItemsRecycled : "****");
  });

  const navigateTo = useNavigate();

  const handleSubmission = () => {
    navigateToRecycling(navigateTo);
  };

  return (
    <CompanyDashboardComponent onDashboardPage>
      <CompanyDashboardHeader />

      <div className="w-full flex flex-col xl:flex-row gap-x-5">
        <div className="first-section w-full xl:w-8/12 flex flex-col items-center justify-center">
          <div className="grid p-1 lg:grid-cols-3 gap-10 w-full">
            <section className="mobile-data bg-green-10 rounded-lg  md:hidden p-4 flex flex-col gap-y-2">
              <section className="little-header flex items-center gap-x-1">
                <p className="total-recycling-points capitalize text-[12px]">
                  items recycled
                </p>
                <FontAwesomeIcon
                  icon={eyeIcon}
                  size={"sm"}
                  onClick={handleIconClick}
                />
              </section>
              <h3 className="text-[18px] font-bold">{itemsRecycled}</h3>

              <section className="button-container w-full flex items-center justify-end">
                <button
                  className="bg-green-200 capitalize px-3 py-1 text-white rounded-[30px] text-[12px]"
                  onClick={handleSubmission}
                >
                  submissions
                </button>
              </section>
            </section>

            <section className="mobile-data-2 bg-slate-50 rounded-lg md:hidden p-4 flex flex-col justify-center gap-y-3">
              <section className="little-header flex items-center gap-x-1">
                <p className="total-recycling-points capitalize font-bold text-sm">
                  Quick actions
                </p>
              </section>

              <section className="action-buttons flex w-full justify-around">
                <div className="action-1 flex items-center flex-col w-full gap-y-2">
                  <section className="image bg-green-10 rounded-full p-2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 12.75H6C5.59 12.75 5.25 12.41 5.25 12C5.25 11.59 5.59 11.25 6 11.25H18C18.41 11.25 18.75 11.59 18.75 12C18.75 12.41 18.41 12.75 18 12.75Z"
                        fill="#292D32"
                      />
                      <path
                        d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V6C11.25 5.59 11.59 5.25 12 5.25C12.41 5.25 12.75 5.59 12.75 6V18C12.75 18.41 12.41 18.75 12 18.75Z"
                        fill="#292D32"
                      />
                    </svg>
                  </section>
                  <p className="text-[11px] capitalize">add recyclables</p>
                </div>

                <div className="action-1 flex items-center flex-col w-full gap-y-2">
                  <section className="image bg-green-10 rounded-full p-2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.9999 16.3299C9.60992 16.3299 7.66992 14.3899 7.66992 11.9999C7.66992 9.60992 9.60992 7.66992 11.9999 7.66992C14.3899 7.66992 16.3299 9.60992 16.3299 11.9999C16.3299 14.3899 14.3899 16.3299 11.9999 16.3299ZM11.9999 9.16992C10.4399 9.16992 9.16992 10.4399 9.16992 11.9999C9.16992 13.5599 10.4399 14.8299 11.9999 14.8299C13.5599 14.8299 14.8299 13.5599 14.8299 11.9999C14.8299 10.4399 13.5599 9.16992 11.9999 9.16992Z"
                        fill="#292D32"
                      />
                      <path
                        d="M12.0001 21.02C8.24008 21.02 4.69008 18.82 2.25008 15C1.19008 13.35 1.19008 10.66 2.25008 8.99998C4.70008 5.17998 8.25008 2.97998 12.0001 2.97998C15.7501 2.97998 19.3001 5.17998 21.7401 8.99998C22.8001 10.65 22.8001 13.34 21.7401 15C19.3001 18.82 15.7501 21.02 12.0001 21.02ZM12.0001 4.47998C8.77008 4.47998 5.68008 6.41998 3.52008 9.80998C2.77008 10.98 2.77008 13.02 3.52008 14.19C5.68008 17.58 8.77008 19.52 12.0001 19.52C15.2301 19.52 18.3201 17.58 20.4801 14.19C21.2301 13.02 21.2301 10.98 20.4801 9.80998C18.3201 6.41998 15.2301 4.47998 12.0001 4.47998Z"
                        fill="#292D32"
                      />
                    </svg>
                  </section>

                  <p className="text-[11px] capitalize">view recyclables</p>
                </div>

                <div className="action-1 flex items-center flex-col w-full gap-y-2">
                  <section
                    className="image bg-green-10 rounded-full p-2"
                    onClick={handleSubmission}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 2C15.97 2 20 6.03 20 11C20 15.97 15.97 20 11 20C6.03 20 2 15.97 2 11C2 7.5 4 4.46 6.93 2.97"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M19.071 20.97C19.601 22.57 20.811 22.73 21.741 21.33C22.601 20.05 22.041 19 20.501 19C19.351 19 18.711 19.89 19.071 20.97Z"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </section>
                  <p className="text-[11px] capitalize">explore</p>
                </div>
              </section>
            </section>

            <UtilityBox>
              <img src={TrashBin} alt="dollar-bill" className="h-10 w-10" />

              <p className="total-balance capitalize text-sm">items recycled</p>

              <p className="font-bold">{itemsRecycled}</p>
            </UtilityBox>

            <UtilityBox>
              <img src={Submitted} alt="dollar-bill" className="h-10 w-10" />

              <p className="total-balance capitalize text-sm">items received</p>

              <p className="font-bold">{itemsReceived}</p>
            </UtilityBox>

            <UtilityBox>
              <img src={Feedback} alt="dollar-bill" className="h-10 w-10" />

              <p className="total-balance capitalize text-sm">users feedback</p>

              <p className="font-bold">{usersFeedback}</p>
            </UtilityBox>
          </div>

          <section className="mobile-data-2 bg-slate-50 rounded-lg md:hidden p-4 flex items-center justify-between flex-row gap-x-5 my-5 w-full">
            <section className="my-2 bg-green-10 p-3 rounded-md flex items-center justify-between flex-row md:hidden gap-y-1 w-full">
              <img src={TrashBin} alt="dollar-bill" className="h-6 w-6 mx-2" />

              <p className="total-balance capitalize text-[11px]">
                items received
              </p>

              <p className="font-bold text-sm">{itemsReceived}</p>
            </section>

            <section className="my-2 bg-green-10 p-3 rounded-md flex items-center justify-between flex-row md:hidden gap-y-1 w-full">
              <img src={Submitted} alt="dollar-bill" className="h-6 w-6 mx-2" />

              <p className="total-balance capitalize text-[11px]">
                users feedback
              </p>

              <p className="font-bold text-sm">{usersFeedback}</p>
            </section>
          </section>

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

        <div className="second-section w-full xl:w-4/12 mt-16 md:mt-0 grid grid-cols-1  items-center justify-center">
          <section className="submission-cards md:w-11/12 flex flex-col items-center justify-center xl:mx-auto mb-16">
            <section className="header w-full flex">
              <h4 className="capitalize font-bold text-[20px] md:p-3">
                recent submission
              </h4>
            </section>
            <CompanySubmissions />
          </section>

          <section className="submission-cards  md:w-11/12 flex flex-col items-center justify-center xl:mx-auto mb-16">
            <section className="header w-full flex">
              <h4 className="capitalize font-bold text-[20px] md:p-3">
                your recyclables
              </h4>
            </section>
            {recyclables.map((recyclable, index) => (
              <Collection
                key={index}
                name={recyclable.name}
                category={recyclable.category}
                dateAdded={recyclable.dateAdded}
                id={recyclable.id}
              />
            ))}
          </section>
        </div>
      </div>
    </CompanyDashboardComponent>
  );
};

export default CompanyDashboard;
