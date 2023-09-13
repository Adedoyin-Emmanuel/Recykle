/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Input from "../Input/Input";
import {
  faFileText,
  faBolt,
  faGlassMartiniAlt,
  faBoxOpen,
  faLaptop,
  faTshirt,
  faLeaf,
  faBatteryFull,
  faSkullCrossbones,
  faCarSide,
  faBlender,
  faWineGlassAlt,
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Notification from "../../utils/toast";
import { useAppContext, AppContextValuesProps } from "../../context/appContext";

//import { useNavigate } from "react-router-dom";

interface CategoryIcons {
  [category: string]: IconDefinition;
}

const categoryIcons: CategoryIcons = {
  "Paper and Cardboard": faFileText,
  Plastics: faBolt,
  Glass: faGlassMartiniAlt,
  Metals: faBoxOpen,
  Electronics: faLaptop,
  Textiles: faTshirt,
  "Organic Waste": faLeaf,
  Batteries: faBatteryFull,
  "Hazardous Waste": faSkullCrossbones,
  Tires: faCarSide,
  Appliances: faBlender,
  "Glass Bottles": faWineGlassAlt,
};

interface AddItemContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  blur?: boolean;
  onClose: () => void;
  showAddItemContainer: boolean;
}

const AddItemContainer = ({
  blur,
  onClose,
  showAddItemContainer,
}: AddItemContainerProps): JSX.Element => {
  let showContainer = showAddItemContainer;

  const handleCloseButtonClick = () => {
    showContainer = false;
    onClose();
  };

  const [selectedCategory, setSelectedCategory] = useState<any>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const toast = new Notification();
  const { user, addRecyclingItem }: AppContextValuesProps = useAppContext();

  const handleSaveItemClick = () => {
    console.log(selectedCategory);
    console.log(inputRef?.current?.value);

    const userCategorySelected = selectedCategory;
    const itemValue = inputRef?.current?.value;

    if (!userCategorySelected || userCategorySelected === undefined) {
      toast.error("Please select a category");
      return;
    }

    if (!itemValue || itemValue.trim() === "" || itemValue === " ") {
      toast.error("Enter valid item name");
      return;
    }

    const newItemDetails = {
      itemName: itemValue,
      itemCategory: userCategorySelected,
    };

    addRecyclingItem(user.uid, newItemDetails)
      .then((success: any) => {
        if (success) {
          console.log("Item added successfully");
        } else {
          console.log("Item could not be added");
        }
      })
      .catch((error: any) => {
        console.error("An error occurred:", error);
        // Handle the error
      });
    handleCloseButtonClick();
  };
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };
  const recyclableCategories = [
    "Paper and Cardboard",
    "Plastics",
    "Glass",
    "Metals",
    "Electronics",
    "Textiles",
    "Organic Waste",
    "Batteries",
    "Hazardous Waste",
    "Tires",
    "Appliances",
    "Glass Bottles",
  ];

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
        className="bg-green-5 w-11/12 md:w-2/4 lg:w-[35%] h-auto min-h-[45%] rounded shadow relative flex flex-col items-center justify-center overflow-y-scroll"
      >
        <motion.section
          className="absolute top-2 right-2 bg-slate-50 rounded-full p-0 h-10 w-10 flex items-center justify-center cursor-pointer transition-colors transform-gpu duration-100 hover:bg-red-500 hover:text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleCloseButtonClick}
        >
          <FontAwesomeIcon icon={faXmark} size={"lg"} />
        </motion.section>

        <motion.section
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className=""
        >
          {selectedCategory && (
            <section className="icon-contain p-5 my-5">
              <FontAwesomeIcon
                icon={categoryIcons[selectedCategory]}
                size="5x"
                className="text-green-500 "
              />
            </section>
          )}
        </motion.section>

        <div className="relative inline-block w-11/12">
          <select
            className="block w-full px-4 p-4 pr-8 text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:border-blue-500"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select a recyclable category</option>
            {recyclableCategories.map((category, index) => (
              <option
                key={index}
                value={category}
                className="hover:bg-green-100"
              >
                {category}
              </option>
            ))}
          </select>

          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="w-8 h-8 fill-current text-green-300"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
        <div className="w-11/12 mt-5">
          <label htmlFor="item-name" className="capitalize">
            item name
          </label>

          <Input
            className="mb-3 mt-1 text-sm bg-white capitalize"
            placeholder="eg ex water bottle "
            inputRef={inputRef}
          />
          <section className="button-section w-11/12 md:w-full flex items-center justify-center mx-auto md:mx-0 md:justify-end b-5 my-4">
            <button
              className="bg-transparent border-2 md:w-48 border-gray-600 rounded-[30px] p-3 capitalize w-full hover:border-transparent hover:bg-green-200 hover:text-white transition-colors transform-gpu duration-100 ease-in-out"
              onClick={handleSaveItemClick}
            >
              save item
            </button>
          </section>
        </div>
      </motion.section>
    </motion.div>
  ) : (
    <></>
  );
};

export default AddItemContainer;
