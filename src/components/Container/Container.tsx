import React from "react";

interface ContainerProps {
  children: JSX.Element | JSX.Element[] | string;
  className?: string;
  others?: React.Attributes;
}

const Container = ({ children, className, others }: ContainerProps) => {
  return (
    <section
      className={`h-screen w-full flex  justify-center items-center ${className}`}
      {...others}
    >
      {children}
    </section>
  );
};

export default Container;
