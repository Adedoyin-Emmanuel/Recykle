import React from "react";

interface UtilityBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

const UtilityBox = ({
  className,
  children,
  ...others
}: UtilityBoxProps): JSX.Element => {
  return (
    <section
      className={`utility-box rounded-lg bg-slate-50 hidden md:w-full lg:w-40 p-3 h-36 md:flex flex-col items-center justify-around gap-y-2 cursor-pointer hover:bg-green-5 my-4 ${className}`}
      {...others}
    >
      {children}
    </section>
  );
};

export default UtilityBox;
