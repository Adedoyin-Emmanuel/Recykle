/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import { Timestamp } from "firebase/firestore";
import { Link } from "react-router-dom";

interface Recyclable {
  className?: string;
  name: string;
  category: keyof typeof categoryIcons;
  dateAdded: Timestamp | any;
  id: string;
}

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

const Collection: React.FC<Recyclable> = ({
  name,
  className,
  category,
  dateAdded,
  id,
  ...others
}) => {
  return (
    <Link to={`/dashboard/collection/${id}`} className="w-full">
      <section
        className={`collection-card rounded-md p-3 flex items-center justify-between w-full mb-1   cursor-pointer ${className} transition-color transform-gpu ease-in-out duration-100 hover:bg-slate-50`}
        {...others}
      >
        <section className="flex flex-row items-center justify-center gap-x-4">
          <FontAwesomeIcon
            icon={categoryIcons[category]}
            className="text-[22px] p-3 w-6 h-6  rounded bg-green-100 text-white shadow-sm"
          />

          <p className="font-bold block text-sm capitalize">
            {name?.length > 10 ? name.substring(0, 30) : name}
          </p>
        </section>

        <section className="flex items-center justify-around">
          <p className="text-sm text-gray-500">{dateAdded}</p>
        </section>
      </section>
    </Link>
  );
};

export default Collection;
