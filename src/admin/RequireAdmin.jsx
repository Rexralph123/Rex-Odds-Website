// src/admin/RequireAdmin.jsx

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AdminAuthContext";

function RequireAdmin({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Wait for authentication to finish checking
  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-[#7C8F85] text-sm font-mono uppercase tracking-widest">
          Checking access…
        </p>
      </div>
    );
  }

  // User is not logged in or is not an admin
  if (!user || user.role !== "admin") {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // Admin is authenticated
  return children;
}

export default RequireAdmin;