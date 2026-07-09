import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logos from "../../src/assets/banner/image-5.jpg";
import { AuthContext } from "../firebase/AuthContext";
import toast from "react-hot-toast";
import {
  LuLayoutDashboard,
  LuLogOut,
  LuUser,
  LuBookOpen,
  LuUsers,
} from "react-icons/lu";
import useRole from "../Hooks/useRole";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [role] = useRole();

  const handleLogout = async () => {
    try {
      await signOutUser();
      toast.success("Logout successful! ✅");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const navLinks = (
    <>
      {[
        { path: "/", name: "Home" },
        { path: "/tuitions", name: "Tuitions" },
        { path: "/tutors", name: "Tutors" },
        { path: "/about", name: "About" },
        { path: "/contact", name: "Contact" },
      ].map((link, idx) => (
        <li key={idx}>
          <NavLink
            to={link.path}
            className={({ isActive }) =>
              `relative px-3 py-2 text-sm font-medium transition-all duration-300 ${isActive
                ? "text-blue-700 dark:text-blue-400 font-bold"
                : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-700 rounded-full"></span>
                )}
              </>
            )}
          </NavLink>
        </li>
      ))}
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 shadow-sm">
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
        {/* Left: Logo & Mobile Toggle */}
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden p-2 mr-2 dark:text-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-white dark:bg-slate-800 rounded-box w-56 border border-gray-100 dark:border-slate-700"
            >
              {navLinks}
            </ul>
          </div>

          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 overflow-hidden rounded-xl border-2 border-blue-900 group-hover:rotate-6 transition-transform">
              <img
                src={logos}
                alt="logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tight text-blue-900 dark:text-blue-100">
              eTuition<span className="text-orange-500">Bd</span>
            </span>
          </Link>
        </div>

        {/* Center: Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-1">{navLinks}</ul>
        </div>

        {/* Right: Auth Buttons / Profile */}
        <div className="navbar-end gap-3 flex items-center">
          <ThemeToggle />
          {!user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="hidden sm:inline-block px-4 py-2 text-sm font-semibold text-blue-900 dark:text-blue-100 hover:text-blue-700 dark:hover:text-blue-300 transition"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-blue-900 hover:bg-blue-800  text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                Join Now
              </Link>
            </div>
          ) : (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar online p-0 border-2 border-blue-100 dark:border-blue-900/50 hover:border-blue-400"
              >
                <div className="w-10 rounded-full">
                  <img
                    src={user.photoURL || "https://i.ibb.co/9yKzK1L/user.png"}
                    alt="User Profile"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content bg-white dark:bg-slate-800 rounded-2xl w-64 border border-gray-100 dark:border-slate-700"
              >
                <li className="px-4 py-3 border-b border-gray-50 dark:border-slate-700 mb-2">
                  <p className="font-bold text-blue-900 dark:text-blue-100 text-base">
                    {user.displayName || "User Name"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                  <div className="badge badge-primary badge-outline mt-2 text-[10px] uppercase font-bold tracking-wider">
                    {role || "Student"}
                  </div>
                </li>

                <li>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-3 py-3 hover:bg-blue-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 rounded-lg"
                  >
                    <LuLayoutDashboard className="text-blue-600 text-lg" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile-settings"
                    className="flex items-center gap-3 py-3 hover:bg-blue-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 rounded-lg"
                  >
                    <LuUser className="text-blue-600 text-lg" />
                    My Profile
                  </Link>
                </li>

                <div className="divider my-1 h-px bg-gray-100 dark:bg-slate-700"></div>

                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-slate-700 rounded-lg font-semibold"
                  >
                    <LuLogOut className="text-lg" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
