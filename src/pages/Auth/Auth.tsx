import React from "react";
import Container from "../../components/Container/Container";
import Layout from "../../components/Layout/Layout";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
//interface AuthProps {}

const Auth: React.FC = (): JSX.Element => {
  return (
    <Layout>
      <Container>
        <Login />
      </Container>
    </Layout>
  );
};

const Login = (): JSX.Element => {
  return (
    <form className="login-section my-10 lg:w-1/4 w-11/12">
      <div className="username my-5">
        <label htmlFor="username" className="capitalize">
          username
        </label>
        <Input placeholder="Enter your username" type="text" />
      </div>
      <div className="username my-5">
        <label htmlFor="username" className="capitalize">
          password
        </label>
        <Input placeholder="Enter your username" type="text" />
      </div>

      <Button outline={false} className="w-full ">
        login
      </Button>
    </form>
  );
};

export default Auth;
