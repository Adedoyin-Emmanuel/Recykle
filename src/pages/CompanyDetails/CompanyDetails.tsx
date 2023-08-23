/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import { navigateToCompanyDashboard } from "../../utils/navigate";
import {
  useCompanyAuth,
  CompanyAuthContextProps,
} from "../../context/companyAuthContext";
import Notification from "../../utils/toast";

interface HeaderProps {
  headerText?: string;
  subHeaderText?: string;
}
const Header = ({ headerText, subHeaderText }: HeaderProps): JSX.Element => {
  return (
    <section className="form-header">
      <h3 className="font-bold text-3xl text-green-300 capitalize">
        {headerText || "recykle"}
      </h3>
      <p className="text-slate-600 text-sm py-3">
        {subHeaderText ||
          "Bridging the gap between recycling companies and post consumers"}
      </p>
    </section>
  );
};

const Details = (): JSX.Element => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { company, updateCompanyDetails }: CompanyAuthContextProps =
    useCompanyAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const navigateTo = useNavigate();
  const toast = new Notification();

  const handleSubmit = async (e: any | React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      const companyAddress = e.target[0].value;
      const companyNumber = e.target[1].value;
      const companyLogo = selectedFile;
      const companyLatitude = latitude;
      const companyLongitude = longitude;

      if (!companyAddress || !companyNumber || !companyLogo) {
        toast.error("Please fill the required fields");
        return;
      }

      const result = await updateCompanyDetails(
        company,
        companyLatitude,
        companyLongitude,
        companyAddress,
        companyLogo,
        companyNumber
      );
      console.log(company);
      if (result) {
        navigateToCompanyDashboard(navigateTo);
      } else {
        navigateTo("/company/auth?login=true");
      }
    });
  };

  return (
    <form
      className="login-section my-10 lg:w-1/4 w-11/12"
      onSubmit={(e) => handleSubmit(e)}
    >
      <Header
        headerText="Company details"
        subHeaderText="To continue, we need you to provide your company information"
      />
      <div className="username my-5">
        <label htmlFor="username" className="capitalize">
          company Address
        </label>
        <Input placeholder="Enter company address" type="text" required />
      </div>

      <div className="username my-5">
        <label htmlFor="number" className="capitalize">
          Comapany number
        </label>
        <Input placeholder="Enter company phone number" type="tel" required />
      </div>

      <label className="capitalize ">Upload Company Logo</label>

      <div className="p-4 border rounded-lg bg-[#F5F5F5] my-2">
        <label className="flex items-center justify-center bg-gray-100 p-6 rounded-lg border-dashed border-2 border-gray-400">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span className="text-[#2d2b2b] text-sm ml-2">
            Upload company logo (PNG, JPEG)
          </span>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleFileChange}
            hidden
            required
          />
        </label>
        {selectedFile && (
          <p className="mt-2 text-green-500 text-sm">
            {selectedFile.name} selected for upload
          </p>
        )}
      </div>

      <p className="mt-2 text-red-600 text-sm">
        *Recycle would need to access your location*
      </p>

      <Button outline={false} className="w-full my-4">
        proceed to dashboard
      </Button>
    </form>
  );
};

const CompanyDetails: React.FC = (): JSX.Element => {
  return (
    <Container>
      <Details />
    </Container>
  );
};

export default CompanyDetails;
