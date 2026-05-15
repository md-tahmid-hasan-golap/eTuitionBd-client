import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaBookOpen, FaCheckCircle, FaTimesCircle, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageTuitions = () => {
  const axiosSecure = useAxiosSecure();

  const { data: tuitions = [], isPending: isLoading, refetch } = useQuery({
    queryKey: ["admin-tuitions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/admin/all-tuitions-admin");
      return res.data;
    },
  });

  const handleStatusChange = async (id, status) => {
    try {
      const endpoint = status === "Approved" ? `/api/admin/tuition/approve/${id}` : `/api/admin/tuition/reject/${id}`;
      const res = await axiosSecure.patch(endpoint);
      
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Success!",
          text: `Tuition ${status.toLowerCase()} successfully!`,
          icon: "success",
          confirmButtonColor: "#0f172a",
        });
        refetch();
      }
    } catch {
      Swal.fire({
        title: "Error!",
        text: "Failed to update tuition status.",
        icon: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#0f172a",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/api/admin/tuition/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Tuition has been deleted.", "success");
            refetch();
          }
        } catch {
          Swal.fire("Error!", "Failed to delete tuition.", "error");
        }
      }
    });
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
          Manage <span className="text-orange-500">Tuitions</span>
        </h2>
        <p className="text-slate-500 font-medium mt-2">Review and moderate all tuition postings.</p>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest font-black">
              <tr>
                <th className="py-5 px-6">Subject</th>
                <th className="py-5 px-6">Student Email</th>
                <th className="py-5 px-6 text-center">Status</th>
                <th className="py-5 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-700">
              {tuitions.map((tuition) => (
                <tr key={tuition._id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center">
                        <FaBookOpen />
                      </div>
                      <span className="font-bold text-[#0f172a]">{tuition.subject}</span>
                    </div>
                  </td>
                  <td className="py-5 px-6">{tuition.studentEmail || tuition.email}</td>
                  <td className="py-5 px-6 text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      tuition.status === "Approved" ? "bg-emerald-50 text-emerald-600" :
                      tuition.status === "Rejected" ? "bg-red-50 text-red-600" :
                      "bg-orange-50 text-orange-600"
                    }`}>
                      {tuition.status}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {tuition.status === "Pending" && (
                        <>
                          <button onClick={() => handleStatusChange(tuition._id, "Approved")} className="btn btn-sm btn-circle bg-emerald-100 text-emerald-600 hover:bg-emerald-200 border-none" title="Approve">
                            <FaCheckCircle />
                          </button>
                          <button onClick={() => handleStatusChange(tuition._id, "Rejected")} className="btn btn-sm btn-circle bg-red-100 text-red-600 hover:bg-red-200 border-none" title="Reject">
                            <FaTimesCircle />
                          </button>
                        </>
                      )}
                      <button onClick={() => handleDelete(tuition._id)} className="btn btn-sm btn-circle bg-slate-100 text-slate-500 hover:bg-red-500 hover:text-white border-none transition-all" title="Delete">
                        <FaTrashAlt />
                      </button>
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

export default ManageTuitions;
