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
      {/* CARD */}
      <div className="group w-full bg-white rounded-[2rem] sm:rounded-[2.5rem] p-4 sm:p-6 shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-orange-200 relative overflow-hidden h-full flex flex-col min-h-0">
        {/* Decorative Gradient */}
        <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-orange-500/5 rounded-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16 group-hover:bg-orange-500/10 transition-colors"></div>

        {/* Photo */}
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

        {/* Info */}
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

          {/* Qualification */}
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

            {/* Experience */}
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

          {/* Button */}
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

      {/* MODAL */}
      {isOpen && (
        <div className="modal modal-open z-[9999] backdrop-blur-sm px-2 sm:px-4">
          <div className="modal-box rounded-[2rem] sm:rounded-[3rem] p-0 w-full max-w-2xl bg-white overflow-hidden shadow-2xl border border-slate-100 relative">
            {/* Header */}
            <div className="bg-[#0f172a] p-5 sm:p-10 text-white relative">
              {/* Close */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="btn btn-sm btn-circle bg-white/10 hover:bg-white/20 border-none text-white absolute right-4 sm:right-6 top-4 sm:top-6 z-[100]"
              >
                ✕
              </button>

              {/* Profile */}
              <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 relative z-10 text-center md:text-left">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border-4 border-white/20 shadow-2xl shrink-0">
                  <img
                    src={
                      displayPhoto ||
                      "https://i.ibb.co/vBR649p/user-placeholder.png"
                    }
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2 w-full">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight break-words">
                      {name}
                    </h2>

                    <FaCheckCircle className="text-blue-400 shrink-0" />
                  </div>

                  <p className="text-orange-400 font-black uppercase tracking-[0.2em] text-[9px] sm:text-[10px]">
                    Professional Educator
                  </p>

                  <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                    <span className="bg-white/10 px-3 sm:px-4 py-2 rounded-xl text-[10px] sm:text-xs font-bold backdrop-blur-md border border-white/10">
                      {gender || "Tutor"}
                    </span>

                    <span className="bg-white/10 px-3 sm:px-4 py-2 rounded-xl text-[10px] sm:text-xs font-bold backdrop-blur-md border border-white/10">
                      ⭐ 5.0 Rating
                    </span>
                  </div>
                </div>
              </div>

              {/* Decoration */}
              <div className="absolute top-0 right-0 w-40 sm:w-64 h-40 sm:h-64 bg-orange-500/10 rounded-full -mr-16 sm:-mr-20 -mt-16 sm:-mt-20 blur-3xl"></div>
            </div>

            {/* Content */}
            <div className="p-5 sm:p-8 md:p-12 space-y-8 sm:space-y-10">
              {/* Academic & Experience */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                <div className="p-5 sm:p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-500 shadow-sm border border-slate-100 shrink-0">
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

                <div className="p-5 sm:p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-500 shadow-sm border border-slate-100 shrink-0">
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

              {/* Contact */}
              <div className="space-y-4">
                <h4 className="font-black text-[#0f172a] uppercase tracking-widest text-[10px] ml-2">
                  Contact Details
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 min-w-0">
                    <FaEnvelope className="text-slate-400 shrink-0" />

                    <span className="text-slate-700 font-bold text-sm break-all">
                      {email || "Email Hidden"}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <FaPhoneAlt className="text-slate-400 shrink-0" />

                    <span className="text-slate-700 font-bold text-sm break-words">
                      {phone || "+880 1XXXXXXXXX"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <div className="pt-2 sm:pt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="btn btn-block bg-[#0f172a] hover:bg-orange-500 text-white rounded-2xl h-12 sm:h-14 font-black uppercase tracking-widest text-[10px] sm:text-xs border-none shadow-xl shadow-blue-900/10"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>

          {/* Backdrop */}
          <div
            className="modal-backdrop bg-slate-900/40 backdrop-blur-[2px]"
            onClick={() => setIsOpen(false)}
          ></div>
        </div>
      )}
    </>
  );
};

export default TutorsCard;
