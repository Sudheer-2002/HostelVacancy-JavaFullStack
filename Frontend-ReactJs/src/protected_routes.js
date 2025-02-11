import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    return <Navigate to="/owner/login" />;
  }
  return children;
}
