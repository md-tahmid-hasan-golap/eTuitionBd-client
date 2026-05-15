import React, { useContext } from "react";
import { AuthContext } from "../firebase/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-orange-500"></span>
          <progress className="progress w-56 progress-warning"></progress>
          <p className="text-slate-400 font-bold italic animate-pulse">Verifying session...</p>
        </div>
      </div>
    );
  }
  if (!user) {
    return <Navigate state={{ from: location }} to="/login" replace></Navigate>;
  }
  return children;
};

export default PrivateRouter;
