import React from "react";
import Dashboard from "../Dashboard/Dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Container from "../../components/Container/Container";
import SearchBar from "../../components/SearchBar/SearchBar";
import RecycingCompanyCard from "../../components/RecycingCompanyCard/RecycingCompanyCard";

const Recycle: React.FC = (): JSX.Element => {
  const recylingData = [
    {
      name: "Recykle Ltd",
      address: "123, Ikorodu Road, Lagos",
      isVerified: true,
      rating: 5,
    },

    {
      name: "Sapahire Ltd",
      address: "456, Gbagada tech zone, Lagos",
      isVerified: false,
      rating: 4,
    },

    {
      name: "Blablu Ltd",
      address: "789, blublu Road, Lagos",
      isVerified: true,
      rating: 3,
    },

    {
      name: "Gemstone Ltd",
      address: "419, Sango Ota, Ogun",
      isVerified: false,
      rating: 3,
    },

    {
      name: "Henqsoft Org",
      address: "321,Mother's joy  Ota, Ogun",
      isVerified: true,
      rating: 4,
    },

    {
      name: "Emmysoft Org",
      address: "123, Alagbado, Lagos",
      isVerified: true,
      rating: 4,
    },
  ];

  const RecyingCompanies = () => {
    return recylingData.map((data, index) => {
      const { name, address, isVerified, rating } = data;

      return (
        <RecycingCompanyCard
          key={index}
          name={name}
          address={address}
          isVerified={isVerified}
          rating={rating}
        />
      );
    });
  };
  return (
    <Dashboard onRecyklePage className="flex flex-col items-center">
      <SearchBar className="my-5" />

      <section className="companies-area w-full flex-col flex items-center my-5   ">
        <p className="text-slate-500 capitalize text-sm">
          search result for 10 recycling companies
        </p>
        <section className="recycling-companies w-11/12 md:4/4 lg:w-3/4 grid sm:grid-cols-2 xl:grid-cols-3 gap-10">
          <RecyingCompanies />
        </section>
      </section>

      <Container>
        <section>
          <FontAwesomeIcon
            icon={faLocationDot}
            size={"3x"}
            className="my-5 text-green-200"
          />
        </section>
      </Container>
    </Dashboard>
  );
};

export default Recycle;
