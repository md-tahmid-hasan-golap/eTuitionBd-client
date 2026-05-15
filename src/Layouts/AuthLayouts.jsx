import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const AuthLayouts = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fcfcfd] flex flex-col font-sans relative overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-[-5%] right-[-5%] w-72 h-72 bg-orange-50 rounded-full blur-[100px] opacity-70"></div>
      <div className="absolute bottom-[-5%] left-[-5%] w-72 h-72 bg-blue-50 rounded-full blur-[100px] opacity-70"></div>

      {/* Top Navigation */}
      <header className="p-6 relative z-20">
        <button
          onClick={() => navigate("/")}
          className="group flex items-center gap-3 text-[#0f172a] font-bold transition-all"
        >
          {/* Circular Icon Holder */}
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md border border-gray-100 group-hover:bg-[#0f172a] group-hover:text-white transition-all duration-300">
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300 text-sm" />
          </div>

          {/* Text with Border Bottom Animation */}
          <div className="flex flex-col items-start leading-none">
            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">
              Return
            </span>
            <span className="text-sm tracking-wide group-hover:text-orange-600 transition-colors">
              Back to Home
            </span>
          </div>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-16 relative z-10">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-black text-[#0f172a] tracking-tighter">
            eTuition<span className="text-orange-500">Bd</span>
          </h1>
          <div className="flex items-center justify-center gap-2 mt-1">
            <div className="h-[2px] w-4 bg-orange-500 rounded-full"></div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400">
              Education Portal
            </p>
            <div className="h-[2px] w-4 bg-orange-500 rounded-full"></div>
          </div>
        </div>

        {/* The Form Container - Outlet */}
        <div className="w-full max-w-[480px]">
          <Outlet />
        </div>
      </main>

      {/* Subtle Footer */}
      <footer className="p-6 text-center text-[10px] text-gray-300 font-medium uppercase tracking-[0.3em] relative z-10">
        &copy; 2025 eTuitionBd • Secure Access
      </footer>
    </div>
  );
};

export default AuthLayouts;
