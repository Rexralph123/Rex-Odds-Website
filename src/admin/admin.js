// admin/admin.js
import { Route } from "react-router-dom";

import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import RequireAdmin from "./RequireAdmin";

// Mounted in App.jsx's <Routes> like:
//   {AdminRoutes}
// Keeps every admin-specific route (and the guard around it) in one
// place instead of scattered through the main router.
export const AdminRoutes = (
  <>
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route
      path="/admin"
      element={
        <RequireAdmin>
          <AdminDashboard />
        </RequireAdmin>
      }
    />
  </>
);