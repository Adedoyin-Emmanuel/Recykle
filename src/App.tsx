import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CompanyProtectedRoute from "./components/CompanyProtectedRoute/CompanyProtectedRoute";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { AppContextProvider } from "./context/appContext";
import { CompanyAppContextProvider } from "./context/companyAppContext";
import { CompanyAuthProvider } from "./context/companyAuthContext";
import { UserAuthProvider } from "./context/userAuthContext";
import Auth from "./pages/Auth/Auth";
import CollectionView from "./pages/CollectionView/CollectionView";
import CompanyAuth from "./pages/CompanyAuth/CompanyAuth";
import CompanyDashboard from "./pages/CompanyDashboard/CompanyDashboard";
import CompanyDetails from "./pages/CompanyDetails/CompanyDetails";
import CompanyMaterials from "./pages/CompanyMaterials/CompanyMaterials";
import CompanyProfile from "./pages/CompanyProfile/CompanyProfile";
import CompanyProfileEdit from "./pages/CompanyProfileEdit/CompanyProfileEdit";
import CompanySettings from "./pages/CompanySettings/CompanySettings";
import CompanySubmissions from "./pages/CompanySubmissions/CompanySubmissions";
import Dashboard from "./pages/Dashboard/Dashboard";
import Details from "./pages/Details/Details";
import Home from "./pages/Home/Home";
import IndividualCompany from "./pages/IndividualCompany/IndividualCompany";
import MarketPlace from "./pages/MarketPlace/MarketPlace";
import NotFound from "./pages/NotFound/NotFound";
import Profile from "./pages/Profile/Profile";
import ProfileEdit from "./pages/ProfileEdit/ProfileEdit";
import Recycle from "./pages/Recycle/Recycle";
import Settings from "./pages/Settings/Settings";
import UserSubmissions from "./pages/UserSubmissions/UserSubmissions";
import ViewClientSubmission from "./pages/ViewClientSubmission/ViewClientSubmission";
import ViewSubmissions from "./pages/ViewSubmissions/ViewSubmissions";

const App = () => {
  return (
    <UserAuthProvider>
      <AppContextProvider>
        <CompanyAuthProvider>
          <CompanyAppContextProvider>
            <BrowserRouter>
              <Routes>
                {/* Users Routes */}
                <Route path="/" element={<Home />}></Route>

                <Route path="/auth" element={<Auth />}></Route>
                <Route
                  path="/auth/details"
                  element={<ProtectedRoute children={<Details />} />}
                ></Route>

                <Route
                  path="/dashboard"
                  element={<ProtectedRoute children={<Dashboard />} />}
                ></Route>
                <Route
                  path="/dashboard/recycle"
                  element={<ProtectedRoute children={<Recycle />} />}
                ></Route>
                <Route
                  path="/dashboard/recycle/:companyId"
                  element={<ProtectedRoute children={<IndividualCompany />} />}
                ></Route>

                <Route
                  path="/dashboard/collection/:collectionId"
                  element={<ProtectedRoute children={<CollectionView />} />}
                ></Route>

                <Route
                  path="/dashboard/submissions/:submissionId"
                  element={<ProtectedRoute children={<ViewSubmissions />} />}
                ></Route>

                <Route
                  path="/dashboard/recycle/:companyId/submit"
                  element={<ProtectedRoute children={<UserSubmissions />} />}
                ></Route>
                <Route
                  path="/dashboard/marketplace"
                  element={<ProtectedRoute children={<MarketPlace />} />}
                ></Route>
                <Route
                  path="/dashboard/profile"
                  element={<ProtectedRoute children={<Profile />} />}
                ></Route>
                <Route
                  path="/dashboard/settings"
                  element={<ProtectedRoute children={<Settings />} />}
                ></Route>
                <Route
                  path="/dashboard/settings/profile-edit"
                  element={<ProtectedRoute children={<ProfileEdit />} />}
                ></Route>

                {/* Recycling Companies routes */}
                <Route path="/company" element={<Home />}></Route>

                <Route path="/company/auth" element={<CompanyAuth />}></Route>

                <Route
                  path="/company/auth/details"
                  element={
                    <CompanyProtectedRoute children={<CompanyDetails />} />
                  }
                ></Route>

                <Route
                  path="/company/dashboard"
                  element={
                    <CompanyProtectedRoute children={<CompanyDashboard />} />
                  }
                ></Route>

                <Route
                  path="/company/dashboard/manage-materials"
                  element={
                    <CompanyProtectedRoute children={<CompanyMaterials />} />
                  }
                ></Route>

                <Route
                  path="/company/dashboard/submissions"
                  element={
                    <CompanyProtectedRoute children={<CompanySubmissions />} />
                  }
                ></Route>

                <Route
                  path="/company/dashboard/settings"
                  element={
                    <CompanyProtectedRoute children={<CompanySettings />} />
                  }
                ></Route>

                <Route
                  path="/company/dashboard/profile"
                  element={
                    <CompanyProtectedRoute children={<CompanyProfile />} />
                  }
                ></Route>

                <Route
                  path="/company/dashboard/submissions/:submissionId"
                  element={
                    <CompanyProtectedRoute
                      children={<ViewClientSubmission />}
                    />
                  }
                ></Route>

                <Route
                  path="/company/dashboard/profile/edit"
                  element={
                    <CompanyProtectedRoute children={<CompanyProfileEdit />} />
                  }
                ></Route>

                {/* Super Admin Routes */}
                <Route path="*" element={<NotFound />}></Route>
              </Routes>
            </BrowserRouter>
          </CompanyAppContextProvider>
        </CompanyAuthProvider>
      </AppContextProvider>
    </UserAuthProvider>
  );
};

export default App;
