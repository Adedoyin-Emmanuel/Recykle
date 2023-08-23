import React, { InputHTMLAttributes, MutableRefObject } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputRef?: MutableRefObject<HTMLInputElement | null>; 
}

const Input = ({ className, inputRef, ...others }: InputProps): JSX.Element => {
  return (
    <input
      className={`bg-[#F5F5F5] outline-none mt-4 w-full rounded-md p-4 text-[#2d2b2b] ${className}`}
      ref={inputRef}
      {...others}
    />
  );
};

export default Input;
