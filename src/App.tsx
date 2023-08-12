import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Auth from "./pages/Auth/Auth";
import Recycle from "./pages/Recycle/Recycle";
import MarketPlace from "./pages/MarketPlace/MarketPlace";
import Profile from "./pages/Profile/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>}> </Route>
          <Route path="/auth" element={<Auth/>}> </Route>
          <Route path="/recycle" element={
          <ProtectedRoute children={<Recycle/>}/>
          }></Route>
          <Route path="/marketplace" element={
          <ProtectedRoute children={<MarketPlace/>}/>
          }></Route>
          <Route path="/profile" element={
          <ProtectedRoute children={<Profile/>}/>
          }></Route>
          <Route path="*" element={<NotFound/>}> </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
