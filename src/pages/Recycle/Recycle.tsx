import React from "react";
import Dashboard from "../Dashboard/Dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Container from "../../components/Container/Container";

const Recycle: React.FC = (): JSX.Element => {
  return (
    <Dashboard onRecyklePage>
      <h1 className="font-bold text-green-300 text-4xl capitalize">
        hello recykle page
      </h1>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste culpa iusto est sunt. Blanditiis quasi sapiente dolores pariatur deleniti exercitationem voluptatum, laudantium amet esse eum nostrum eius alias autem repudiandae.
        
        
        <section className="h-screen w-full bg-green-300"></section>
    </Dashboard>
  );
};

export default Recycle;
