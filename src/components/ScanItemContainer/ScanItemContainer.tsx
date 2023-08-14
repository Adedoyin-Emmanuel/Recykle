import React, { useState } from "react";
import Container from "../Container/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface ScanItemContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  blur?: boolean;
  onClose: () => void;
  showScanItemContainer: boolean;
}

const ScanItemContainer = ({
  blur,
  onClose,
  showScanItemContainer,
}: ScanItemContainerProps): JSX.Element => {
  const [showContainer, setShowContainer] = useState<boolean>(
    showScanItemContainer
  );

  const handleButtonClick = () => {
    setShowContainer(false);
    onClose();
  };
  return showContainer ? (
    <Container
      className={`fixed top-0 left-0  ${
        blur ? "backdrop-blur-sm" : ""
      } z-[100]`}
    >
      <section className="bg-green-100 w-11/12 md:w-2/4 lg:w-[35%]  h-2/4 rounded shadow relative flex items-center justify-center overflow-x-hidden">
        <section
          className="absolute top-2 right-2 bg-slate-50 rounded-full p-0 h-10 w-10 flex items-center justify-center cursor-pointer transition-colors transform-gpu duration-100 hover:bg-red-500 hover:text-white"
          onClick={handleButtonClick}
        >
          <FontAwesomeIcon icon={faXmark} size={"lg"} />
        </section>

        <section className="h-48 w-64 shadow bg-white rounded"></section>
      </section>
    </Container>
  ) : (
    <></>
  );
};

export default ScanItemContainer;
