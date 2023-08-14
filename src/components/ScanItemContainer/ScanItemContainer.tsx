import React, { useState } from "react";
import { motion } from "framer-motion";
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
  let showContainer = showScanItemContainer;
  console.log(showScanItemContainer);
  const handleButtonClick = () => {
    showContainer = false;
    onClose();
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return showContainer ? (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center ${
        blur ? "backdrop-blur-sm" : ""
      } z-[100]`}
    >
      <motion.section
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-green-100 w-11/12 md:w-2/4 lg:w-[35%] h-2/4 rounded shadow relative flex items-center justify-center overflow-x-hidden"
      >
        <motion.section
          className="absolute top-2 right-2 bg-slate-50 rounded-full p-0 h-10 w-10 flex items-center justify-center cursor-pointer transition-colors transform-gpu duration-100 hover:bg-red-500 hover:text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleButtonClick}
        >
          <FontAwesomeIcon icon={faXmark} size={"lg"} />
        </motion.section>

        <motion.section
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="h-48 w-64 shadow bg-white rounded"
        ></motion.section>
      </motion.section>
    </motion.div>
  ) : (
    <></>
  );
};

export default ScanItemContainer;
