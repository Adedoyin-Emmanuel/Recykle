export const validateEmail = (email: string): boolean => {
  if (!email) return false;
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return !emailPattern.test(email) ? false : true;
};

export const checkPasswordLength = (password: string): boolean => {
  if (!password) return false;
  return password.length < 6 ? false : true;
};

export const checkIfUsernameHasSpace = (username: string): boolean => {
  if (!username) return false;
  return /\s/.test(username) ? false : true;
};
