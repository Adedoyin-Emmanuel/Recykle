import React from "react";

interface ContainerProps {
  children: JSX.Element | JSX.Element[] | string;
  className?: string;
  others?: React.Attributes;
}

const Container = ({ children, className, others }: ContainerProps) => {
  return (
    <section className={`container ${className}`} {...others}>
      {children}
    </section>
  );
};

export default Container;
