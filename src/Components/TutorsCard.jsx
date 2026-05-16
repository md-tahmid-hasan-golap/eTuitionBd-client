import React, { useState } from "react";
import {
  FaGraduationCap,
  FaBriefcase,
  FaEnvelope,
  FaStar,
  FaPhoneAlt,
  FaCheckCircle,
} from "react-icons/fa";

const TutorsCard = ({ tutor }) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    name,
    photo,
    photoUrl,
    qualifications,
    experience,
    email,
    phone,
    gender,
  } = tutor || {};

  const displayPhoto = photo || photoUrl;

  return (
    <>
      <div className="group w-full bg-white rounded-[2rem] sm:rounded-[2.5rem] p-4 sm:p-6 shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-orange-200 relative overflow-hidden h-full flex flex-col min-h-0">
        <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-orange-500/5 rounded-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16 group-hover:bg-orange-500/10 transition-colors"></div>

        <div className="relative mb-5">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-500">
            <img
              src={
                displayPhoto || "https://i.ibb.co/vBR649p/user-placeholder.png"
              }
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-md border border-slate-50">
            <FaStar className="text-orange-500 text-xs sm:text-sm" />
          </div>
        </div>

        <div className="space-y-4 flex-grow flex flex-col">
          <div className="min-w-0">
            <h3 className="text-lg sm:text-xl font-black text-[#0f172a] tracking-tight group-hover:text-orange-500 transition-colors break-words">
              {name || "Expert Tutor"}
            </h3>

            <div className="flex items-center gap-2 text-slate-400 text-[9px] sm:text-[10px] font-black uppercase tracking-widest mt-1 overflow-hidden">
              <FaEnvelope className="text-slate-300 shrink-0" />
              <span className="truncate">{email || "Contact Hidden"}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-white transition-colors">
              <div className="text-orange-500 mt-1 shrink-0">
                <FaGraduationCap size={18} />
              </div>

              <div className="min-w-0">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">
                  Qualification
                </p>

                <p className="text-slate-700 font-bold text-xs break-words">
                  {qualifications || "Top Graduate"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-white transition-colors">
              <div className="text-blue-500 mt-1 shrink-0">
                <FaBriefcase size={16} />
              </div>

              <div className="min-w-0">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">
                  Experience
                </p>

                <p className="text-slate-700 font-bold text-xs break-words">
                  {experience || "Experienced Teacher"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-2">
            <button
              onClick={() => setIsOpen(true)}
              className="w-full mt-2 bg-[#0f172a] text-white font-black py-3 rounded-2xl text-[10px] uppercase tracking-widest transition-all duration-300 hover:bg-orange-600 shadow-lg active:scale-95"
            >
              View Profile
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="modal modal-open z-[9999] p-3 sm:p-4 md:p-6 items-center">
          <div className="modal-box w-full max-w-[min(100%,calc(100vw-1.5rem))] sm:max-w-lg md:max-w-2xl lg:max-w-3xl p-0 bg-white shadow-2xl relative flex flex-col max-h-[min(92dvh,900px)] sm:max-h-[min(88dvh,900px)] overflow-hidden rounded-2xl sm:rounded-[2rem] md:rounded-[3rem]">
            <div className="bg-[#0f172a] p-5 sm:p-8 md:p-10 text-white relative shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="btn btn-sm btn-circle bg-white/10 hover:bg-white/20 border-none text-white absolute right-3 top-3 sm:right-5 sm:top-5 md:right-6 md:top-6 z-[100]"
                aria-label="Close profile"
              >
                ✕
              </button>

              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-8 relative z-10 text-center sm:text-left pr-10 sm:pr-0">
                <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border-4 border-white/20 shadow-2xl shrink-0">
                  <img
                    src={
                      displayPhoto ||
                      "https://i.ibb.co/vBR649p/user-placeholder.png"
                    }
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-1 w-full min-w-0">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight break-words">
                      {name}
                    </h2>

                    <FaCheckCircle className="text-blue-400 shrink-0" />
                  </div>

                  <p className="text-orange-400 font-black uppercase tracking-[0.2em] text-[9px] sm:text-[10px]">
                    Professional Educator
                  </p>

                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3 mt-3 sm:mt-4">
                    <span className="bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-bold backdrop-blur-md border border-white/10">
                      {gender || "Tutor"}
                    </span>

                    <span className="bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-bold backdrop-blur-md border border-white/10">
                      ⭐ 5.0 Rating
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute top-0 right-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-orange-500/10 rounded-full -mr-12 sm:-mr-16 md:-mr-20 -mt-12 sm:-mt-16 md:-mt-20 blur-3xl pointer-events-none" />
            </div>

            <div className="p-5 sm:p-6 md:p-8 lg:p-12 space-y-6 sm:space-y-8 md:space-y-10 overflow-y-auto flex-1 min-h-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                <div className="p-4 sm:p-5 md:p-6 bg-slate-50 rounded-2xl sm:rounded-[2rem] border border-slate-100">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-xl flex items-center justify-center text-orange-500 shadow-sm border border-slate-100 shrink-0">
                      <FaGraduationCap />
                    </div>

                    <h4 className="font-black text-[#0f172a] uppercase tracking-widest text-[10px]">
                      Academic Info
                    </h4>
                  </div>

                  <p className="text-slate-600 font-medium text-sm leading-relaxed break-words">
                    {qualifications || "Information not provided by tutor."}
                  </p>
                </div>

                <div className="p-4 sm:p-5 md:p-6 bg-slate-50 rounded-2xl sm:rounded-[2rem] border border-slate-100">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-xl flex items-center justify-center text-blue-500 shadow-sm border border-slate-100 shrink-0">
                      <FaBriefcase />
                    </div>

                    <h4 className="font-black text-[#0f172a] uppercase tracking-widest text-[10px]">
                      Work Experience
                    </h4>
                  </div>

                  <p className="text-slate-600 font-medium text-sm leading-relaxed break-words">
                    {experience || "Information not provided by tutor."}
                  </p>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <h4 className="font-black text-[#0f172a] uppercase tracking-widest text-[10px] ml-0 sm:ml-2">
                  Contact Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex items-center gap-3 sm:gap-4 bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-100 min-w-0">
                    <FaEnvelope className="text-slate-400 shrink-0" />

                    <span className="text-slate-700 font-bold text-xs sm:text-sm break-all">
                      {email || "Email Hidden"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4 bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-100 min-w-0">
                    <FaPhoneAlt className="text-slate-400 shrink-0" />

                    <span className="text-slate-700 font-bold text-xs sm:text-sm break-words">
                      {phone || "+880 1XXXXXXXXX"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-1 sm:pt-2 md:pt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="btn btn-block bg-[#0f172a] hover:bg-orange-500 text-white rounded-2xl h-11 sm:h-12 md:h-14 font-black uppercase tracking-widest text-[10px] sm:text-xs border-none shadow-xl shadow-blue-900/10"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>

          <div
            className="modal-backdrop bg-slate-900/40 backdrop-blur-[2px]"
            onClick={() => setIsOpen(false)}
          />
        </div>
      )}
    </>
  );
};

export default TutorsCard;
