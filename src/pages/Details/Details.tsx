/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { navigateToDashboard, navigateToAuth } from "../../utils/navigate";
import {
  useUserAuth,
  UserAuthContextProps,
} from "../../context/userAuthContext";

import { UserAuthProvider } from "../../context/userAuthContext";

const Details: React.FC = (): JSX.Element => {
  const navigateTo = useNavigate();
  const { updateUserLocation, user }: UserAuthContextProps | any =
    useUserAuth();

  const [getLocationButtonClicked, setLocationButtonClicked] =
    useState<boolean>(false);

  useEffect(() => {
    getLocationButtonClicked &&
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        if (await updateUserLocation(user, latitude, longitude)) {
          navigateToDashboard(navigateTo);
        } else {
          navigateToAuth(navigateTo);
        }
      });
  }, [getLocationButtonClicked]);
  const handleLocationButtonClick = () => {
    setLocationButtonClicked(true);
  };
  return (
    <UserAuthProvider>
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
    </UserAuthProvider>
  );
};

export default Details;
