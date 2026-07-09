import React, { useContext } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBookOpen,
  FaSearchLocation,
  FaSignOutAlt,
  FaBars,
  FaUserCircle,
  FaPlusCircle,
  FaUsers,
  FaFileInvoiceDollar,
  FaChartLine,
  FaUserGraduate,
  FaHistory,
} from "react-icons/fa";
import { AuthContext } from "../firebase/AuthContext";
import toast from "react-hot-toast";
import useRole from "../Hooks/useRole";
import ThemeToggle from "../Components/ThemeToggle";

const DashboardLayouts = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOutUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await signOutUser();
      toast.success("Logout successful! ✅");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Logout failed");
    }
  };

  const [role] = useRole();
  const isAdmin = role === "admin";
  const isTutor = role === "tutor";

  // সব ধরনের মেনু আইটেম এখানে যোগ করা হয়েছে
  const commonMenu = [
    {
      name: "My Profile ",
      path: "/dashboard/my-profile",
      icon: <FaUserCircle />,
    },
  ];

  const studentMenu = [
    {
      name: "My Tuitions",
      path: "/dashboard/my-tuitions",
      icon: <FaUserGraduate />,
    },
    {
      name: "Post New Tuition",
      path: "/dashboard/post-tuition",
      icon: <FaPlusCircle />,
    },
    {
      name: "Applied Tutors",
      path: "/dashboard/applied-tutors",
      icon: <FaUsers />,
    },
    {
      name: "Payments",
      path: "/dashboard/payments",
      icon: <FaFileInvoiceDollar />,
    },
  ];

  const tutorMenu = [
    {
      name: "My Applications",
      path: "/dashboard/my-applications",
      icon: <FaBookOpen />,
    },
    {
      name: "Ongoing Tuitions",
      path: "/dashboard/ongoing-tuitions",
      icon: <FaHistory />,
    },
    {
      name: "Revenue History",
      path: "/dashboard/revenue",
      icon: <FaChartLine />,
    },
  ];

  const adminMenu = [
    {
      name: "Admin Home",
      path: "/dashboard/stats",
      icon: <FaChartLine />,
    },
    {
      name: "Manage Users",
      path: "/dashboard/manage-users",
      icon: <FaUsers />,
    },
    {
      name: "Manage Applications",
      path: "/dashboard/manage-applications",
      icon: <FaHistory />,
    },
    {
      name: "Manage Tuitions",
      path: "/dashboard/manage-tuitions",
      icon: <FaBookOpen />,
    },
  ];

  const sharedMenu = [{ name: "Browse Tuitions", path: "/tuitions", icon: <FaSearchLocation /> }];

  let menuItems = [];
  if (isAdmin) menuItems = [...commonMenu, ...adminMenu, ...sharedMenu];
  else if (isTutor) menuItems = [...commonMenu, ...tutorMenu, ...sharedMenu];
  else menuItems = [...commonMenu, ...studentMenu, ...sharedMenu];

  return (
    <div className="bg-[#fcfcfd] dark:bg-slate-900 min-h-screen font-sans text-slate-800 dark:text-slate-200">
      <div className="drawer lg:drawer-open">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

        {/* --- Main Content Area --- */}
        <div className="drawer-content flex flex-col">
          <header className="navbar bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 px-6 py-4 sticky top-0 z-30 shadow-sm">
            <div className="flex-none lg:hidden">
              <label htmlFor="dashboard-drawer" className="btn btn-ghost btn-square text-[#0f172a] dark:text-slate-200">
                <FaBars size={20} />
              </label>
            </div>

            <div className="flex-1 px-2">
              <h2 className="font-black text-[#0f172a] dark:text-slate-100 text-lg tracking-tight uppercase">
                {user?.displayName?.split(" ")[0] || "User"}'s{" "}
                <span className="text-orange-500">Panel</span>
              </h2>
            </div>

            <div className="flex gap-4 items-center">
              <ThemeToggle />
              <Link
                to="/"
                className="btn btn-sm btn-ghost rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-orange-500 hidden md:flex"
              >
                <FaHome /> Main Site
              </Link>
              <div className="flex items-center gap-3 ml-2 border-l pl-4 border-slate-100 dark:border-slate-700">
                <img
                  src={user?.photoURL || "https://i.ibb.co/vBR649p/user-placeholder.png"}
                  className="w-10 h-10 rounded-full border-2 border-orange-500 object-cover"
                  alt="User"
                />
              </div>
            </div>
          </header>

          <main className="p-6 md:p-8 flex-1">
            <div className="max-w-6xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>

        {/* --- Sidebar --- */}
        <div className="drawer-side z-40">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <div className="bg-[#0f172a] text-white min-h-full w-72 flex flex-col shadow-2xl">
            {/* Branding */}
            <div className="p-8">
              <Link to="/" className="text-2xl font-black tracking-tighter">
                eTuition<span className="text-orange-500">Bd</span>
              </Link>
              <p className="text-[10px] text-slate-400 font-bold tracking-[0.3em] uppercase mt-1">
                Dashboard
              </p>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-grow px-4 overflow-y-auto">
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl font-bold transition-all duration-300 ${
                        location.pathname === item.path
                          ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                          : "text-slate-400 hover:bg-white/5 dark:bg-slate-800/30 hover:text-white"
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm tracking-wide">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Logout Section */}
            <div className="p-6 border-t border-white/5">
              <button
                onClick={handleLogout}
                className="group flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-red-400 hover:bg-red-500/10 transition-all w-full"
              >
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                  <FaSignOutAlt className="text-lg" />
                </div>
                <div className="text-left">
                  <span className="block text-xs font-black uppercase tracking-widest">Logout</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayouts;
