import { NavigateFunction } from "react-router-dom";

export const navigateToAuth = (navigator: NavigateFunction) => {
  navigator("/auth");
};

export const navigateToDashboard = (navigator: NavigateFunction) =>{
  navigator("/dashboard");
}
