import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarBold } from "@fortawesome/free-solid-svg-icons";
import VerifiedIcon from "./../../assets/verify.svg";

interface RecycingCompanyCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  name: string;
  address: string;
  rating: number;
  isVerified: boolean;
  others?: React.Attributes;
}

const RecycingCompanyCard = ({
  className,
  name,
  address,
  rating,
  isVerified,
  others,
}: RecycingCompanyCardProps): JSX.Element => {
  const HeaderSection = () => {
    return isVerified ? (
      <h4 className="recycling-company-name font-bold flex">
        {name}
        <p className="m-0 px-[5px]">
          <img src={VerifiedIcon} alt="company-verified" width={20}  height={20}/>
        </p>
      </h4>
    ) : (
      <h4 className="recycling-company-name font-bold">{name}</h4>
    );
  };

  const StarRating = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <FontAwesomeIcon
            key={i}
            icon={faStarBold}
            className="text-yellow-500 mr-1"
          />
        );
      } else {
        stars.push(
          <FontAwesomeIcon
            key={i}
            icon={faStarBold}
            className="text-gray-400 mr-1"
          />
        );
      }
    }
    return stars;
  };
  return (
    <section
      className={`recycling-company-card shadow bg-green-1 cursor-pointer hover:bg-green-5 mt-5 w-full p-3 rounded h-32  flex flex-col justify-center gap-3 ${className}`}
      {...others}
    >
      <HeaderSection />
      <p className="text-slate-500 text-sm capitalize">
        {address.length > 30 ? address.substring(0, 30) : address}
      </p>
      <section className="flex">
        <StarRating />
      </section>
    </section>
  );
};

export default RecycingCompanyCard;
