import React from "react";

interface ButtonProps {
  className?: string;
  outline: boolean;
  children: JSX.Element | JSX.Element[] | string;
  others?: React.Attributes;
  onClick: () => void;
}

const Button = ({
  className,
  outline,
  children,
  others,
  onClick,
}: ButtonProps): JSX.Element => {
  const button = outline ? (
    <button
      className={`h-14 text-center rounded-sm capitalize text-black  p-2 cursor-pointer hover:bg-green-300 hover:text-white border-2 border-spacing-3 border-green-300 transition-all duration-150 ${className}`}
      {...others}
      onClick={onClick}
    >
      {children}
    </button>
  ) : (
    <button
      className={`h-14 text-center bg-green-300 text-white rounded-smcursor-pointer  capitalize border-2 border-spacing-3 border-transparent p-2  hover:bg-transparent hover:border-green-300 hover:text-black transition-all duration-150 ${className}`}
      {...others}
      onClick={onClick}
    >
      {children}
    </button>
  );
  return button;
};

export default Button;
