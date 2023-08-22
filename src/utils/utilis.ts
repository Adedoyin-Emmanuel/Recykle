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
