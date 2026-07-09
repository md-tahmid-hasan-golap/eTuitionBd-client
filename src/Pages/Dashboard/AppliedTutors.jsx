import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../firebase/AuthContext";
import { FaUserGraduate, FaMoneyBillWave, FaClock, FaCheckCircle, FaCreditCard, FaTimesCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const AppliedTutors = () => {
  const { tuitionId } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: applications = [], isPending: isLoading, refetch } = useQuery({
    queryKey: ["applied-tutors", tuitionId || "all", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      if (tuitionId) {
        const res = await axiosSecure.get(`/api/student/applied-tutors/${tuitionId}`);
        return res.data;
      } else {
        const res = await axiosSecure.get(`/api/student/applications/student/${user?.email}`);
        return res.data;
      }
    },
  });

  const handleReject = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to reject this tutor application?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#64748B",
      confirmButtonText: "Yes, Reject",
      background: "#fff",
      customClass: {
        title: "font-black text-slate-800 dark:text-slate-200",
        confirmButton: "rounded-2xl px-6 py-3",
        cancelButton: "rounded-2xl px-6 py-3",
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/api/student/application/reject/${id}`);
          refetch();
          Swal.fire({
            title: "Rejected!",
            text: "Application has been rejected.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch {
          Swal.fire("Error", "Failed to reject application", "error");
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="mb-10">
        <h2 className="text-4xl font-black text-[#0f172a] tracking-tight italic uppercase">
          Tutor <span className="text-orange-500">Applications</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">Review and hire the best tutor for your tuition.</p>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 p-20 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-700 text-center">
          <FaUserGraduate className="mx-auto text-slate-200 text-7xl mb-6" />
          <h3 className="text-2xl font-black text-slate-400 uppercase italic">No applications yet</h3>
          <p className="text-slate-400 mt-2 font-medium">Wait for tutors to find your post.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {applications.map((app) => (
            <div key={app._id} className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center text-2xl font-black text-orange-600">
                  {app.tutorName?.[0] || "T"}
                </div>
                <div>
                  <h4 className="text-xl font-black text-[#0f172a]">{app.tutorName}</h4>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{app.tutorEmail}</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4 mb-8">
                {app.tuitionSubject && (
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 group-hover:bg-white dark:bg-slate-900 transition-colors">
                    <div className="flex items-center gap-3 text-purple-500 mb-1">
                      <FaUserGraduate size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Subject</span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 font-bold">{app.tuitionSubject}</p>
                  </div>
                )}
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 group-hover:bg-white dark:bg-slate-900 transition-colors">
                  <div className="flex items-center gap-3 text-orange-500 mb-1">
                    <FaUserGraduate size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Qualifications</span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 font-bold line-clamp-2">{app.qualifications}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 group-hover:bg-white dark:bg-slate-900 transition-colors">
                    <div className="flex items-center gap-3 text-blue-500 mb-1">
                      <FaClock size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Experience</span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 font-bold">{app.experience}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 group-hover:bg-white dark:bg-slate-900 transition-colors">
                    <div className="flex items-center gap-3 text-emerald-500 mb-1">
                      <FaMoneyBillWave size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Salary</span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 font-bold">{app.expectedSalary} BDT</p>
                  </div>
                </div>
              </div>

              {/* Footer / Actions */}
              <div>
                {app.status === "Accepted" ? (
                  <div className="w-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 font-black py-4 rounded-2xl flex items-center justify-center gap-2 uppercase text-[10px] tracking-[0.2em] border border-emerald-100 dark:border-emerald-900/50">
                    <FaCheckCircle /> Hired Successfully
                  </div>
                ) : app.status === "Rejected" ? (
                   <div className="w-full bg-red-50 dark:bg-red-900/30 text-red-600 font-black py-4 rounded-2xl flex items-center justify-center gap-2 uppercase text-[10px] tracking-[0.2em] border border-red-100 dark:border-red-900/50">
                    Application Rejected
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <Link
                      to={`/dashboard/payment/${app._id}`}
                      className="flex-1 bg-[#0f172a] hover:bg-orange-500 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 uppercase text-[10px] tracking-widest transition-all shadow-lg shadow-blue-900/10"
                    >
                      <FaCreditCard /> Hire
                    </Link>
                    <button
                      onClick={() => handleReject(app._id)}
                      className="w-12 h-14 rounded-2xl bg-red-50 dark:bg-red-900/30 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all border border-red-100 dark:border-red-900/50"
                      title="Reject Application"
                    >
                      <FaTimesCircle size={20} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedTutors;
