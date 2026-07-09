import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, isRoleLoading] = useRole();
  const location = useLocation();

  if (loading || isRoleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-blue-600"></span>
          <progress className="progress w-56 progress-info"></progress>
          <p className="text-slate-400 font-bold italic animate-pulse">Authenticating Admin...</p>
        </div>
      </div>
    );
  }

  // Not logged in at all → send to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in as admin → allow
  if (role?.toLowerCase() === "admin") {
    return children;
  }

  // Logged in but wrong role → send to home
  return <Navigate to="/" replace />;
};

export default AdminRoute;
