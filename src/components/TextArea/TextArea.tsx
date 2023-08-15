import React from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const TextArea = ({ className, ...others }: TextAreaProps): JSX.Element => {
  return (
    <textarea
      className={`bg-[#F5F5F5] outline-none mt-4 w-full rounded-md p-4 text-[#2d2b2b] ${className}`}
      rows={3}
      {...others}
    ></textarea>
  );
};

export default TextArea;
