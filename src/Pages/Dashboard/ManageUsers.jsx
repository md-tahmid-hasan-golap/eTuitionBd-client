import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaUserShield, FaUserGraduate, FaUser, FaTrashAlt, FaEdit, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], isPending: isLoading, refetch } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/admin/all-users");
      return res.data;
    },
  });

  const handleRoleChange = async (id, role) => {
    try {
      const res = await axiosSecure.patch(`/api/admin/user/role/${id}`, { role });
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Role Updated!",
          text: `User is now a ${role}.`,
          icon: "success",
          confirmButtonColor: "#0f172a",
        });
        refetch();
      }
    } catch {
      Swal.fire("Error!", "Failed to update user role.", "error");
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#0f172a",
      confirmButtonText: "Yes, delete user!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/api/admin/user/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "User has been deleted.", "success");
            refetch();
          }
        } catch {
          Swal.fire("Error!", "Failed to delete user.", "error");
        }
      }
    });
  };

  const handleEditUser = (user) => {
    Swal.fire({
      title: `<span class="text-2xl font-black uppercase italic tracking-tight">Edit <span class="text-orange-500">User</span></span>`,
      html: `
        <div class="space-y-4 text-left p-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-1">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
              <input id="swal-name" class="swal2-input !m-0 !w-full rounded-2xl border-slate-200 text-sm font-bold" value="${user.name || ''}" placeholder="John Doe">
            </div>
            <div class="space-y-1">
              <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
              <input id="swal-phone" class="swal2-input !m-0 !w-full rounded-2xl border-slate-200 text-sm font-bold" value="${user.phone || ''}" placeholder="01XXXXXXXXX">
            </div>
          </div>
          <div class="space-y-1">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Profile Image URL</label>
            <input id="swal-image" class="swal2-input !m-0 !w-full rounded-2xl border-slate-200 text-sm font-bold" value="${user.photoUrl || ''}" placeholder="https://example.com/photo.jpg">
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Account Status</label>
                <select id="swal-status" class="swal2-select !m-0 !w-full rounded-2xl border-slate-200 text-sm font-bold">
                  <option value="Active" ${user.status === 'Active' ? 'selected' : ''}>Active</option>
                  <option value="Blocked" ${user.status === 'Blocked' ? 'selected' : ''}>Blocked</option>
                </select>
            </div>
            <div class="space-y-1">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Verification</label>
                <select id="swal-verified" class="swal2-select !m-0 !w-full rounded-2xl border-slate-200 text-sm font-bold">
                  <option value="true" ${user.isVerified ? 'selected' : ''}>Verified</option>
                  <option value="false" ${!user.isVerified ? 'selected' : ''}>Not Verified</option>
                </select>
            </div>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Update Profile",
      confirmButtonColor: "#0f172a",
      cancelButtonText: "Cancel",
      preConfirm: () => {
        return {
          name: document.getElementById('swal-name').value,
          phone: document.getElementById('swal-phone').value,
          photoUrl: document.getElementById('swal-image').value,
          status: document.getElementById('swal-status').value,
          isVerified: document.getElementById('swal-verified').value === "true"
        }
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/api/admin/user/details/${user._id}`, result.value);
          if (res.data.modifiedCount > 0) {
            Swal.fire("Updated!", "User details have been updated.", "success");
            refetch();
          }
        } catch {
          Swal.fire("Error!", "Failed to update user details.", "error");
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
          Manage <span className="text-orange-500">Users</span>
        </h2>
        <p className="text-slate-500 font-medium mt-2">Manage roles and accounts for all platform users.</p>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest font-black">
              <tr>
                <th className="py-5 px-6">Name</th>
                <th className="py-5 px-6">Email</th>
                <th className="py-5 px-6 text-center">Role</th>
                <th className="py-5 px-6 text-center">Status</th>
                <th className="py-5 px-6 text-center">Account</th>
                <th className="py-5 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-700">
              {users.map((user) => (
                <tr key={user._id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-10 h-10">
                          <img src={user.photoUrl || user.photo || "https://i.ibb.co/vBR649p/user-placeholder.png"} alt="User" />
                        </div>
                      </div>
                      <span className="font-bold text-[#0f172a]">{user.name || "Unknown"}</span>
                    </div>
                  </td>
                  <td className="py-5 px-6">{user.email}</td>
                  <td className="py-5 px-6 text-center">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      user.role?.toLowerCase() === "admin" ? "bg-purple-50 text-purple-600" :
                      user.role?.toLowerCase() === "tutor" ? "bg-blue-50 text-blue-600" :
                      "bg-orange-50 text-orange-600"
                    }`}>
                      {user.role?.toLowerCase() === "admin" ? <FaUserShield /> : user.role?.toLowerCase() === "tutor" ? <FaUserGraduate /> : <FaUser />}
                      {user.role || "Student"}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-center">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      user.isVerified ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-400"
                    }`}>
                      {user.isVerified ? <FaCheckCircle /> : <FaTimesCircle />}
                      {user.isVerified ? "Verified" : "Unverified"}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-center">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      user.status === 'Blocked' ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"
                    }`}>
                      {user.status || 'Active'}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => handleEditUser(user)} className="btn btn-sm btn-circle bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border-none transition-all" title="Edit Details">
                        <FaEdit />
                      </button>
                      {user.role?.toLowerCase() !== "admin" && (
                        <button onClick={() => handleRoleChange(user._id, "Admin")} className="btn btn-xs bg-purple-100 text-purple-600 hover:bg-purple-200 border-none">
                          Make Admin
                        </button>
                      )}
                      {user.role?.toLowerCase() !== "tutor" && (
                        <button onClick={() => handleRoleChange(user._id, "Tutor")} className="btn btn-xs bg-blue-100 text-blue-600 hover:bg-blue-200 border-none">
                          Make Tutor
                        </button>
                      )}
                      <button onClick={() => handleDelete(user._id)} className="btn btn-sm btn-circle bg-slate-100 text-slate-500 hover:bg-red-500 hover:text-white border-none ml-2 transition-all" title="Delete User">
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

export default ManageUsers;
