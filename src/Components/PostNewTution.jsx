import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../firebase/AuthContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  FaBookOpen,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaAlignLeft,
} from "react-icons/fa";

const PostNewTuition = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      studentName: user?.displayName || "Student",
      studentEmail: user?.email || "",
      status: "Pending",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const tuitionData = {
        ...data,
        studentName: user?.displayName || "Student",
        studentEmail: user?.email || "",
        status: "Pending",
        createdAt: new Date(),
        salary: parseInt(data.salary),
      };

      const res = await axiosSecure.post(
        "/api/student/post-tuition",
        tuitionData,
      );

      if (res.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Tuition posted successfully! Waiting for admin approval.",
          icon: "success",
          confirmButtonColor: "#0f172a",
          customClass: { popup: "rounded-[2rem]" },
        });
        navigate("/dashboard/my-tuitions");
      }
    } catch (err) {
      console.error("POST TUITION ERROR:", err);
      toast.error(
        "Failed to post tuition! " +
          (err.response?.data?.message || err.message),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-4xl font-black text-[#0f172a] italic uppercase tracking-tighter">
          Post <span className="text-orange-500">New Tuition</span>
        </h2>
        <p className="text-slate-500 mt-2 font-medium">
          Fill out the details to find the perfect tutor.
        </p>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-slate-100">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Subject */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                <FaBookOpen className="text-orange-500" /> Subject
              </label>
              <input
                type="text"
                placeholder="e.g. Higher Math, Physics"
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-orange-500 focus:outline-none transition-all font-medium text-slate-800"
                {...register("subject", { required: "Subject is required" })}
              />
              {errors.subject && (
                <span className="text-xs text-red-500 ml-1">
                  {errors.subject.message}
                </span>
              )}
            </div>

            {/* Class */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                <FaChalkboardTeacher className="text-blue-500" /> Class / Level
              </label>
              <input
                type="text"
                placeholder="e.g. Class 10, HSC 1st Year"
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-orange-500 focus:outline-none transition-all font-medium text-slate-800"
                {...register("class", { required: "Class is required" })}
              />
              {errors.class && (
                <span className="text-xs text-red-500 ml-1">
                  {errors.class.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                <FaMoneyBillWave className="text-emerald-500" /> Salary (BDT)
              </label>
              <input
                type="number"
                placeholder="e.g. 5000"
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-orange-500 focus:outline-none transition-all font-medium text-slate-800"
                {...register("salary", { required: "Salary is required" })}
              />
              {errors.salary && (
                <span className="text-xs text-red-500 ml-1">
                  {errors.salary.message}
                </span>
              )}
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" /> Location
              </label>
              <input
                type="text"
                placeholder="e.g. Dhanmondi, Dhaka"
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-orange-500 focus:outline-none transition-all font-medium text-slate-800"
                {...register("location", { required: "Location is required" })}
              />
              {errors.location && (
                <span className="text-xs text-red-500 ml-1">
                  {errors.location.message}
                </span>
              )}
            </div>

            {/* Days per week */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                <FaCalendarAlt className="text-purple-500" /> Days per week
              </label>
              <select
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-orange-500 focus:outline-none transition-all font-medium text-slate-800"
                {...register("daysPerWeek", { required: "This is required" })}
              >
                <option value="3">3 Days/Week</option>
                <option value="4">4 Days/Week</option>
                <option value="5">5 Days/Week</option>
                <option value="6">6 Days/Week</option>
              </select>
            </div>

            {/* Tuition Type */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                <FaChalkboardTeacher className="text-teal-500" /> Tuition Type
              </label>
              <select
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-orange-500 focus:outline-none transition-all font-medium text-slate-800"
                {...register("tuitionType", { required: "This is required" })}
              >
                <option value="Home Tuition">Home Tuition</option>
                <option value="Online Tuition">Online Tuition</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
              <FaAlignLeft className="text-blue-400" /> Requirements /
              Description
            </label>
            <textarea
              rows="4"
              placeholder="Detailed requirements for the tutor..."
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-orange-500 focus:outline-none transition-all font-medium text-slate-800 resize-none"
              {...register("description", {
                required: "Description is required",
              })}
            ></textarea>
            {errors.description && (
              <span className="text-xs text-red-500 ml-1">
                {errors.description.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0f172a] hover:bg-orange-500 text-white font-black py-4 rounded-2xl transition-all shadow-xl tracking-widest uppercase text-sm mt-8 disabled:bg-slate-300 flex justify-center items-center gap-2"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Post Tuition"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostNewTuition;
