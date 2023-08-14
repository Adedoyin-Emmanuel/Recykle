import React from "react";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { navigateToRecycling } from "../../utils/navigate";

//interface DetailsProps {}

const Details: React.FC = (): JSX.Element => {
  const navigateTo = useNavigate();

  const handleLocationButtonClick = () => {
    navigateToRecycling(navigateTo);

    //console.log("Hello world");
  };
  return (
    <Container>
      <section className=" w-full h-3/4 rounded-md flex flex-col items-center gap-20 justify-center">
        <section className="lg:w-1/4  flex items-start justify-start">
          <h3 className="capitalize text-3xl my-5">
            Get location
            <p className="text-slate-500 text-sm my-3">
              to continue, we need to access your location
            </p>
          </h3>
        </section>
        <FontAwesomeIcon
          icon={faLocationDot}
          size={"3x"}
          className="my-5 text-green-500"
        />
        <Button
          outline={true}
          className="w-3/4 lg:w-1/4"
          onClick={handleLocationButtonClick}
        >
          Get location
        </Button>
      </section>
    </Container>
  );
};

export default Details;