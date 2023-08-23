import React from "react";
import CompanyDashboardComponent from "../../components/CompanyDashboardComponent/CompanyDashboardComponent";
import Input from "../../components/Input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import TextArea from "../../components/TextArea/TextArea";
import Button from "../../components/Button/Button";
import { useCompanyAppContext, CompanyAppContextValuesProps } from '../../context/companyAppContext';
import CompanyAvatar from "../../components/CompanyAvatar/CompanyAvatar";

const CompanyProfileEdit: React.FC = (): JSX.Element => {
  const {companyData}: CompanyAppContextValuesProps = useCompanyAppContext();
  
  return (
    <CompanyDashboardComponent onProfilePage>
      <form className="profile-section w-full lg:w-2/4 mx-auto flex flex-col items-start justify-start gap-3 my-8">
        <section className="profile-image flex items-center justify-center w-full">
          <CompanyAvatar size="100" />
          <label htmlFor="fileUpload">
            <FontAwesomeIcon
              icon={faCamera}
              size={"lg"}
              className="bg-green-100 p-2 rounded-full  text-white transform-gpu -translate-x-10 translate-y-10 hover:bg-slate-100 hover:text-green-300 cursor-pointer transition-colors duration-150"
            />
            <input
              type="file"
              name="user-profile-picture"
              id="fileUpload"
              hidden
              accept=".png, .jpg, .jpeg"
            />
          </label>
        </section>

        <section className="user-details-section w-full p-4">
          <section className="form-group mb-4 flex gap-x-3 items-center md:gap-x-8">
            <section className="input-section w-full">
              <label htmlFor="fullname" className="text-sm capitalize my-2">
                company name
              </label>
              <Input
                placeholder="Enter your company name"
                value={companyData.fullname}
                required
              />
            </section>
          </section>

          <section className="form-group mb-4 flex gap-x-3 items-center md:gap-x-8">
            <section className="input-section w-full">
              <label htmlFor="fullname" className="text-sm capitalize my-2">
                about
              </label>
              <TextArea
                placeholder="Enter your info"
                value={
                  "Bridging the gap between recycling companies and consumers"
                }
                required
              />
            </section>
          </section>

          <section className="form-group mb-4 flex gap-x-3 items-center md:gap-x-8">
            <section className="input-section w-full">
              <label htmlFor="fullname" className="text-sm capitalize my-2">
                Phone
              </label>
              <Input
                placeholder="Enter your company number"
                type="tel"
                value={companyData.number}
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
    </CompanyDashboardComponent>
  );
};

export default CompanyProfileEdit;
