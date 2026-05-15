import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../firebase/AuthContext";
import { FaGraduationCap, FaEnvelope, FaCalendarCheck } from "react-icons/fa";

const OngoingTuitions = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: tuitions = [], isPending: isLoading, isError } = useQuery({
    queryKey: ["ongoing-tuitions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/tutor/ongoing-tuitions/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="mb-10">
        <h2 className="text-4xl font-black text-[#0f172a] tracking-tight italic uppercase">
          Ongoing <span className="text-blue-500">Tuitions</span>
        </h2>
        <p className="text-slate-500 font-medium mt-2">Manage your currently active tuitions and students.</p>
      </div>

      {isError ? (
        <div className="text-center py-20 bg-white rounded-[2.5rem] border border-red-100 shadow-sm">
          <p className="text-red-500 text-xl font-bold italic">Failed to load ongoing tuitions.</p>
        </div>
      ) : tuitions.length === 0 ? (
        <div className="bg-white p-20 rounded-[3rem] border-2 border-dashed border-slate-200 text-center">
          <FaGraduationCap className="mx-auto text-slate-200 text-7xl mb-6" />
          <h3 className="text-2xl font-black text-slate-400 uppercase italic">No active tuitions</h3>
          <p className="text-slate-400 mt-2 font-medium">Wait for students to accept your applications.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tuitions.map((tuition) => (
            <div key={tuition._id} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-2 rounded-bl-2xl font-black text-[10px] uppercase tracking-widest shadow-lg">
                Active
              </div>
              
              <div className="flex items-center gap-4 mb-6 pt-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-xl font-black text-slate-600">
                  <FaGraduationCap />
                </div>
                <div>
                  <h4 className="text-lg font-black text-[#0f172a] line-clamp-1">{tuition.tuitionSubject || "Unknown Subject"}</h4>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1 mt-1">
                    <FaEnvelope /> {tuition.studentEmail || "Student Contact"}
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex items-center gap-3">
                <FaCalendarCheck className="text-blue-500 text-2xl" />
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hired On</p>
                  <p className="text-sm font-bold text-[#0f172a]">{new Date(tuition.appliedAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OngoingTuitions;
