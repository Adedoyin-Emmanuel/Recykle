/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Container from "../../components/Container/Container";
import Layout from "../../components/Layout/Layout";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import GoogleIcon from "./../../assets/google.svg";
import { navigateToDashboard, navigateToDetails } from "../../utils/navigate";
import { useNavigate, useLocation } from "react-router-dom";
import {
  useUserAuth,
  UserAuthContextProps,
} from "../../context/userAuthContext";
import Notification from "../../utils/toast";
import {
  validateEmail,
  checkPasswordLength,
  checkIfUsernameHasSpace,
} from "../../utils/validations";
import { useAppContext } from "../../context/appContext";

const Header = (): JSX.Element => {
  return (
    <section className="form-header">
      <h3 className="font-bold text-3xl text-green-300 capitalize">recykle</h3>
      <p className="text-slate-600 text-sm py-3">
        Bridging the gap between recycling companies and post consumers
      </p>
    </section>
  );
};

const Auth: React.FC = (): JSX.Element => {
  const {
    registerWithCredentials,
    registerWithGoogleAccount,
    loginWithCredentials,
    loginWithGoogleAccount,
  }: UserAuthContextProps = useUserAuth();
  const navigateTo = useNavigate();

  const { userData, appContextLoading }: any = useAppContext();
  if (!appContextLoading && userData) {
    navigateTo("/dashboard");
  }

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const loginParam = queryParams.get("login");

  const [authButtonClicked, setAuthButtonClicked] = useState<boolean>(false);

  const toast = new Notification();

  const handleLoginWithCredentials = async (
    e: any | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setAuthButtonClicked(true);

    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!email || !password) {
      return toast.error("Please fill the required fields");
    }

    setAuthButtonClicked(false);
    const result = await loginWithCredentials(email, password);
    if (result) {
      navigateToDashboard(navigateTo);
    }
  };

  const handleLoginWithGoogle = async (
    e: any | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const result = await loginWithGoogleAccount();
    if (result) navigateTo("/dashboard");
  };

  const handleRegisterWithCredentials = async (
    e: any | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setAuthButtonClicked(true);
    const fullname = e.target[0].value;
    const username = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;

    if (!fullname || !username || !email || !password) {
      return toast.error("Please fill the required fields");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email address");
    }
    if (!checkPasswordLength(password)) {
      return toast.error("Password must be at least 6 characters long");
    }
    if (!checkIfUsernameHasSpace(username)) {
      return toast.error("Username can not contain space");
    }

    /* finally we can register the user 😄 */
    const result = await registerWithCredentials(
      email,
      password,
      fullname,
      username
    );
    setAuthButtonClicked(false);
    if (result) {
      navigateToDetails(navigateTo);
    }
  };

  const handleRegisterWithGoogle = async (
    e: any | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const result = await registerWithGoogleAccount();
    if (result) {
      navigateToDetails(navigateTo);
    }
  };

  const Login = (): JSX.Element => {
    return (
      <form
        className="login-section my-10 lg:w-1/4 w-11/12"
        onSubmit={(e) => {
          handleLoginWithCredentials(e);
        }}
      >
        <Header />
        <div className="email my-5">
          <label htmlFor="email" className="capitalize">
            email
          </label>
          <Input placeholder="Enter your email" type="email" required />
        </div>

        <div className="password my-5">
          <label htmlFor="password" className="capitalize">
            password
          </label>
          <Input placeholder="Enter your password" type="password" required />
        </div>

        <Button
          outline={false}
          className="w-full my-4"
          disabled={authButtonClicked}
        >
          {authButtonClicked ? "loading" : "login"}
        </Button>

        <section className="google-auth flex w-full items-center justify-start">
          <Button
            outline
            className="w-36 flex items-center justify-around"
            onClick={handleLoginWithGoogle}
          >
            <img src={GoogleIcon} alt="sign up google" className="" />
            <p className="capitalize px-3">login</p>
          </Button>
        </section>
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

  const SignUp = (): JSX.Element => {
    return (
      <form
        className="login-section my-10 lg:w-1/4 w-11/12"
        onSubmit={(e) => handleRegisterWithCredentials(e)}
      >
        <Header />
        <div className="my-5">
          <label htmlFor="fullname" className="capitalize">
            fullname
          </label>
          <Input placeholder="Enter your fullname" type="text" required />
        </div>

        <div className="my-5">
          <label htmlFor="username" className="capitalize">
            username
          </label>
          <Input placeholder="Enter your username" type="text" required />
        </div>
        <div className="email my-5">
          <label htmlFor="email" className="capitalize">
            email
          </label>
          <Input placeholder="Enter your email" type="email" required />
        </div>

        <div className="password my-5">
          <label htmlFor="password" className="capitalize">
            password
          </label>
          <Input placeholder="Enter your password" type="password" required />
        </div>

        <Button
          outline={false}
          className="w-full my-4"
          disabled={authButtonClicked}
        >
          {authButtonClicked ? "Signing Up..." : "Sign Up"}
        </Button>

        <section className="google-auth flex w-full items-center justify-start">
          <Button
            outline
            className="w-36 flex items-center justify-around"
            onClick={handleRegisterWithGoogle}
          >
            <img src={GoogleIcon} alt="sign up google" className="" />
            <p className="capitalize px-3">sign up</p>
          </Button>
        </section>
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
    loginParam === "true" ? <Login /> : <SignUp />
  );

  const handleLoginTextClick = () => {
    setAuthType(<Login />);
  };

  const handleCreateAccountTextClick = () => {
    setAuthType(<SignUp />);
  };

  return (
    <Layout>
      <Container>{authType}</Container>
    </Layout>
  );
};

export default Auth;
