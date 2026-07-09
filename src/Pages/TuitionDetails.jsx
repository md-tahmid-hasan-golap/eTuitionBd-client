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

const TuitionDetails = () => {
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
      const res = await axiosSecure.get(`/tuition/${id}`); // Corrected path to match user request
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-800">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
      </div>
    );
  }

  if (isError || !tution) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800 gap-4">
        <p className="text-red-500 text-xl font-bold">Error loading tuition details.</p>
        <Link to="/tuitions" className="btn btn-primary rounded-xl">Back to List</Link>
      </div>
    );
  }

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

  const hasApplied = tution?.applications?.some((app) => app.tutorEmail === user?.email);

  const onSubmit = async (data) => {
    const payload = {
      tuitionId: id,
      tuitionSubject: subject, // Added for display in AppliedTutors
      studentEmail: studentEmail || tution.email,
      tutorEmail: user?.email,
      tutorName: user?.displayName,
      qualifications: data.qualifications,
      experience: data.experience,
      expectedSalary: data.expectedSalary,
      appliedAt: new Date().toISOString(),
    };

    try {
      await axiosSecure.post("/api/tutor/apply", payload);
      toast.success("Application submitted successfully! 🎉");
      setIsModalOpen(false);
      reset();
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to apply. Please try again.");
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="text-sm breadcrumbs mb-8 text-slate-500 dark:text-slate-400 font-medium">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/tuitions">Tuitions</Link></li>
            <li className="text-orange-500 font-bold">{subject}</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-700 flex flex-col lg:flex-row">
          {/* Main Content Side */}
          <div className="flex-1">
             {/* Header */}
            <div className="bg-[#0f172a] p-12 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <span className="bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 inline-block">
                        {className}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">{subject}</h1>
                    <div className="flex items-center gap-4 text-slate-400 font-bold">
                        <div className="flex items-center gap-2">
                            <FaChalkboardTeacher className="text-orange-500" />
                            <span className="text-sm uppercase tracking-wider">{tuitionType}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaRegClock className="text-orange-500" />
                            <span className="text-sm uppercase tracking-wider">{daysPerWeek}</span>
                        </div>
                    </div>
                </div>
                {/* Decorative Circles */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>
            </div>

            <div className="p-8 md:p-14">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="p-8 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 flex gap-6 items-center">
                        <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-3xl shadow-sm text-blue-600">
                            <FaMapMarkerAlt />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Location</p>
                            <p className="text-slate-800 dark:text-slate-200 font-black text-xl">{tuitionLocation}</p>
                        </div>
                    </div>
                    <div className="p-8 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 flex gap-6 items-center">
                        <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-3xl shadow-sm text-emerald-500">
                            <FaMoneyBillWave />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Salary Range</p>
                            <p className="text-slate-800 dark:text-slate-200 font-black text-xl">BDT {salary} <span className="text-slate-400 text-sm font-medium">/month</span></p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <FaInfoCircle className="text-orange-500 text-xl" />
                        <h3 className="text-[#0f172a] text-xl font-black tracking-tight">Requirement Description</h3>
                    </div>
                    <div className="prose max-w-none text-slate-600 dark:text-slate-300 font-medium leading-relaxed bg-slate-50/50 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 border-dashed">
                        {description || "No detailed description provided for this tuition post."}
                    </div>
                </div>
            </div>
          </div>

          {/* Sidebar / Apply Section */}
          <div className="lg:w-96 bg-slate-50/80 backdrop-blur-sm border-l border-slate-100 dark:border-slate-700 p-10 flex flex-col justify-between">
            <div className="space-y-10">
                <div className="space-y-4">
                    <h4 className="text-[#0f172a] font-black uppercase tracking-widest text-[10px]">Posted By</h4>
                    <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/50 text-orange-600 rounded-full flex items-center justify-center font-black">
                            {studentName?.[0] || "S"}
                        </div>
                        <div>
                            <p className="text-slate-900 dark:text-slate-100 font-black">{studentName || "Anonymous"}</p>
                            <p className="text-slate-400 text-[10px] font-bold">Verified Student</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                     <h4 className="text-[#0f172a] font-black uppercase tracking-widest text-[10px]">Post Info</h4>
                     <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-400 font-bold">Date Posted</span>
                            <span className="text-slate-800 dark:text-slate-200 font-black">{new Date(postedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-400 font-bold">Status</span>
                            <span className="badge badge-success text-white font-bold text-[10px] uppercase px-3 py-3">Active</span>
                        </div>
                     </div>
                </div>
            </div>

            <div className="mt-12 space-y-4">
                {!user ? (
                    <Link
                    to="/login"
                    state={{ from: location }}
                    className="btn btn-block bg-[#0f172a] hover:bg-orange-500 text-white rounded-2xl h-16 font-black uppercase tracking-widest text-xs border-none shadow-xl"
                    >
                    Login to Apply
                    </Link>
                ) : role === "Tutor" || role === "tutor" ? (
                    <button
                    onClick={() => setIsModalOpen(true)}
                    disabled={hasApplied}
                    className="btn btn-block bg-orange-500 hover:bg-[#0f172a] text-white rounded-2xl h-16 font-black uppercase tracking-widest text-xs border-none shadow-xl disabled:bg-slate-300"
                    >
                    {hasApplied ? "Already Applied" : "Apply for Tuition"}
                    </button>
                ) : (
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-2xl border border-blue-100 dark:border-blue-900/50 text-center">
                        <p className="text-blue-600 text-xs font-black uppercase tracking-widest leading-relaxed">
                            Students cannot apply to their own or others' tuitions.
                        </p>
                    </div>
                )}
            </div>
          </div>
        </div>
      </div>

      {/* Modern Application Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box rounded-[3rem] p-10 max-w-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="font-black text-3xl text-[#0f172a]">Send Application</h3>
                    <p className="text-sm text-slate-400 font-medium italic mt-1">Applying for: {subject}</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="btn btn-sm btn-circle btn-ghost">✕</button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Read-only User Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase ml-1">Your Name</label>
                  <input
                    type="text"
                    value={user?.displayName || "N/A"}
                    readOnly
                    className="input input-bordered w-full rounded-2xl bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-bold cursor-not-allowed text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase ml-1">Your Email</label>
                  <input
                    type="email"
                    value={user?.email || "N/A"}
                    readOnly
                    className="input input-bordered w-full rounded-2xl bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-bold cursor-not-allowed text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase ml-1">Your Qualifications</label>
                <textarea
                  placeholder="e.g. BSc in Mathematics from University of Dhaka, 2 years experience..."
                  className="textarea textarea-bordered w-full rounded-2xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-orange-500 focus:outline-none min-h-[100px] text-slate-800 dark:text-slate-200 font-medium"
                  {...register("qualifications", { required: "Please provide your qualifications" })}
                />
                {errors.qualifications && <span className="text-xs text-red-500 ml-1">{errors.qualifications.message}</span>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase ml-1">Experience Level</label>
                    <input
                    type="text"
                    placeholder="e.g. 2+ Years"
                    className="input input-bordered w-full rounded-2xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-orange-500 text-slate-800 dark:text-slate-200 font-medium"
                    {...register("experience", { required: true })}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase ml-1">Expected Salary</label>
                    <input
                    type="number"
                    placeholder={`e.g. ${salary}`}
                    className="input input-bordered w-full rounded-2xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-orange-500 text-slate-800 dark:text-slate-200 font-medium"
                    {...register("expectedSalary", { required: true })}
                    />
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 border-none rounded-2xl h-14 font-black uppercase tracking-widest text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn flex-1 bg-orange-500 hover:bg-[#0f172a] text-white border-none rounded-2xl h-14 font-black uppercase tracking-widest text-xs shadow-lg shadow-orange-200"
                >
                  Confirm & Submit
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop bg-slate-900/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
        </div>
      )}
    </div>
  );
};

export default TuitionDetails;
