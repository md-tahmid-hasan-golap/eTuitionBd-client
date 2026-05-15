import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaUserGraduate, FaCheckCircle, FaTimesCircle, FaHourglassHalf } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();

  const { data: applications = [], isPending: isLoading, refetch } = useQuery({
    queryKey: ["admin-applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/admin/all-applications");
      return res.data;
    },
  });

  const handleStatusChange = async (id, status) => {
    try {
      const res = await axiosSecure.patch(`/api/admin/application/status/${id}`, { status });
      
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Success!",
          text: `Application ${status.toLowerCase()} successfully!`,
          icon: "success",
          confirmButtonColor: "#0f172a",
        });
        refetch();
      }
    } catch {
      Swal.fire({
        title: "Error!",
        text: "Failed to update application status.",
        icon: "error",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="mb-10">
        <h2 className="text-4xl font-black text-[#0f172a] tracking-tight italic uppercase">
          Manage <span className="text-orange-500">Applications</span>
        </h2>
        <p className="text-slate-500 font-medium mt-2">Approve or Reject tutor applications before students can see them.</p>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest font-black">
              <tr>
                <th className="py-5 px-6">Tutor Info</th>
                <th className="py-5 px-6">Subject</th>
                <th className="py-5 px-6">Experience</th>
                <th className="py-5 px-6 text-center">Status</th>
                <th className="py-5 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-700">
              {applications.map((app) => (
                <tr key={app._id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-500 flex items-center justify-center">
                        <FaUserGraduate />
                      </div>
                      <div>
                        <p className="font-bold text-[#0f172a]">{app.tutorName}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{app.tutorEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-6 font-bold">{app.tuitionSubject || "Unknown"}</td>
                  <td className="py-5 px-6">{app.experience}</td>
                  <td className="py-5 px-6 text-center">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      app.status === "Approved" ? "bg-emerald-50 text-emerald-600" :
                      app.status === "Accepted" ? "bg-blue-50 text-blue-600" :
                      app.status === "Rejected" ? "bg-red-50 text-red-600" :
                      "bg-orange-50 text-orange-600"
                    }`}>
                      {app.status === "Pending" && <FaHourglassHalf className="animate-spin" />}
                      {app.status}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {app.status === "Pending" && (
                        <>
                          <button onClick={() => handleStatusChange(app._id, "Approved")} className="btn btn-sm bg-emerald-500 hover:bg-emerald-600 text-white border-none rounded-xl font-bold px-4">
                            Approve
                          </button>
                          <button onClick={() => handleStatusChange(app._id, "Rejected")} className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none rounded-xl font-bold px-4">
                            Reject
                          </button>
                        </>
                      )}
                      {(app.status === "Approved" || app.status === "Rejected") && (
                        <span className="text-slate-400 italic text-xs">Moderated</span>
                      )}
                      {app.status === "Accepted" && (
                        <span className="text-blue-500 font-black uppercase text-[10px] tracking-widest">Hired by Student</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageApplications;
