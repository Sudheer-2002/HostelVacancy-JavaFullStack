import { Landingpage } from "./landingpage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Owner_Register } from "./owner/owner_register";
import { Owner_Login } from "./owner/owner_login";
import { User_Register } from "./user/user_register";
import { User_Login } from "./user/user_login";
import { OwnerHome } from "./owner/owner_home";
import { OwnerUsernameGenerate } from "./owner/ownerusername_generate";
import { ProtectedRoute } from "./protected_routes";
import { OwnerProfile } from "./owner/owner_profile";
import { UserHome } from "./user/user_home";
import { UserHostelDetails } from "./user/user_hosteldetails";
import { UserProfile } from "./user/user_profile";
export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/owner/register" element={<Owner_Register />} />
        <Route path="/owner/login" element={<Owner_Login />} />
        <Route path="/user/register" element={<User_Register />} />
        <Route path="/user/login" element={<User_Login />} />
        <Route
          path="/owner/generate-username"
          element={<OwnerUsernameGenerate />}
        />

        <Route
          path="/owner/home/vacancy-status"
          element={
            <ProtectedRoute>
              <OwnerHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/owner/profile"
          element={
            <ProtectedRoute>
              <OwnerProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/home"
          element={
            <ProtectedRoute>
              <UserHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/getHostel"
          element={
            <ProtectedRoute>
              <UserHostelDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
