/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import AddItem from "../../components/AddItem/AddItem";
import AddItemContainer from "../../components/AddItemContainer/AddItemContainer";
import DashboardComponent from "../../components/DashboardComponent/DashboardComponent";
import RecycingCompanyCard from "../../components/RecycingCompanyCard/RecycingCompanyCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import { AppContextValuesProps, useAppContext } from "../../context/appContext";
import {
  UserAuthContextProps,
  useUserAuth,
} from "../../context/userAuthContext";

const Recycle: React.FC = (): JSX.Element => {
  const [showAddItemContainer, setShowAddItemContainer] =
    useState<boolean>(false);
  const {
    getAllRecyclingCompanies,
    appContextLoading,
    loading,
  }: AppContextValuesProps = useAppContext();

  const [recyclingCompanies, setRecyclingCompanies] = useState([]);

  const { user }: UserAuthContextProps = useUserAuth();

  // ogbon sodiq
  const additionalClass = "md:4/4 lg:w-3/4 grid sm:grid-cols-2 xl:grid-cols-3 my-5";

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
  }, [appContextLoading, loading]);

  const RecyclingCompanies = () => {
    return (
      <>
        {recyclingCompanies.map((company: any, index) => (
          <RecycingCompanyCard
            key={index}
            name={company.fullname}
            address={company.address}
            isVerified={company.verified}
            companyId={company.id}
            rating={company?.rating || Math.random() * 4 + 3}
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
        <section
          className={`recycling-companies w-11/12 mx-auto gap-10 ${
            recyclingCompanies.length > 0 && additionalClass
          }`}
        >
          {recyclingCompanies.length > 0 ? (
            recyclingCompanies.map((company: any, index) => (
              <RecycingCompanyCard
                key={index}
                name={company.fullname}
                address={company.address}
                isVerified={company.verified}
                companyId={company.id}
                rating={company?.rating || Math.random() * 4 + 3}
              />
            ))
          ) : (
            <div className="w-full flex items-center justify-center mt-10">
              <div className="loader h-7 w-7 border-1"></div>{" "}
            </div>
          )}
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
