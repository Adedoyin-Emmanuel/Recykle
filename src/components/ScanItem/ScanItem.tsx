import React from "react";
import ScanIcon from "./../../assets/scan.svg";

interface ScanItemProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  onClick?: () => void;
  others?: React.Attributes;
}

const ScanItem = ({
  className,
  onClick,
  ...others
}: ScanItemProps): JSX.Element => {
  return (
    <section className="fixed bottom-20 right-10">
      <section
        className={`scan-item w-16 h-16 flex items-center justify-center  bg-green-200 rounded-full shadow cursor-pointer relative transform-gpu transition-transform duration-200 scale-100 hover:scale-110 ${className}`}
        onClick={onClick}
        {...others}
      >
        <img src={ScanIcon} alt="Scannner" className="p-0 m-0" />
      </section>
    </section>
  );
};

export default ScanItem;
