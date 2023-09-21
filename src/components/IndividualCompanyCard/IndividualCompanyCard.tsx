import {
  faCalendar,
  faEnvelope,
  faLocationDot,
  faRecycle,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";
import CompanyBottle from "./../../assets/company-bottle.svg";
import CompanyMetals from "./../../assets/company-metals.svg";
import CompanyPaper from "./../../assets/company-paper.svg";
import CompanyTrash from "./../../assets/company-plastic.svg";

interface IndividualCompanyCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  companyImage: string;
  companyName: string;
  companyUsername: string;
  isVerified: boolean;
  companyAddress: string;
  companyEmail: string;
  companyRating: number;
  itemsRecycled: number;
  dateJoined: string;
}

const IndividualCompanyCard = ({
  className,
  companyImage,
  companyName,
  companyUsername,
  isVerified,
  companyAddress,
  companyEmail,
  companyRating,
  itemsRecycled,
  dateJoined,
}: IndividualCompanyCardProps): JSX.Element => {
  const StarRating = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < companyRating) {
        stars.push(
          <FontAwesomeIcon
            key={i}
            icon={faStar}
            className="text-yellow-500 mr-1"
          />
        );
      } else {
        stars.push(
          <FontAwesomeIcon
            key={i}
            icon={faStar}
            className="text-gray-400 mr-1"
          />
        );
      }
    }
    return stars;
  };

  const navigateTo = useNavigate();

  const handleRecycleButtonClicked = () => {
    navigateTo("submit");
  };

  return (
    <section
      className={`individual-card ${className} flex flex-col items-center mb-10 p-1`}
    >
      <section className="company-profile-image">
        <Avatar
          name={companyName}
          color={"#2EB875"}
          size="120"
          round={true}
          src={companyImage}
          className={`rounded-full text-sm cursor-pointer${className}`}
        />
      </section>
      <section className="company-details1 mt-5">
        <section className="companyName">
          <section className="company-name flex w-full items-center justify-end">
            <h2 className="font-bold capitalize text-[23px] flex items-center w-full">
              {companyName}

              {isVerified && (
                <p className="m-0 px-[5px]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="dodgerblue"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.5609 10.7386L20.2009 9.15859C19.9409 8.85859 19.7309 8.29859 19.7309 7.89859V6.19859C19.7309 5.13859 18.8609 4.26859 17.8009 4.26859H16.1009C15.7109 4.26859 15.1409 4.05859 14.8409 3.79859L13.2609 2.43859C12.5709 1.84859 11.4409 1.84859 10.7409 2.43859L9.17086 3.80859C8.87086 4.05859 8.30086 4.26859 7.91086 4.26859H6.18086C5.12086 4.26859 4.25086 5.13859 4.25086 6.19859V7.90859C4.25086 8.29859 4.04086 8.85859 3.79086 9.15859L2.44086 10.7486C1.86086 11.4386 1.86086 12.5586 2.44086 13.2486L3.79086 14.8386C4.04086 15.1386 4.25086 15.6986 4.25086 16.0886V17.7986C4.25086 18.8586 5.12086 19.7286 6.18086 19.7286H7.91086C8.30086 19.7286 8.87086 19.9386 9.17086 20.1986L10.7509 21.5586C11.4409 22.1486 12.5709 22.1486 13.2709 21.5586L14.8509 20.1986C15.1509 19.9386 15.7109 19.7286 16.1109 19.7286H17.8109C18.8709 19.7286 19.7409 18.8586 19.7409 17.7986V16.0986C19.7409 15.7086 19.9509 15.1386 20.2109 14.8386L21.5709 13.2586C22.1509 12.5686 22.1509 11.4286 21.5609 10.7386ZM16.1609 10.1086L11.3309 14.9386C11.1909 15.0786 11.0009 15.1586 10.8009 15.1586C10.6009 15.1586 10.4109 15.0786 10.2709 14.9386L7.85086 12.5186C7.56086 12.2286 7.56086 11.7486 7.85086 11.4586C8.14086 11.1686 8.62086 11.1686 8.91086 11.4586L10.8009 13.3486L15.1009 9.04859C15.3909 8.75859 15.8709 8.75859 16.1609 9.04859C16.4509 9.33859 16.4509 9.81859 16.1609 10.1086Z"
                      fill="dodgerblue"
                    />
                  </svg>
                </p>
              )}
            </h2>

            <section className="action-button flex">
              <button
                className="border-green-200 border-2 px-2 h-9 w-24 text-sm capitalize rounded-[30px] transition-colors hover:border-transparent hover:bg-green-200 hover:text-white ease-out duration-150"
                onClick={handleRecycleButtonClicked}
              >
                recycle
              </button>
            </section>
          </section>
          <p className="text-sm text-slate-500">@{companyUsername}</p>

          <p className="text-sm capitalize mt-3">
            bridging the gap between recycling companies and consumers
          </p>
        </section>

        <section className="companyDetails2">
          <section className="location flex items-center gap-x-2 mt-2 p-[2px] mb-1">
            <FontAwesomeIcon icon={faLocationDot} />

            <p className="text-sm block">{companyAddress}</p>
          </section>

          <section className="items-recycled flex items-center gap-x-2 mt-2 p-[2px] mb-1">
            <FontAwesomeIcon icon={faRecycle} />

            <p className="text-sm block capitalize ">
              {itemsRecycled} items recycled
            </p>
          </section>

          <section className="company-email flex items-center gap-x-2 mt-2 p-[2px] mb-1">
            <FontAwesomeIcon icon={faEnvelope} />

            <p className="text-sm block">{companyEmail}</p>
          </section>

          <section className="date-joined flex items-center gap-x-2 mt-2 p-[2px] mb-1">
            <FontAwesomeIcon icon={faCalendar} />

            <p className="text-sm block">{dateJoined}</p>
          </section>

          <section className="star-rating flex items-center gap-x-2 mt-2 p-[2px] mb-1">
            <StarRating />
            <p className="text-[13px] block capitalize"></p>
          </section>
        </section>

        <section className="company-details-3 mt-10">
          <h3 className="font-bold capitalize text-[20px]">
            accepted recyclables
          </h3>

          <section className="all-recyclables mt-4 grid grid-cols-2 gap-x-10 w-full p-3">
            <section className="recyclables bg-slate-50 rounded-md flex flex-col items-center cursor-pointer transition-colors duration-150 ease-linear hover:bg-green-100 hover:text-white mt-2 mb-4">
              <img src={CompanyTrash} className="p-5" />

              <section className="sategory p-2">
                <p className="category-na capitalize font-bold">plastic</p>
              </section>
            </section>

            <section className="recyclables bg-slate-50 rounded-md flex flex-col items-center cursor-pointer transition-colors duration-150 ease-linear hover:bg-green-100 hover:text-white mt-2 mb-4">
              <img src={CompanyPaper} className="p-5" />

              <section className="sategory p-2">
                <p className="category-na capitalize font-bold">cardboards</p>
              </section>
            </section>

            <section className="recyclables bg-slate-50 rounded-md flex flex-col items-center cursor-pointer transition-colors duration-150 ease-linear hover:bg-green-100 hover:text-white mt-2 mb-4">
              <img src={CompanyBottle} className="p-5" />

              <section className="sategory p-2">
                <p className="category-na capitalize font-bold">Glass</p>
              </section>
            </section>

            <section className="recyclables bg-slate-50 rounded-md flex flex-col items-center cursor-pointer transition-colors duration-150 ease-linear hover:bg-green-100 hover:text-white mt-2 mb-4">
              <img src={CompanyMetals} className="p-5" />

              <section className="sategory p-2">
                <p className="category-na capitalize font-bold">Metals</p>
              </section>
            </section>
          </section>

          <br />
          <br />
        </section>
      </section>
    </section>
  );
};

export default IndividualCompanyCard;
