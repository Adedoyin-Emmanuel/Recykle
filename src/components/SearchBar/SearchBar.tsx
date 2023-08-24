/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface SearchBarProps {
  className?: string;
  others?: React.Attributes;
  onChange?: (value: any) => void;
  onKeyDown?: (value: any) => void;
}

const SearchBar = ({
  className,
  onChange,
  onKeyDown,
  ...others
}: SearchBarProps): JSX.Element => {
  return (
    <input
      type="search"
      placeholder="Search recycling companies"
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={`bg-[#F5F5F5] capitalize p-5 rounded-full w-11/12 lg:w-8/12   outline-none border-2 border-transparent focus:border-slate-200 hover:border-slate-200  ${className}`}
      {...others}
    />
  );
};

export default SearchBar;
