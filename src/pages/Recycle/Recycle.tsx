/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import DashboardComponent from "../../components/DashboardComponent/DashboardComponent";
import SearchBar from "../../components/SearchBar/SearchBar";
import RecycingCompanyCard from "../../components/RecycingCompanyCard/RecycingCompanyCard";
import AddItem from "../../components/AddItem/AddItem";
import AddItemContainer from "../../components/AddItemContainer/AddItemContainer";
import { useAppContext, AppContextValuesProps } from "../../context/appContext";

const Recycle: React.FC = (): JSX.Element => {
  const [showAddItemContainer, setShowAddItemContainer] =
    useState<boolean>(false);
  const {
    //   searchRecyclingCompanies,
    getAllRecyclingCompanies,
  }: AppContextValuesProps = useAppContext();

  // const handleSearchRecyclingCompanies = async (
  //   e: any | React.FormEvent<HTMLFormElement>
  // ) => {
  //  // const userPrompt = e.target.value;
  //   //const result = searchRecyclingCompanies(userPrompt);
  // };

  const RecyclingCompanies = () => {
    const [recyclingCompanies, setRecyclingCompanies] = useState([]);

    useEffect(() => {
      async function fetchCompanies() {
        try {
          const companies = await getAllRecyclingCompanies();
          setRecyclingCompanies(companies);
        } catch (error) {
          console.error("Error fetching recycling companies:", error);
        }
      }

      fetchCompanies();
    }, []);

    return (
      <>
        {recyclingCompanies.map((company: any, index) => (
          <RecycingCompanyCard
            key={index}
            name={company.fullname}
            address={company.address}
            isVerified={!company.verified}
            companyId={company.id}
            rating={company?.rating || Math.random() * 4 + 1}
          />
        ))}
      </>
    );
  };

  const handleModalClose = () => {
    setShowAddItemContainer(false);
  };

  const handleScanItemPick = () => {
    setShowAddItemContainer(true);
  };

  return (
    <DashboardComponent onRecyklePage className="flex flex-col items-center">
      <SearchBar
        className="my-5"
        // onChange={(e) => {
        //   handleSearchRecyclingCompanies(e);
        // }}
        // disabled
      />

      <section className="companies-area w-full flex-col flex items-center my-5   ">
        <p className="text-slate-500 capitalize text-sm">
          All recycling companies
        </p>
        <section className="recycling-companies w-11/12 md:4/4 lg:w-3/4 grid sm:grid-cols-2 xl:grid-cols-3 gap-10">
          <RecyclingCompanies />
        </section>
      </section>
      <AddItem onClick={handleScanItemPick} />
      <AddItemContainer
        blur={true}
        showAddItemContainer={showAddItemContainer}
        onClose={handleModalClose}
      />
    </DashboardComponent>
  );
};

export default Recycle;
