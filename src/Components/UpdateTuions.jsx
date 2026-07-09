import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import {
  FaBook,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaGraduationCap,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaEdit,
} from "react-icons/fa";

const UpdateTuitions = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tuition", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuition/${id}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = async (updatedInfo) => {
    setLoading(true);
    try {
      const res = await axiosSecure.patch(`/api/student/update-tuition/${id}`, updatedInfo);
      if (res.data.modifiedCount > 0) {
        toast.success("Tuition Updated Successfully! 🚀");
        navigate("/dashboard/my-tuitions"); // আপডেট শেষে মাই টিউশন পেজে নিয়ে যাবে
      } else {
        toast.error("No changes made.");
      }
    } catch {
      toast.error("Failed to update tuition!");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError || !data)
    return <div className="text-center py-10 text-red-500">Error fetching data</div>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-slate-50 dark:border-slate-800">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-[#0f172a] italic">
            Update <span className="text-orange-500">Tuition Post</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Modify your tuition requirements</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Subject */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                <FaBook className="text-orange-500" /> Subject
              </label>
              <select
                defaultValue={data?.subject}
                {...register("subject", { required: "Select a subject" })}
                className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-orange-500 focus:outline-none"
              >
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="English">English</option>
                <option value="ICT">ICT</option>
                <option value="All Subjects">All Subjects</option>
              </select>
            </div>

            {/* Class */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                <FaGraduationCap className="text-orange-500" /> Class / Level
              </label>
              <select
                defaultValue={data?.class}
                {...register("class", { required: "Select a class" })}
                className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-orange-500 focus:outline-none"
              >
                <option value="Class 1-5">Class 1-5</option>
                <option value="Class 6-8">Class 6-8</option>
                <option value="Class 9-10">Class 9-10</option>
                <option value="HSC">HSC</option>
                <option value="Admission">Admission</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tuition Type */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                <FaChalkboardTeacher className="text-orange-500" /> Tuition Type
              </label>
              <select
                defaultValue={data?.tuitionType}
                {...register("tuitionType")}
                className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-orange-500 focus:outline-none"
              >
                <option value="Home Tuition">Home Tuition (Offline)</option>
                <option value="Online Tuition">Online Tuition</option>
                <option value="Group Tuition">Group Tuition</option>
              </select>
            </div>

            {/* Salary */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                <FaMoneyBillWave className="text-orange-500" /> Monthly Salary
              </label>
              <input
                type="number"
                defaultValue={data?.salary}
                className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-orange-500 focus:outline-none"
                {...register("salary", { required: "Required" })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Days per Week */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                <FaCalendarAlt className="text-orange-500" /> Days per Week
              </label>
              <select
                defaultValue={data?.daysPerWeek}
                {...register("daysPerWeek")}
                className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-orange-500 focus:outline-none"
              >
                <option value="2 Days">2 Days</option>
                <option value="3 Days">3 Days</option>
                <option value="4 Days">4 Days</option>
                <option value="5 Days">5 Days</option>
              </select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                <FaMapMarkerAlt className="text-orange-500" /> Location
              </label>
              <input
                type="text"
                defaultValue={data?.location}
                className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-orange-500 focus:outline-none"
                {...register("location", { required: "Required" })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Details & Preferences</label>
            <textarea
              rows="3"
              defaultValue={data?.description}
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-orange-500 focus:outline-none"
              {...register("description")}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0f172a] hover:bg-orange-600 text-white font-black py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 uppercase tracking-widest"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <>
                <FaEdit /> Update Post
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTuitions;
