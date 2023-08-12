import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  outline: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  outline,
  children,
  className,
  ...rest
}: ButtonProps) => {
  const baseClassNames =
    "h-14 text-center rounded-sm cursor-pointer capitalize p-2 border-2 border-spacing-3 transition-all duration-150";

  const outlineClass = `${baseClassNames} ${
    outline
      ? "text-black  hover:bg-green-300 hover:text-white border-green-300"
      : "text-white bg-green-300 text-white hover:bg-green-200 border-transparent"
  } ${className}`;

  return (
    <button className={outlineClass} {...rest} >
      {children}
    </button>
  );
};

export default Button;
