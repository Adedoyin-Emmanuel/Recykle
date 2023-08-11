import React from "react";

interface LayoutProps {
  className?: string;
  children?: JSX.Element | JSX.Element[] | string;
  others?: React.Attributes;
}
const Layout = ({ className, children, others }: LayoutProps): JSX.Element => {
  return (
    <section
      className={`w-full md:mx-auto md:my-12 flex flex-col  ${className}`}
      {...others}
    >
      {children}
    </section>
  );
};

export default Layout;
