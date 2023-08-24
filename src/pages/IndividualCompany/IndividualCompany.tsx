/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardComponent from "../../components/DashboardComponent/DashboardComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useAppContext, AppContextValuesProps } from "../../context/appContext";
import IndividualCompanyCard from "../../components/IndividualCompanyCard/IndividualCompanyCard";
import { formatDateFromTimestamp } from "../../utils/utilis";

// interface IndividualCompanyProps extends React.HTMLAttributes<HTMLDivElement> {
//   className?: string;
// }

const IndividualCompany: React.FC = (): JSX.Element => {
  const navigateTo = useNavigate();
  const { companyId }: any = useParams();

  const navigatePrevious = () => {
    navigateTo(-1);
  };

  const { getRecyclingCompanyById }: AppContextValuesProps = useAppContext();
  const [companiesData, setCompaniesData] = useState<any>([]);

  useEffect(() => {
    async function fetchRecyclingCompanies() {
      try {
        const companies = await getRecyclingCompanyById(companyId);
        setCompaniesData(companies);
      } catch (error) {
        console.error("Error fetching recycling companies:", error);
      }
    }

    fetchRecyclingCompanies();
  }, []);

  console.log(companiesData);
  return (
    <DashboardComponent onRecyklePage>
      <FontAwesomeIcon
        icon={faArrowLeftLong}
        size={"lg"}
        onClick={navigatePrevious}
        className="text-2xl p-3 hover:bg-slate-50 hover:text-green-200 rounded-full cursor-pointer "
      />

      <section className="recycling-company">
        <IndividualCompanyCard
          companyName={companiesData.fullname}
          companyAddress={companiesData.address}
          companyEmail={companiesData.email}
          companyRating={4}
          companyUsername={companiesData.username}
          companyImage={companiesData.logo}
          isVerified={companiesData.verified}
          itemsRecycled={companiesData.itemsRecycled}
          dateJoined={formatDateFromTimestamp(companiesData.dateCreated)}
        />
      </section>
    </DashboardComponent>
  );
};

export default IndividualCompany;
