import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = ({ className, ...others }: InputProps): JSX.Element => {
  return (
    <input
      {...others}
      className={`bg-[#F5F5F5] outline-none mt-4 w-full rounded-md p-3 text-[#2d2b2b] ${className}`}
    />
  );
};

export default Input;
