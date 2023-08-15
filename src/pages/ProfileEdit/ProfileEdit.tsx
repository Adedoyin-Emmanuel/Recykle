import React from "react";
import Input from "../../components/Input/Input";
import Dashboard from "../Dashboard/Dashboard";
import Memoji from "./../../assets/memoji.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import TextArea from "../../components/TextArea/TextArea";
import Button from "../../components/Button/Button";

const ProfileEdit: React.FC = (): JSX.Element => {
  return (
    <Dashboard onProfilePage>
      <form className="profile-section w-full lg:w-2/4 mx-auto flex flex-col items-start justify-start gap-3 my-8">
        <section className="profile-image flex items-center justify-center w-full">
          <img src={Memoji} alt="user-image-real" className="h-30 w-40" />
          <FontAwesomeIcon
            icon={faCamera}
            size={"lg"}
            className="bg-green-100 p-3 rounded-full  text-white transform-gpu -translate-x-16 translate-y-12 hover:bg-slate-100 hover:text-green-300 cursor-pointer transition-colors duration-150"
          />
        </section>

        <section className="user-details-section w-full p-4">
          <section className="form-group flex gap-x-3 items-center md:gap-x-8">
            <section className="input-section w-full">
              <label htmlFor="fullname" className="text-sm capitalize my-2">
                fullname
              </label>
              <Input
                placeholder="Enter your fullname"
                value={"Adedoyin Emmanuel"}
                required
              />
            </section>
          </section>

          <section className="form-group flex gap-x-3 items-center md:gap-x-8">
            <section className="input-section w-full">
              <label htmlFor="fullname" className="text-sm capitalize my-2">
                about
              </label>
              <TextArea
                placeholder="Enter your info"
                value={"Busy, text y'all later 🫵"}
                required
              />
            </section>
          </section>

          <section className="form-group flex gap-x-3 items-center md:gap-x-8">
            <section className="input-section w-full">
              <label htmlFor="fullname" className="text-sm capitalize my-2">
                Phone
              </label>
              <Input
                placeholder="Enter your phone number"
                type="number"
                value={"07061620301"}
                required
              />
            </section>
          </section>

          <section className="mb-5 mt-16 w-full flex items-center md:justify-start justify-center">
            <Button outline className="md:w-1/4 w-full ">
              update profile
            </Button>
          </section>
        </section>
      </form>
    </Dashboard>
  );
};

export default ProfileEdit;
