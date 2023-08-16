import { NavigateFunction } from "react-router-dom";

/* Recykle Users Navigations */
export const navigateToAuth = (navigator: NavigateFunction) => {
  navigator("/auth");
};

export const navigateToDetails = (navigator: NavigateFunction) => {
  navigator("/auth/details");
};

export const navigateToDashboard = (navigator: NavigateFunction) => {
  navigator("/dashboard");
};

export const navigateToRecycling = (navigator: NavigateFunction) => {
  navigator("/dashboard/recycle");
};

export const navigateToProfile = (navigator: NavigateFunction) => {
  navigator("/dashboard/profile");
};

export const navigateToMarketPlace = (navigator: NavigateFunction) => {
  navigator("/dashboard/marketplace");
};

export const navigateToSettings = (navigator: NavigateFunction) => {
  navigator("/dashboard/settings");
};

export const navigateToProfileEdit = (navigator: NavigateFunction) => {
  navigator("/dashboard/settings/profile-edit");
};

/*Recycling Companies Navigations */
export const navigateToCompanyAuth = (navigator: NavigateFunction) => {
  navigator("/company/auth/");
};

export const navigateToCompanyDetails = (navigator: NavigateFunction) => {
  navigator("/company/auth/details");
};

export const navigateToCompanyDashboard = (navigator: NavigateFunction) => {
  navigator("/company/dashboard");
};

export const navigateToCompanyProfile = (navigator: NavigateFunction) => {
  navigator("/company/dashboard/profile");
};

export const navigateToCompanyProfileEdit = (navigator: NavigateFunction) => {
  navigator("/company/dashboard/profile/edit");
};

export const navigateToCompanySettings = (navigator: NavigateFunction) => {
  navigator("/company/dashboard/settings");
};

export const navigateToCompanyRecycleSubmissions = (
  navigator: NavigateFunction
) => {
  navigator("/company/dashboard/submissions");
};

export const navigateToCompanyManageMaterials = (
  navigator: NavigateFunction
) => {
  navigator("/company/dashboard/manage-materials");
};

/* Super Admin Navigations */
