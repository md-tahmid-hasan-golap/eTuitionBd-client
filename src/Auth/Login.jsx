import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../firebase/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // পাসওয়ার্ড শো-হাইড আইকন
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import loginLotti from "../../src/assets/banner-image/Login.json";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // পাসওয়ার্ড দেখার স্টেট

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Login Function with Toast and Redirect
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await signInUser(data.email, data.password);

      // Fetch role to determine redirect path
      const roleRes = await axiosPublic.get(`/user/role/${data.email}`);
      const role = roleRes.data?.role?.toLowerCase();

      // Success Toast
      toast.success("Welcome back! Login Successful ✅", {
        duration: 3000,
        position: "top-center",
      });

      // Redirect Logic — always go to home, unless bounced from a protected page
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || "Invalid credentials, please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google Login Function
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      const userInfo = {
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
        role: "student",
      };
      // Save or update user in DB
      await axiosPublic.post("/users", userInfo);

      // Fetch role for Google user
      const roleRes = await axiosPublic.get(`/user/role/${user.email}`);
      const role = roleRes.data?.role?.toLowerCase();

      toast.success("Login with Google Successful! 🚀");

      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-blue-100/20 border border-slate-100 dark:border-slate-700 mx-auto my-10">
      <div className="flex justify-center -mt-4 mb-2">
        <Lottie animationData={loginLotti} loop={true} className="w-32 h-32" />
      </div>

      <h2 className="text-3xl font-black text-[#0f172a] mb-2 text-center">
        Login now!
      </h2>
      <p className="text-slate-400 text-center mb-8 text-sm font-medium italic">
        eTuitionBd - Connecting Ambitions
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-1">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email</label>
          <input
            type="email"
            placeholder="example@mail.com"
            className="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-orange-500 focus:outline-none transition-all"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className="text-xs text-red-500 ml-1">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Password Field with Show/Hide Toggle */}
        <div className="space-y-1">
          <div className="flex justify-between items-center ml-1">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Password</label>
            <button
              type="button"
              className="text-xs text-orange-600 font-bold hover:underline"
            >
              Forgot?
            </button>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} // কন্ডিশনাল টাইপ
              placeholder="••••••••"
              className="w-full px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-orange-500 focus:outline-none transition-all text-slate-800 dark:text-slate-200"
              {...register("password", { required: "Password is required" })}
            />
            {/* Eye Toggle Button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-500 transition-colors"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
          {errors.password && (
            <span className="text-xs text-red-500 ml-1">
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#0f172a] hover:bg-blue-900 text-white font-bold py-3.5 rounded-2xl shadow-lg transition-all"
        >
          {loading ? "Signing In..." : "Login"}
        </button>
      </form>

      <div className="divider text-slate-300 text-[10px] font-bold my-6 uppercase tracking-widest">
        OR
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 py-3 rounded-2xl hover:bg-slate-50 dark:bg-slate-800 transition-all font-bold text-slate-700 dark:text-slate-300"
      >
        <FcGoogle size={20} /> Login with Google
      </button>

      <p className="mt-8 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-orange-600 font-bold hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
