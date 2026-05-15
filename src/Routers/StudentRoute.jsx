import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";

const StudentRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const [role, isRoleLoading] = useRole();
  const location = useLocation();

  if (authLoading || isRoleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-orange-500"></span>
          <progress className="progress w-56 progress-warning"></progress>
          <p className="text-slate-400 font-bold italic animate-pulse">Checking Student Access...</p>
        </div>
      </div>
    );
  }

  // Not logged in at all → send to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in as student → allow
  if (role?.toLowerCase() === "student") {
    return children;
  }

  // Logged in but wrong role → send to home
  return <Navigate to="/" replace />;
};

export default StudentRoute;
