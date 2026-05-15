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
      <div className="group bg-white rounded-[2.5rem] p-6 shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-orange-200 relative overflow-hidden">
        {/* Decorative Gradient Background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -mr-16 -mt-16 group-hover:bg-orange-500/10 transition-colors"></div>

        {/* Photo and Badge */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-[2rem] overflow-hidden border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-500">
            <img
              src={
                displayPhoto || "https://i.ibb.co/vBR649p/user-placeholder.png"
              }
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-md border border-slate-50">
            <FaStar className="text-orange-500 text-sm" />
          </div>
        </div>

        {/* Info */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-black text-[#0f172a] tracking-tight group-hover:text-orange-500 transition-colors">
              {name || "Expert Tutor"}
            </h3>
            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">
              <FaEnvelope className="text-slate-300" />
              <span className="truncate">{email || "Contact Hidden"}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-white transition-colors">
              <div className="text-orange-500">
                <FaGraduationCap size={18} />
              </div>
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">
                  Qualification
                </p>
                <p className="text-slate-700 font-bold text-xs truncate max-w-[150px]">
                  {qualifications || "Top Graduate"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-white transition-colors">
              <div className="text-blue-500">
                <FaBriefcase size={16} />
              </div>
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">
                  Experience
                </p>
                <p className="text-slate-700 font-bold text-xs">
                  {experience || "Experienced Teacher"}
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="w-full mt-2 bg-[#0f172a] text-white font-black py-3 rounded-2xl text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-300 hover:bg-orange-600 shadow-lg active:scale-95"
          >
            View Profile
          </button>
        </div>
      </div>

      {/* Profile Modal */}
      {isOpen && (
        <div className="modal modal-open z-[9999] backdrop-blur-sm">
          <div className="modal-box rounded-[3rem] p-0 max-w-2xl bg-white overflow-hidden shadow-2xl border border-slate-100 relative">
            {/* Modal Header/Banner */}
            <div className="bg-[#0f172a] p-10 text-white relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="btn btn-sm btn-circle bg-white/10 hover:bg-white/20 border-none text-white absolute right-6 top-6 z-[100]"
              >
                ✕
              </button>

              <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-white/20 shadow-2xl">
                  <img
                    src={
                      displayPhoto ||
                      "https://i.ibb.co/vBR649p/user-placeholder.png"
                    }
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center md:text-left space-y-2">
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                      {name}
                    </h2>
                    <FaCheckCircle className="text-blue-400" />
                  </div>
                  <p className="text-orange-400 font-black uppercase tracking-[0.2em] text-[10px]">
                    Professional Educator
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                    <span className="bg-white/10 px-4 py-2 rounded-xl text-xs font-bold backdrop-blur-md border border-white/10">
                      {gender || "Tutor"}
                    </span>
                    <span className="bg-white/10 px-4 py-2 rounded-xl text-xs font-bold backdrop-blur-md border border-white/10">
                      ⭐ 5.0 Rating
                    </span>
                  </div>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            </div>

            {/* Modal Content */}
            <div className="p-8 md:p-12 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-500 shadow-sm border border-slate-100">
                      <FaGraduationCap />
                    </div>
                    <h4 className="font-black text-[#0f172a] uppercase tracking-widest text-[10px]">
                      Academic Info
                    </h4>
                  </div>
                  <p className="text-slate-600 font-medium text-sm leading-relaxed">
                    {qualifications || "Information not provided by tutor."}
                  </p>
                </div>

                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-500 shadow-sm border border-slate-100">
                      <FaBriefcase />
                    </div>
                    <h4 className="font-black text-[#0f172a] uppercase tracking-widest text-[10px]">
                      Work Experience
                    </h4>
                  </div>
                  <p className="text-slate-600 font-medium text-sm leading-relaxed">
                    {experience || "Information not provided by tutor."}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-black text-[#0f172a] uppercase tracking-widest text-[10px] ml-2">
                  Contact Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <FaEnvelope className="text-slate-400" />
                    <span className="text-slate-700 font-bold text-sm">
                      {email || "Email Hidden"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <FaPhoneAlt className="text-slate-400" />
                    <span className="text-slate-700 font-bold text-sm">
                      {phone || "+880 1XXXXXXXXX"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="btn btn-block bg-[#0f172a] hover:bg-orange-500 text-white rounded-2xl h-14 font-black uppercase tracking-widest text-xs border-none shadow-xl shadow-blue-900/10"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
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
