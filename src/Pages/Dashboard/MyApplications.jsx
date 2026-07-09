import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../firebase/AuthContext";
import { FaBookOpen, FaMoneyBillWave, FaClock, FaCheckCircle, FaHourglassHalf, FaTimesCircle, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const MyApplications = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: applications = [], isPending: isLoading, isError, refetch } = useQuery({
    queryKey: ["my-applications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/tutor/my-applications/${user?.email}`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Delete Application?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#64748B",
      confirmButtonText: "Yes, Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/api/tutor/application/${id}`);
          refetch();
          Swal.fire("Deleted!", "Application has been removed.", "success");
        } catch {
          Swal.fire("Error", "Failed to delete application", "error");
        }
      }
    });
  };

  const handleEdit = (app) => {
    Swal.fire({
      title: "Edit Application",
      html: `
        <div class="space-y-4 p-4">
          <input id="swal-salary" class="swal2-input w-full rounded-2xl" placeholder="Expected Salary" value="${app.expectedSalary}">
          <textarea id="swal-experience" class="swal2-textarea w-full rounded-2xl" placeholder="Experience Details">${app.experience}</textarea>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Update",
      confirmButtonColor: "#3B82F6",
      preConfirm: () => {
        return {
          expectedSalary: document.getElementById('swal-salary').value,
          experience: document.getElementById('swal-experience').value
        }
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/api/tutor/application/edit/${app._id}`, result.value);
          refetch();
          Swal.fire("Updated!", "Application details updated.", "success");
        } catch {
          Swal.fire("Error", "Failed to update application", "error");
        }
      }
    });
  };

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
          My <span className="text-blue-500">Applications</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">Track the status of all tuitions you have applied for.</p>
      </div>

      {isError ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-red-100 dark:border-red-900/50 shadow-sm">
          <p className="text-red-500 text-xl font-bold italic">Failed to load applications.</p>
        </div>
      ) : applications.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 p-20 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-700 text-center">
          <FaBookOpen className="mx-auto text-slate-200 text-7xl mb-6" />
          <h3 className="text-2xl font-black text-slate-400 uppercase italic">No applications yet</h3>
          <p className="text-slate-400 mt-2 font-medium">Browse available tuitions and start applying.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {applications.map((app) => (
            <div key={app._id} className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-xl font-black text-blue-600">
                  <FaBookOpen />
                </div>
                <div>
                  <h4 className="text-lg font-black text-[#0f172a] line-clamp-1">{app.tuitionSubject || "Unknown Subject"}</h4>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{new Date(app.appliedAt).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4 mb-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 group-hover:bg-white dark:bg-slate-900 transition-colors">
                    <div className="flex items-center gap-3 text-emerald-500 mb-1">
                      <FaMoneyBillWave size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Expected</span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 font-bold">{app.expectedSalary} BDT</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 group-hover:bg-white dark:bg-slate-900 transition-colors">
                    <div className="flex items-center gap-3 text-blue-500 mb-1">
                      <FaClock size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Experience</span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 font-bold truncate">{app.experience}</p>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-auto">
                {app.status === "Accepted" ? (
                  <div className="w-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 font-black py-4 rounded-2xl flex items-center justify-center gap-2 uppercase text-[10px] tracking-[0.2em] border border-emerald-100 dark:border-emerald-900/50">
                    <FaCheckCircle /> Hired by Student
                  </div>
                ) : app.status === "Approved" ? (
                  <div className="w-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 font-black py-4 rounded-2xl flex items-center justify-center gap-2 uppercase text-[10px] tracking-[0.2em] border border-blue-100 dark:border-blue-900/50">
                    <FaCheckCircle /> Approved - Waiting for Student
                  </div>
                ) : app.status === "Rejected" ? (
                  <div className="w-full bg-red-50 dark:bg-red-900/30 text-red-600 font-black py-4 rounded-2xl flex items-center justify-center gap-2 uppercase text-[10px] tracking-[0.2em] border border-red-100 dark:border-red-900/50">
                    <FaTimesCircle /> Rejected
                  </div>
                ) : (
                  <div className="w-full bg-orange-50 dark:bg-orange-900/30 text-orange-600 font-black py-4 rounded-2xl flex items-center justify-center gap-2 uppercase text-[10px] tracking-[0.2em] border border-orange-100 dark:border-orange-900/50">
                    <FaHourglassHalf className="animate-spin" /> Pending Admin Approval
                  </div>
                )}
              </div>

              {/* Action Buttons (Only for Pending) */}
              {app.status === "Pending" && (
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(app)}
                    className="flex-1 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-xs hover:bg-blue-50 dark:bg-blue-900/30 hover:text-blue-600 transition-all border border-slate-100 dark:border-slate-700"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(app._id)}
                    className="flex-1 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-xs hover:bg-red-50 dark:bg-red-900/30 hover:text-red-600 transition-all border border-slate-100 dark:border-slate-700"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
