/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Container from "../../components/Container/Container";
import Layout from "../../components/Layout/Layout";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import {
  navigateToCompanyDetails,
  navigateToCompanyDashboard,
} from "../../utils/navigate";
import { useNavigate, useLocation } from "react-router-dom";
import Notification from "../../utils/toast";
import {
  validateEmail,
  checkPasswordLength,
  checkIfUsernameHasSpace,
} from "../../utils/validations";

import {
  useCompanyAuth,
  CompanyAuthContextProps,
} from "../../context/companyAuthContext";

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

const CompanyAuth = (): JSX.Element => {
  const navigateTo = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const loginParam = queryParams.get("login");

  const {
    registerWithCredentials,
    loginWithCredentials,
  }: CompanyAuthContextProps = useCompanyAuth();

  const toast = new Notification();

  // const handleLoginWithCredentials = async (
  //   e: any | React.FormEvent<HTMLFormElement>
  // ) => {
  //   e.preventDefault();
  //   setAuthButtonClicked(true);

  //   const email = e.target[0].value;
  //   const password = e.target[1].value;

  //   if (!email || !password) {
  //     return toast.error("Please fill the required fields");
  //   }

  //   setAuthButtonClicked(false);
  //   const result = await loginWithCredentials(email, password);
  //   if (result) {
  //     navigateToDashboard(navigateTo);
  //   }
  // };

  const handleRegisterWithCredentials = async (
    e: any | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const companyName = e.target[0].value;
    const companyUsername = e.target[1].value;
    const companyEmail = e.target[2].value;
    const companyPassword = e.target[3].value;

    if (!companyName || !companyUsername || !companyEmail || !companyPassword) {
      toast.error("Plese fill the required fields");
      return;
    }

    if (!validateEmail(companyEmail)) {
      return toast.error("Please enter a valid email address");
    }
    if (!checkPasswordLength(companyPassword)) {
      return toast.error("Password must be at least 6 characters long");
    }
    if (!checkIfUsernameHasSpace(companyUsername)) {
      return toast.error("Username can not contain space");
    }

    //everything is well

    const result = await registerWithCredentials(
      companyEmail,
      companyPassword,
      companyName,
      companyUsername
    );

    if (result) {
      console.log(result);
      navigateToCompanyDetails(navigateTo);
    }
    console.log(result);
  };

  const handleLoginWithCredentials = async (
    e: any | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const companyEmail = e.target[0].value;
    const companyPassword = e.target[1].value;

    if (!companyEmail || !companyPassword) {
      return toast.error("Please fill the required fields");
    }

    //everything is well :)

    const result = await loginWithCredentials(companyEmail, companyPassword);

    if (result) {
      navigateToCompanyDashboard(navigateTo);
    }
  };

  const CompanyLogin = (): JSX.Element => {
    return (
      <form
        className="login-section my-10 lg:w-1/4 w-11/12"
        onSubmit={(e) => handleLoginWithCredentials(e)}
      >
        <Header
          headerText="Login"
          subHeaderText="You are logging in as a recycling company"
        />
        <div className="username my-5">
          <label htmlFor="username" className="capitalize">
            email
          </label>
          <Input placeholder="Enter your email" type="email" required />
        </div>

        <div className="username my-5">
          <label htmlFor="username" className="capitalize">
            password
          </label>
          <Input placeholder="Enter your password" type="password" required />
        </div>

        <Button outline={false} className="w-full my-4">
          login
        </Button>

        <section className="google-auth flex w-full items-center justify-start"></section>
        <p className="account-details my-2">
          Don't have an account ?
          <span
            className="text-green-300 px-3 cursor-pointer appearance-none"
            onClick={handleCreateAccountTextClick}
          >
            Create account
          </span>
        </p>
      </form>
    );
  };

  const CompanySignup = (): JSX.Element => {
    return (
      <form
        className="login-section my-10 lg:w-1/4 w-11/12"
        onSubmit={(e) => handleRegisterWithCredentials(e)}
      >
        <Header
          headerText="Create Account"
          subHeaderText="Create an account for your recycling company"
        />
        <div className="username my-5">
          <label htmlFor="username" className="capitalize">
            company name
          </label>
          <Input placeholder="Enter your company name" type="text" required />
        </div>

        <div className="username my-5">
          <label htmlFor="username" className="capitalize">
            company username
          </label>
          <Input placeholder="Enter your username" type="text" required />
        </div>

        <div className="username my-5">
          <label htmlFor="username" className="capitalize">
            email
          </label>
          <Input placeholder="Enter your email" type="email" required />
        </div>

        <div className="username my-5">
          <label htmlFor="username" className="capitalize">
            password
          </label>
          <Input placeholder="Enter your password" type="password" required />
        </div>

        <Button outline={false} className="w-full my-4">
          sign up
        </Button>

        <section className="google-auth flex w-full items-center justify-start"></section>
        <p className="account-details my-2">
          Have an account ?
          <span
            className="text-green-300 px-3 cursor-pointer appearance-none"
            onClick={handleLoginTextClick}
          >
            Login
          </span>
        </p>
      </form>
    );
  };
  const [authType, setAuthType] = useState<JSX.Element>(
    loginParam === "true" ? <CompanyLogin /> : <CompanySignup />
  );

  const handleLoginTextClick = () => {
    setAuthType(<CompanyLogin />);
  };

  const handleCreateAccountTextClick = () => {
    setAuthType(<CompanySignup />);
  };

  return (
    <Layout>
      <Container>{authType}</Container>
    </Layout>
  );
};

export default CompanyAuth;
