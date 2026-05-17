import React from "react";

const Spinner = ({ text = "Preparing your dashboard..." }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#fcfcfd]/80 backdrop-blur-md px-4">
      {/* Main Container Card - Responsive Width */}
      <div className="relative flex flex-col items-center w-full max-w-[320px] md:max-w-[400px] p-8 md:p-12">
        {/* Animated Spinner Core - Scaled for Mobile */}
        <div className="relative w-20 h-20 md:w-24 md:h-24 mb-6 md:mb-8">
          {/* Outer Rotating Ring */}
          <div className="absolute inset-0 rounded-full border-[3px] border-slate-100"></div>
          <div className="absolute inset-0 rounded-full border-[3px] border-t-orange-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>

          {/* Middle Ring (Reverse Rotation) */}
          <div className="absolute inset-3 md:inset-4 rounded-full border-[3px] border-slate-100"></div>
          <div className="absolute inset-3 md:inset-4 rounded-full border-[3px] border-t-transparent border-r-transparent border-b-[#0f172a] border-l-transparent animate-spin-reverse"></div>

          {/* Center Pulsing Square */}
          <div className="absolute inset-[38%] bg-orange-500 rounded-lg shadow-lg shadow-orange-200 animate-pulse"></div>
        </div>

        {/* Text Section - Responsive Typography */}
        <div className="text-center space-y-2">
          <h2 className="text-xl md:text-3xl font-black text-[#0f172a] tracking-tighter">
            eTuition<span className="text-orange-500">Bd</span>
          </h2>
          <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.3em] md:tracking-[0.4em] animate-pulse px-2 leading-relaxed">
            {text}
          </p>
        </div>

        {/* Professional Loading  */}
        <div className="flex gap-2 mt-6 md:mt-8">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full ${
                i === 1 ? "bg-orange-500" : "bg-[#0f172a]"
              } animate-bounce`}
              style={{ animationDelay: `${i * 150}ms` }}
            ></span>
          ))}
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-reverse {
          animation: spin-reverse 1.2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Spinner;
