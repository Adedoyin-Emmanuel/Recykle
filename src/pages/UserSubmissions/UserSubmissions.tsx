/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from "react";
import DashboardComponent from "../../components/DashboardComponent/DashboardComponent";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Collection from "../../components/Collection/Collection";
import { useParams } from "react-router-dom";

import { useAppContext, AppContextValuesProps } from "../../context/appContext";
import AddItemContainer from "../../components/AddItemContainer/AddItemContainer";
import Notification from "../../utils/toast";

const UserSubmissions: React.FC = (): JSX.Element => {
  const {
    getUserRecyclingCollection,
    user,
    userData,
    appContextLoading,
    loading,
    getRecyclingCompanyById,
    submitRecyclingData,
  }: AppContextValuesProps = useAppContext();
  const [recyclables, setRecyclables] = useState<any>({});
  const [showAddItemsContainer, setShowItemsContainer] =
    useState<boolean>(false);
  const toast = new Notification();

  const { companyId }: any = useParams();
  const [companyData, setCompanyData] = useState<any>(null);
  const inputRef: number | any = useRef(0);

  useEffect(() => {
    getUserRecyclingCollection(user.uid).then((result: any) => {
      setRecyclables(result);
    });
  }, []);

  useEffect(() => {
    async function fetchRecyclingCompanies() {
      try {
        const companies = await getRecyclingCompanyById(companyId);
        setCompanyData(companies);
      } catch (error) {
        console.error("Error fetching recycling companies:", error);
      }
    }

    fetchRecyclingCompanies();
  }, []);

  const handleModalClose = () => {
    setShowItemsContainer(false);
  };

  const handleAddItem = (e: React.FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();
    setShowItemsContainer(true);
  };

  const handleCollectionClick = (e: React.FormEvent<HTMLFormElement> | any) => {
    console.log(e);
    console.log("clicked");
  };

  const handleFinishSubmission = (
    e: React.FormEvent<HTMLFormElement> | any
  ) => {
    e.preventDefault();
    const totalQuantities = inputRef.current.value;

    if (!totalQuantities || totalQuantities === 0) {
      toast.error("Please enter a valid quantity");
    }

    if (recyclables.length === 0) {
      return toast.error("You don't have any collections");
    }
    if (companyData) {
      submitRecyclingData(
        companyId,
        companyData.fullname,
        userData.fullname,
        user.uid,
        totalQuantities,
        recyclables
      );
    }
  };
  return (
    <DashboardComponent onRecyklePage>
      <AddItemContainer
        blur={true}
        showAddItemContainer={showAddItemsContainer}
        onClose={handleModalClose}
      />
      <section className="header">
        <h3 className=" font-bold capitalize text-[20px] md:text-2xl">
          submit recycle request to{" "}
          <span className="text-green-300">
            {!appContextLoading && !loading && companyData?.fullname}
          </span>
        </h3>
      </section>
      <section className="all-collections"></section>

      <form className="submitform  p-3 lg:w-4/6 mx-auto mt-24">
        <section className="grid items-center lg:justify-center  md:grid-cols-2 lg:grid-cols-3">
          {!appContextLoading && recyclables.length > 0 ? (
            recyclables.map((recyclable: any, index: number) => (
              <Collection
                key={index}
                {...recyclable}
                onClick={(e: any) => handleCollectionClick(e)}
                className="mb-4"
              />
            ))
          ) : (
            <section className="mt-3 flex items-end flex-col justify-end w-11/12 gap-y-3">
              <p className="font-medium capitalize block text-center w-full">
                {" "}
                No collection found 😔
              </p>

              <button
                onClick={(e) => {
                  handleAddItem(e);
                }}
                className="mt-3  px-3 py-2 rounded-[30px] w-32 capitalize text-[13px] border-2  border-green-300 text-center hover:bg-green-200 hover:text-white hover:border-transparent transition-colors ease-linear duration-100"
              >
                add item
              </button>
            </section>
          )}
        </section>

        <Input
          placeholder="Enter item quantity"
          type="number"
          min={1}
          required
          inputRef={inputRef}
        />

        <section className="button my-5 w-full flex items-center justify-end">
          <Button
            className=""
            outline
            onClick={(e) => handleFinishSubmission(e)}
            disabled
          >
            finish submission
          </Button>
        </section>
      </form>
    </DashboardComponent>
  );
};

export default UserSubmissions;
