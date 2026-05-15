import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../firebase/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import registerLottie from "../../src/assets/banner-image/Bank Account Setup.json";
import axios from "axios";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const Register = () => {
  const { createUser, signInWithGoogle, updateUserProfile } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
  } = useForm();

  const imgbb_api_key = import.meta.env.VITE_imgbb_apiKey;
  const imgbb_api_url = `https://api.imgbb.com/1/upload?key=${imgbb_api_key}`;

  // Email/Password Registration
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const imageFile = new FormData();
      imageFile.append("image", data.photo[0]);
      const res = await axios.post(imgbb_api_url, imageFile);

      if (res.data.success) {
        const photoURL = res.data.data.display_url;
        await createUser(data.email, data.password);
        await updateUserProfile({ displayName: data.name, photoURL: photoURL });

        const userInfo = {
          name: data.name,
          email: data.email,
          photoUrl: photoURL,
          role: data.role,
          phone: data.phone,
        };
        await axiosPublic.post('/users', userInfo);

        toast.success("Registration Successful! ✅");
        navigate("/"); // Redirect to home after registration
      }
    } catch (error) {
      toast.error(error.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  // Google Sign In & Redirect
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      const userInfo = {
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
        role: "student",
        phone: "",
      };
      await axiosPublic.post('/users', userInfo);

      toast.success("Google Login Successful! 🚀");
      navigate("/"); // Redirect to home after Google sign-in
    } catch (error) {
      toast.error(error.message || "Google Sign-in failed.");
    }
  };

  return (
    <div className="w-full max-w-[550px] bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 mx-auto my-10 font-sans">
      <div className="flex justify-center -mt-4 mb-2">
        <Lottie
          animationData={registerLottie}
          loop={true}
          className="w-24 h-24"
        />
      </div>

      <h2 className="text-3xl font-black text-[#0f172a] mb-1 text-center italic">
        Register now!
      </h2>
      <p className="text-slate-400 text-center mb-6 text-sm font-medium">
        Create your eTuitionBd account
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-500 uppercase ml-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-orange-500 focus:outline-none text-sm transition-all text-slate-800"
              {...register("name", { required: true })}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-500 uppercase ml-1">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="01XXXXXXXXX"
              className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-orange-500 focus:outline-none text-sm transition-all text-slate-800"
              {...register("phone", { required: true })}
            />
          </div>
        </div>

        {/* Email & Role */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-500 uppercase ml-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="example@mail.com"
              className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-orange-500 focus:outline-none text-sm transition-all text-slate-800"
              {...register("email", { required: true })}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-500 uppercase ml-1">
              User Role
            </label>
            <select
              className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-orange-500 focus:outline-none cursor-pointer text-sm font-bold transition-all text-slate-800"
              {...register("role", { required: true })}
            >
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
            </select>
          </div>
        </div>

        {/* Gender */}
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-500 uppercase ml-1">
            Gender
          </label>
          <div className="flex gap-6 mt-1 ml-2">
            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700 hover:text-orange-500 transition-colors">
              <input
                type="radio"
                value="male"
                className="radio radio-warning radio-sm"
                {...register("gender", { required: true })}
              />{" "}
              Male
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700 hover:text-orange-500 transition-colors">
              <input
                type="radio"
                value="female"
                className="radio radio-warning radio-sm"
                {...register("gender", { required: true })}
              />{" "}
              Female
            </label>
          </div>
        </div>

        {/* Photo */}
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-500 uppercase ml-1">
            Profile Photo
          </label>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full rounded-2xl bg-slate-50 text-sm focus:outline-none transition-all text-slate-800"
            {...register("photo", { required: true })}
          />
        </div>

        {/* Password with Show/Hide */}
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-500 uppercase ml-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:border-orange-500 focus:outline-none text-sm transition-all text-slate-800"
              {...register("password", { required: true, minLength: 6 })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-500 transition-colors"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#0f172a] hover:bg-blue-900 text-white font-black py-4 rounded-2xl shadow-lg mt-4 transition-all uppercase tracking-widest text-sm"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <div className="divider text-slate-300 text-[10px] font-bold my-6 uppercase tracking-widest">
        OR
      </div>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 py-3 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-700 shadow-sm"
      >
        <FcGoogle size={20} /> Continue with Google
      </button>

      <p className="mt-6 text-center text-sm font-medium text-slate-500">
        Already have an account?{" "}
        <Link to="/login" className="text-orange-600 font-bold hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
