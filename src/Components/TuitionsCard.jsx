import React from "react";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaArrowRight,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const TuitionsCard = ({ tution, tuition, isDashboard, handleDelete }) => {
  const tuitionData = tution || tuition;

  // Destructuring
  const {
    _id,
    subject,
    class: className,
    salary,
    location,
    daysPerWeek,
    description,
    tuitionType,
  } = tuitionData || {};

  return (
    <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col h-full relative overflow-hidden">
      {/* Status or Type Badge */}
      <div className="flex justify-between items-start mb-6">
        <span className="bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-[0.15em] px-4 py-1.5 rounded-full border border-slate-200">
          {className}
        </span>
        <div className="flex items-center gap-1.5 text-emerald-600 font-extrabold text-lg">
          <FaMoneyBillWave className="text-emerald-500" />
          <span>{salary} BDT</span>
        </div>
      </div>

      {/* Main Title Section */}
      <div className="mb-4">
        <h3 className="text-2xl font-black text-[#0f172a] group-hover:text-blue-700 transition-colors duration-300 leading-tight">
          {subject}
        </h3>
        <div className="flex items-center gap-2 mt-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
          <FaChalkboardTeacher />
          <span>{tuitionType}</span>
        </div>
      </div>

      {/* Short Description */}
      <p className="text-slate-500 text-sm mb-8 line-clamp-3 leading-relaxed font-medium">
        {description}
      </p>

      {/* Info List */}
      <div className="space-y-4 mb-8 flex-grow">
        <div className="flex items-center gap-4 group/item">
          <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 group-hover/item:bg-orange-500 group-hover/item:text-white transition-all">
            <FaMapMarkerAlt size={14} />
          </div>
          <div>
            <p className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">
              Location
            </p>
            <p className="text-sm text-slate-700 font-bold">{location}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 group/item">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 group-hover/item:bg-blue-500 group-hover/item:text-white transition-all">
            <FaCalendarAlt size={14} />
          </div>
          <div>
            <p className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">
              Schedule
            </p>
            <p className="text-sm text-slate-700 font-bold">
              {daysPerWeek} Per Week
            </p>
          </div>
        </div>
      </div>

      {/* --- Action Buttons Logic --- */}
      <div className="mt-auto">
        {isDashboard ? (
          // ১. ড্যাশবোর্ড হলে এই বাটনগুলো দেখাবে (Update & Delete)
          <div className="flex flex-col gap-3">
            <Link
              to={`/dashboard/applied-tutors/${_id}`}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl text-center transition-all flex items-center justify-center gap-2 uppercase text-[10px] tracking-widest shadow-lg mb-1"
            >
              View Applicants
            </Link>
            <div className="flex gap-3">
              <Link
                to={`/dashboard/update-tuition/${_id}`}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl text-center transition-all flex items-center justify-center gap-2 uppercase text-[10px] tracking-widest shadow-lg"
              >
                <FaEdit /> Update
              </Link>
              <button
                onClick={() => handleDelete(_id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-black py-4 rounded-2xl text-center transition-all flex items-center justify-center gap-2 uppercase text-[10px] tracking-widest shadow-lg"
              >
                <FaTrashAlt /> Delete
              </button>
            </div>
          </div>
        ) : (
          // ২. ড্যাশবোর্ড না হলে শুধু "View Details" দেখাবে
          <Link
            to={`/tuition/${_id}`}
            className="w-full bg-[#0f172a] hover:bg-blue-700 text-white font-black py-4 rounded-2xl text-center transition-all duration-300 flex items-center justify-center gap-3 uppercase text-xs tracking-[0.2em] shadow-lg hover:shadow-blue-200"
          >
            View Details{" "}
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>

      {/* Decorative background element */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-slate-50 rounded-full -z-10 group-hover:bg-blue-50 transition-colors"></div>
    </div>
  );
};

export default TuitionsCard;
