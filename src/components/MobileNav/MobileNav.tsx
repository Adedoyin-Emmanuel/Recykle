import React from "react";
import TrashBin from "./../../assets/bin.svg";
import User from "./../../assets/user.svg";
import MoneyReceive from "./../../assets/money-receive.svg";

interface MobileNavProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  others?: React.Attributes;
  children?: React.ReactNode;
}

const MobileNav = ({
  className,
  children,
  ...others
}: MobileNavProps): JSX.Element => {
  return (
    <section
      className={`mobile-nav w-screen bg-slate-100 h-16 flex absolute bottom-0 md:hidden ${className}`}
      {...others}
    >
      <section className="mobile-items">
        <img src={TrashBin} alt="" />
      </section>
      <section className="mobile-items">
        <img src={User} alt="" />
      </section>
      <section className="mobile-items">
        <img src={MoneyReceive} alt="" />
      </section>

      {children}
    </section>
  );
};

export default MobileNav;
