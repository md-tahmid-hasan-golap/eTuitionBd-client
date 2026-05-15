import React, { useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaUserAlt,
  FaRegClock,
  FaInfoCircle,
} from "react-icons/fa";

const TutionsDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [role] = useRole();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    data: tution,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["tuition", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tutions/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError || !tution)
    return <div className="text-center py-10 text-red-500">Error fetching data</div>;

  const {
    subject,
    class: className,
    salary,
    location: tuitionLocation,
    daysPerWeek,
    description,
    tuitionType,
    studentName,
    studentEmail,
    postedAt,
  } = tution;

  // Check if the tutor has already applied
  const hasApplied = tution?.applications?.some((app) => app.tutorEmail === user?.email);

  const onSubmit = async (data) => {
    const payload = {
      tuitionId: id,
      studentEmail: studentEmail || tution.email, // Adjust based on DB
      tutorEmail: user?.email,
      tutorName: user?.displayName,
      qualifications: data.qualifications,
      experience: data.experience,
      expectedSalary: data.expectedSalary,
      appliedAt: new Date().toISOString(),
    };

    try {
      await axiosSecure.post("/tutor/apply", payload);
      toast.success("Application submitted successfully! 🎉");
      setIsModalOpen(false);
      reset();
      refetch(); // Refetch to update hasApplied status
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to apply. Please try again.");
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-16 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100">
          {/* Header Section */}
          <div className="bg-[#0f172a] p-12 text-white relative">
            <div className="flex flex-wrap justify-between items-start gap-6 relative z-10">
              <div className="space-y-4">
                <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-full inline-block shadow-lg">
                  {className}
                </span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight">{subject}</h2>
                <div className="flex items-center gap-2 text-blue-400 font-bold uppercase text-[10px] tracking-widest">
                  <FaChalkboardTeacher />
                  <span>{tuitionType}</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">
                  Monthly Salary
                </p>
                <h3 className="text-3xl font-black text-emerald-400">BDT {salary}</h3>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          </div>

          <div className="p-8 md:p-14">
            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="flex items-center gap-5 p-6 bg-slate-50 rounded-3xl border border-slate-100 group">
                <div className="w-14 h-14 bg-white text-blue-600 rounded-2xl flex items-center justify-center text-2xl shadow-sm">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Location
                  </p>
                  <p className="text-slate-800 font-extrabold text-lg">{tuitionLocation}</p>
                </div>
              </div>

              <div className="flex items-center gap-5 p-6 bg-slate-50 rounded-3xl border border-slate-100 group">
                <div className="w-14 h-14 bg-white text-orange-500 rounded-2xl flex items-center justify-center text-2xl shadow-sm">
                  <FaCalendarAlt />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Weekly Schedule
                  </p>
                  <p className="text-slate-800 font-extrabold text-lg">{daysPerWeek}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <FaInfoCircle />
                </div>
                <h4 className="text-[#0f172a] text-sm font-black tracking-widest uppercase">
                  Requirement Details
                </h4>
              </div>
              <p className="text-slate-600 leading-loose font-medium bg-slate-50/50 p-8 rounded-[2rem] border border-slate-200">
                {description}
              </p>
            </div>

            {/* Metadata Footer */}
            <div className="border-t border-slate-100 pt-10 flex flex-wrap justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 border border-slate-200">
                  <FaUserAlt size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Posted By
                  </p>
                  <p className="text-slate-900 font-bold">{studentName}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                <FaRegClock />
                <span>
                  Posted On:{" "}
                  {new Date(postedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Application Button */}
            <div className="mt-14">
              {!user ? (
                <Link
                  to="/login"
                  state={{ from: location }}
                  className="w-full bg-[#0f172a] hover:bg-blue-700 text-white font-black py-5 rounded-3xl shadow-xl transition-all duration-300 uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-4 text-center block"
                >
                  Login to Apply
                </Link>
              ) : role === "tutor" ? (
                <button
                  onClick={() => setIsModalOpen(true)}
                  disabled={hasApplied}
                  className="w-full bg-[#0f172a] hover:bg-blue-700 text-white font-black py-5 rounded-3xl shadow-xl transition-all duration-300 uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-4 active:scale-[0.98] disabled:opacity-50 disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                  {hasApplied ? "Already Applied" : "Submit Application Now"}
                </button>
              ) : (
                <button
                  disabled
                  className="w-full bg-slate-300 text-slate-500 font-black py-5 rounded-3xl shadow-none uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-4 cursor-not-allowed"
                >
                  Only Tutors Can Apply
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box rounded-[2rem] p-8 max-w-md bg-white">
            <h3 className="font-black text-2xl text-[#0f172a] mb-2">Apply for Tuition</h3>
            <p className="text-sm text-slate-500 mb-6">
              Provide your details to submit your application.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700 ml-1">Qualifications</label>
                <input
                  type="text"
                  placeholder="e.g. BSc in CSE, BracU"
                  className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-orange-500 focus:outline-none"
                  {...register("qualifications", { required: "Qualifications are required" })}
                />
                {errors.qualifications && (
                  <span className="text-xs text-red-500 ml-1">{errors.qualifications.message}</span>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700 ml-1">Experience</label>
                <input
                  type="text"
                  placeholder="e.g. 2 years of teaching Math"
                  className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-orange-500 focus:outline-none"
                  {...register("experience", { required: "Experience is required" })}
                />
                {errors.experience && (
                  <span className="text-xs text-red-500 ml-1">{errors.experience.message}</span>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Expected Salary (BDT)
                </label>
                <input
                  type="number"
                  placeholder={`e.g. ${salary}`}
                  className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-orange-500 focus:outline-none"
                  {...register("expectedSalary", { required: "Expected Salary is required" })}
                />
                {errors.expectedSalary && (
                  <span className="text-xs text-red-500 ml-1">{errors.expectedSalary.message}</span>
                )}
              </div>

              <div className="modal-action mt-6 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    reset();
                  }}
                  className="btn btn-ghost rounded-2xl px-6"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn bg-[#0f172a] hover:bg-orange-500 text-white rounded-2xl px-8"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
          <div
            className="modal-backdrop bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
        </div>
      )}
    </div>
  );
};

export default TutionsDetails;
