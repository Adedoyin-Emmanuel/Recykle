import React from "react";
import MobileNav from "../MobileNav/MobileNav";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
  others?: React.Attributes;
}

const Sidebar = ({
  className,
  children,
  ...others
}: SidebarProps): JSX.Element => {
  return (
    <section className="parent bg-green-500 h-screen ">
      <section
        className={`sidenav bg-slate-100 h-screen hidden md:flex  md:w-3/12  lg:w-2/12 items-center justify-start flex-col ${className} p-0 `}
        {...others}
      >
        <section className="header-section w-full flex items-center justify-start my-5 flex-col">
          <section className="w-3/4 flex flex-col items-start mx-3">
            <section className="profile-picture bg-green-200 rounded-full w-20 h-20"></section>

            <section className="profile-name mt-5">
              <h4 className="font-bold capitalize text-1xl">
                adedoyin emmanuel
              </h4>

              <p className="text-slate-400 text-sm">@doyin</p>
            </section>
          </section>
        </section>

        <section className="recycle bg-green-400 rounded p-3 w-3/4 flex items-center justify-center capitalize text-white my-16">
          recykle
        </section>
        <section className="recycle bg-green-400 rounded p-3 w-3/4 flex items-center justify-center capitalize text-white my-16">
          profile
        </section>
        <section className="recycle bg-green-400 rounded p-3 w-3/4 flex items-center justify-center capitalize text-white my-16">
          marketplace
        </section>

        {children}
      </section>
      <MobileNav />
    </section>
  );
};

export default Sidebar;
