import React, { useState } from "react";
import Container from "../../components/Container/Container";
import Layout from "../../components/Layout/Layout";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import GoogleIcon from "./../../assets/google.svg";
import { navigateToDashboard } from "../../utils/navigate";
import { useNavigate } from "react-router-dom";
//interface AuthProps {}

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
  const navigateTo = useNavigate();

  const handleAuthButtonClick = () => {
    navigateToDashboard(navigateTo);
  };

  const Login = (): JSX.Element => {
    return (
      <form className="login-section my-10 lg:w-1/4 w-11/12">
        <Header />
        <div className="username my-5">
          <label htmlFor="username" className="capitalize">
            email
          </label>
          <Input placeholder="Enter your email" type="email" />
        </div>

        <div className="username my-5">
          <label htmlFor="username" className="capitalize">
            password
          </label>
          <Input placeholder="Enter your username" type="text" />
        </div>

        <Button
          outline={false}
          className="w-full my-4"
          onClick={handleAuthButtonClick}
        >
          login
        </Button>

        <section className="google-auth flex w-full items-center justify-start">
          <Button outline className="w-36 flex items-center justify-around">
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
      <form className="login-section my-10 lg:w-1/4 w-11/12">
        <Header />
        <div className="username my-5">
          <label htmlFor="username" className="capitalize">
            username
          </label>
          <Input placeholder="Enter your username" type="text" />
        </div>
        <div className="username my-5">
          <label htmlFor="username" className="capitalize">
            email
          </label>
          <Input placeholder="Enter your email" type="email" />
        </div>

        <div className="username my-5">
          <label htmlFor="username" className="capitalize">
            password
          </label>
          <Input placeholder="Enter your username" type="text" />
        </div>

        <Button
          outline={false}
          className="w-full my-4"
          onClick={handleAuthButtonClick}
        >
          sign up
        </Button>

        <section className="google-auth flex w-full items-center justify-start">
          <Button outline className="w-36 flex items-center justify-around">
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
  const [authType, setAuthType] = useState<JSX.Element>(<Login />);

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
