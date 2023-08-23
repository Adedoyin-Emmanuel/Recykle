import { Timestamp } from "firebase/firestore";

export const formatNumbers = (number: number): string => {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "m";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + "k";
  } else {
    return number.toString();
  }
};

export const getFirstName = (fullName: string): string => {
  const spaceIndex = fullName?.indexOf(" ");

  return spaceIndex === -1 ? fullName : fullName.substring(0, spaceIndex);
};

export const formatDateFromTimestamp = (timestamp: Timestamp) => {
  if (!timestamp || !timestamp.toDate) {
    return "";
  }

  const date = timestamp.toDate();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
