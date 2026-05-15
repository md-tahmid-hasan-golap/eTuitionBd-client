import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../firebase/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useRole from "../Hooks/useRole";
import {
  FaUserEdit,
  FaEnvelope,
  FaIdBadge,
  FaImage,
  FaCheckCircle,
  FaPhoneAlt,
  FaGraduationCap,
  FaInfoCircle,
} from "react-icons/fa";
import toast from "react-hot-toast";
import Aos from "aos";
import "aos/dist/aos.css";

const MyProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [role, isRoleLoading] = useRole();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "My Profile | eTuitionBD";
    Aos.init({ duration: 800, once: true });
  }, []);

  const {
    data: dbUser,
    refetch,
    isPending: isUserLoading,
  } = useQuery({
    queryKey: ["user-profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}`);
      return res.data;
    },
  });

  // Profile Update Handler
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const phone = form.phone.value;
    const qualifications = form.qualifications.value;
    const bio = form.bio.value;

    try {
      // 1. Update Firebase Auth Profile (Name and Photo)
      await updateUserProfile({ displayName: name, photoURL: photo });

      // 2. Update Database Profile
      const updateData = { name, photoUrl: photo, phone, qualifications, bio };
      await axiosSecure.patch(`/user/${user?.email}`, updateData);

      toast.success("Profile Updated Successfully! 🎉");
      refetch();
      setIsModalOpen(false); // Close Modal
    } catch {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const roleColor =
    role?.toLowerCase() === "tutor" ? "text-blue-600 bg-blue-50" : "text-orange-600 bg-orange-50";
  const badgeColor = role?.toLowerCase() === "tutor" ? "bg-blue-500" : "bg-orange-500";

  return (
    <div className="min-h-screen bg-[#fcfcfd] py-12 px-6 relative">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-10 flex justify-between items-end" data-aos="fade-down">
          <div>
            <h2 className="text-3xl font-black text-[#0f172a] tracking-tight">
              My <span className="text-orange-500">Profile</span>
            </h2>
            <p className="text-slate-500 font-medium mt-1">Manage your personal information.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#0f172a] hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg"
          >
            <FaUserEdit /> Edit Profile
          </button>
        </div>

        {isUserLoading || isRoleLoading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg text-orange-500"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side: User Avatar */}
            <div className="lg:col-span-1" data-aos="fade-right">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-100/20 border border-slate-50 flex flex-col items-center">
                <div className="relative group">
                  <div
                    className={`absolute inset-0 ${badgeColor} rounded-full blur-xl opacity-20 transition-opacity`}
                  ></div>
                  <img
                    src={user?.photoURL || "https://i.ibb.co/vBR649p/user-placeholder.png"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md relative z-10"
                  />
                </div>
                <h3 className="mt-6 text-xl font-black text-[#0f172a] text-center">
                  {user?.displayName || "Guest User"}
                </h3>
                <p
                  className={`text-xs font-bold px-4 py-1 rounded-full mt-2 uppercase tracking-widest ${roleColor}`}
                >
                  {role || "Student"}
                </p>
              </div>
            </div>

            {/* Right Side: Details */}
            <div className="lg:col-span-2 space-y-6" data-aos="fade-left">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-100/20 border border-slate-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InfoBox
                    icon={<FaIdBadge />}
                    label="Full Name"
                    value={user?.displayName || "N/A"}
                  />
                  <InfoBox
                    icon={<FaEnvelope />}
                    label="Email Address"
                    value={user?.email || "N/A"}
                  />
                  <InfoBox
                    icon={<FaPhoneAlt />}
                    label="Phone Number"
                    value={dbUser?.phone || "Not Set"}
                  />
                  <InfoBox
                    icon={<FaCheckCircle />}
                    label="Status"
                    value="Verified User"
                    color="text-green-600"
                  />
                </div>

                {role?.toLowerCase() === "tutor" && (
                  <div className="mt-8 space-y-6 pt-6 border-t border-slate-100">
                    <div>
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-2">
                        <FaGraduationCap className="text-blue-500" /> Qualifications
                      </h4>
                      <p className="text-sm font-medium text-slate-700 bg-slate-50 p-4 rounded-xl">
                        {dbUser?.qualifications || "No qualifications added yet."}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-2">
                        <FaInfoCircle className="text-orange-500" /> Bio / About Me
                      </h4>
                      <p className="text-sm font-medium text-slate-700 bg-slate-50 p-4 rounded-xl leading-relaxed">
                        {dbUser?.bio || "Write a short bio about yourself..."}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- EDIT PROFILE MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-10 bg-[#0f172a]/40 backdrop-blur-sm overflow-y-auto">
          <div
            className="bg-white w-full max-w-lg p-8 rounded-[2.5rem] shadow-2xl relative animate-in fade-in zoom-in duration-300 my-auto"
            data-aos="zoom-in"
          >
            <h3 className="text-2xl font-black text-[#0f172a] mb-2">Update Profile</h3>
            <p className="text-slate-500 text-sm mb-6">
              Change your personal and professional details.
            </p>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <FaIdBadge className="absolute left-4 top-4 text-slate-300" />
                    <input
                      name="name"
                      required
                      defaultValue={user?.displayName}
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:border-orange-500 focus:outline-none transition-all text-sm font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <FaPhoneAlt className="absolute left-4 top-4 text-slate-300" />
                    <input
                      name="phone"
                      defaultValue={dbUser?.phone}
                      placeholder="e.g. +880170000000"
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:border-orange-500 focus:outline-none transition-all text-sm font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Photo URL
                </label>
                <div className="relative">
                  <FaImage className="absolute left-4 top-4 text-slate-300" />
                  <input
                    name="photo"
                    required
                    defaultValue={user?.photoURL}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:border-orange-500 focus:outline-none transition-all text-sm font-medium"
                  />
                </div>
              </div>

              {role?.toLowerCase() === "tutor" && (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                      Qualifications
                    </label>
                    <textarea
                      name="qualifications"
                      rows="2"
                      defaultValue={dbUser?.qualifications}
                      placeholder="e.g. BSc in CS from BUET..."
                      className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:border-orange-500 focus:outline-none transition-all text-sm font-medium resize-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                      Bio / About Me
                    </label>
                    <textarea
                      name="bio"
                      rows="3"
                      defaultValue={dbUser?.bio}
                      placeholder="Write something about yourself..."
                      className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:border-orange-500 focus:outline-none transition-all text-sm font-medium resize-none"
                    />
                  </div>
                </>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3.5 rounded-2xl font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3.5 rounded-2xl font-bold text-white bg-[#0f172a] hover:bg-orange-500 transition-all shadow-lg"
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable Info Component
const InfoBox = ({ icon, label, value, color = "text-[#0f172a]" }) => (
  <div className="space-y-1">
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</p>
    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-transparent">
      <span className="text-orange-500 text-lg">{icon}</span>
      <p className={`font-bold text-sm truncate ${color}`}>{value}</p>
    </div>
  </div>
);

export default MyProfile;
