import React from "react";
import Dashboard from "../Dashboard/Dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Container from "../../components/Container/Container";
import SearchBar from "../../components/SearchBar/SearchBar";

const Recycle: React.FC = (): JSX.Element => {
  return (
    <Dashboard onRecyklePage className="flex flex-col items-center">
        <SearchBar  className="my-5"/>
      <Container>
        <section>
          <FontAwesomeIcon
            icon={faLocationDot}
            size={"3x"}
            className="my-5 text-green-500"
          />
        </section>
      </Container>
    </Dashboard>
  );
};

export default Recycle;
