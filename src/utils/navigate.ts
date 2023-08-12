import { NavigateFunction } from "react-router-dom";

export const navigateToAuth = (navigator: NavigateFunction) => {
  navigator("/auth");
};
