import React, { useContext } from "react";
import { AuthContext } from "../firebase/AuthContext";
import TuitionsCard from "../Components/TuitionsCard";
import { FaFolderOpen, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2"; // SweetAlert2 ইম্পোর্ট করুন
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const MyTuitions = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: myTuitions = [],
    isPending: loading,
    isError,
    refetch
  } = useQuery({
    queryKey: ["my-tuitions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/student/my-tuitions/${user?.email}`);
      console.log('MyTuitions Data:', res.data);
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/api/student/delete-tuition/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.deletedCount > 0) {
        Swal.fire({
          title: "Deleted!",
          text: "Your tuition post has been deleted.",
          icon: "success",
          confirmButtonColor: "#10b981",
          customClass: {
            popup: "rounded-[2rem]",
          },
        });
        queryClient.invalidateQueries(["my-tuitions", user?.email]);
      }
    },
    onError: (err) => {
      toast.error("Something went wrong!");
      console.error(err);
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: "#ffffff",
      customClass: {
        popup: "rounded-[2rem]",
        confirmButton: "rounded-xl px-6 py-3 font-bold",
        cancelButton: "rounded-xl px-6 py-3 font-bold",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-black text-[#0f172a] italic uppercase tracking-tighter">
            My <span className="text-orange-500">Postings</span>
          </h2>
          <p className="text-slate-500 mt-2 font-medium">Manage your tuition posts here.</p>
        </div>
        <Link
          to="/dashboard/post-tuition"
          className="flex items-center gap-2 bg-[#0f172a] text-white px-6 py-3 rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-lg active:scale-95 text-sm uppercase tracking-widest"
        >
          <FaPlus /> Post New Tuition
        </Link>
      </div>

      {/* Tuition Cards Grid */}
      {loading && user?.email ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm animate-pulse">
              <div className="h-40 bg-slate-200 rounded-[2rem] mb-6"></div>
              <div className="h-6 bg-slate-200 rounded-full w-3/4 mb-4"></div>
              <div className="h-4 bg-slate-200 rounded-full w-1/2 mb-8"></div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-20 bg-white rounded-[2.5rem] border border-red-100 shadow-sm flex flex-col items-center gap-4">
          <p className="text-red-500 text-xl font-bold italic">Oops! Couldn't load your postings.</p>
          <button onClick={() => refetch()} className="btn bg-red-500 hover:bg-red-600 text-white rounded-xl px-8">Retry</button>
        </div>
      ) : myTuitions?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myTuitions.map((tuition) => (
            <TuitionsCard
              key={tuition._id}
              tuition={tuition}
              isDashboard={true}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-200 shadow-sm">
          <FaFolderOpen className="text-slate-200 text-8xl mb-6" />
          <h3 className="text-2xl font-black text-slate-400 italic uppercase">No Data Found</h3>
        </div>
      )}
    </div>
  );
};

export default MyTuitions;
