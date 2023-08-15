import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Auth from "./pages/Auth/Auth";
import Recycle from "./pages/Recycle/Recycle";
import MarketPlace from "./pages/MarketPlace/MarketPlace";
import Profile from "./pages/Profile/Profile";
import Details from "./pages/Details/Details";
import Settings from "./pages/Settings/Settings";
import ProfileEdit from "./pages/ProfileEdit/ProfileEdit";
import CompanyAuth from "./pages/CompanyAuth/CompanyAuth";
import CompanyDashboard from "./pages/CompanyDashboard/CompanyDashboard";
import CompanyDetails from "./pages/CompanyDetails/CompanyDetails";
import CompanyProfile from "./pages/CompanyProfile/CompanyProfile";
import CompanyProfileEdit from "./pages/CompanyProfileEdit/CompanyProfileEdit";
import CompanySettings from "./pages/CompanySettings/CompanySettings";
import CompanySubmissions from "./pages/CompanySubmissions/CompanySubmissions";
import CompanyMaterials from "./pages/CompanyMaterials/CompanyMaterials";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Users Routes */}
        <Route path="/" element={<Home />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route
          path="/recycle"
          element={<ProtectedRoute children={<Recycle />} />}
        ></Route>
        <Route
          path="/details"
          element={<ProtectedRoute children={<Details />} />}
        ></Route>
        <Route
          path="/marketplace"
          element={<ProtectedRoute children={<MarketPlace />} />}
        ></Route>
        <Route
          path="/profile"
          element={<ProtectedRoute children={<Profile />} />}
        ></Route>
        <Route
          path="/settings"
          element={<ProtectedRoute children={<Settings />} />}
        ></Route>
        <Route
          path="/settings/profile-edit"
          element={<ProtectedRoute children={<ProfileEdit />} />}
        ></Route>

        {/* Recycling Companies routes */}
        <Route path="/company/auth" element={<CompanyAuth />}></Route>

        <Route
          path="/company/auth/details"
          element={<ProtectedRoute children={<CompanyDetails />} />}
        ></Route>

        <Route
          path="/company/dashboard"
          element={<ProtectedRoute children={<CompanyDashboard />} />}
        ></Route>

        <Route
          path="/company/dashboard/manage-materials"
          element={<ProtectedRoute children={<CompanyMaterials />} />}
        ></Route>

        <Route
          path="/company/dashboard/submissions"
          element={<ProtectedRoute children={<CompanySubmissions />} />}
        ></Route>

        <Route
          path="/company/dashboard/settings"
          element={<ProtectedRoute children={<CompanySettings />} />}
        ></Route>

        <Route
          path="/company/dashboard/profile"
          element={<ProtectedRoute children={<CompanyProfile />} />}
        ></Route>

        <Route
          path="/company/dashboard/profile/edit"
          element={<ProtectedRoute children={<CompanyProfileEdit />} />}
        ></Route>

        {/* Super Admin Routes */}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
