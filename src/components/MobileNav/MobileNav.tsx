import React from "react";
import TrashBin from "./../../assets/bin.svg";
import User from "./../../assets/user.svg";
import ShoppingBag from "./../../assets/shopping-bag.svg";

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
      className={`mobile-nav w-screen bg-slate-100 h-16 flex items-center justify-around absolute bottom-0 md:hidden ${className}`}
      {...others}
    >
      <section className="mobile-items">
        <img src={TrashBin} alt=""  className="w-8 h-8"/>
      </section>
      <section className="mobile-items">
        <img src={User} alt=""  className="w-8 h-8"/>
      </section>
      <section className="mobile-items">
        <img src={ShoppingBag} alt="" className="w-8 h-8" />
      </section>

      {children}
    </section>
  );
};

export default MobileNav;
