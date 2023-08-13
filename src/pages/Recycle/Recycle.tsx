import React from "react";
import Dashboard from "../Dashboard/Dashboard";

const StepOne = (titile: string) => {
  return (
    <section className="login-section my-10 lg:w-1/4 w-11/12">
      <div className="username my-5">
        <label htmlFor="username" className="capitalize">
          email
        </label>
        <Input placeholder="Enter your email" type="email" />
      </div>

      <div className="password my-5">
        <label htmlFor="password" className="capitalize">
          password
        </label>
        <Input placeholder="Enter your password" type="password" />
      </div>
    </section>
  );
};

const StepTwo = (title: string) => {
  return (
    <section className="login-section my-10 lg:w-1/4 w-11/12">
      <div className="username my-5">
        <label htmlFor="username" className="capitalize">
          another email
        </label>
        <Input placeholder="Enter your email" type="email" />
      </div>

      <div className="password my-5">
        <label htmlFor="password" className="capitalize">
          another password
        </label>
        <Input placeholder="Enter your password" type="password" />
      </div>
    </section>
  );
};

const StepThree = (title: string) => {
  return (
    <section className="login-section my-10 lg:w-1/4 w-11/12">
      <div className="username my-5">
        <label htmlFor="username" className="capitalize">
          last email
        </label>
        <Input placeholder="Enter your email" type="email" />
      </div>

      <div className="password my-5">
        <label htmlFor="password" className="capitalize">
          last password
        </label>
        <Input placeholder="Enter your password" type="password" />
      </div>
    </section>
  );
};

const Recycle: React.FC = (): JSX.Element => {
  return (
    <Dashboard onRecyklePage>
      <h1 className="font-bold text-green-300 text-4xl capitalize">
        hello recykle page
      </h1>
      {/* <MultiStep
        activeStep={0}
        
      >
        <StepOne title="Step 1" />
        <StepTwo title="Step 2" />
        <StepThree title="Step 3" />
      </MultiStep> */}
    </Dashboard>
  );
};

export default Recycle;
