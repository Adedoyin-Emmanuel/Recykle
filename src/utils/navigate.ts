import { NavigateFunction } from "react-router-dom";

export const navigateToAuth = (navigator: NavigateFunction) => {
  navigator("/auth");
};

export const navigateToDashboard = (navigator: NavigateFunction) => {
  navigator("/dashboard");
};

export const navigateToRecycling = (navigator: NavigateFunction) => {
  navigator("/recycle");
};

export const navigateToProfile = (navigator: NavigateFunction) => {
  navigator("/profile");
};

export const navigateToMarketPlace = (navigator: NavigateFunction) => {
  navigator("/marketplace");
};
