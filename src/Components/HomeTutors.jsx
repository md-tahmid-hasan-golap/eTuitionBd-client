import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import TutorsCard from "./TutorsCard";
import { FaUserTie, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomeTutors = () => {
  const axiosPublic = useAxiosPublic();

  const { data: tutors = [], isLoading, isError } = useQuery({
    queryKey: ["latest-6-tutors"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tutors", {
        params: { limit: 6 },
      });

      const tutorList = Array.isArray(res.data) ? res.data : [];

      return tutorList
        .sort((a, b) => {
          const aDate = new Date(a?.createdAt || a?.joinedAt || 0).getTime();
          const bDate = new Date(b?.createdAt || b?.joinedAt || 0).getTime();
          return bDate - aDate;
        })
        .slice(0, 6);
    },
  });

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-orange-500 font-black uppercase tracking-[0.3em] text-xs">
              <span className="w-8 h-[2px] bg-orange-500"></span>
              Our Experts
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-[#0f172a] tracking-tight uppercase italic">
              Latest Expert <span className="text-blue-600">Tutors</span>
            </h2>
            <p className="text-slate-500 font-medium max-w-xl">
              Meet our most recently joined professionals who are ready to help you achieve your academic goals.
            </p>
          </div>
          <Link 
            to="/tutors" 
            className="group flex items-center gap-3 bg-slate-50 hover:bg-[#0f172a] text-[#0f172a] hover:text-white px-8 py-4 rounded-2xl font-black transition-all border border-slate-100 shadow-sm"
          >
            View All Tutors <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[400px] bg-slate-50 animate-pulse rounded-[3rem]"></div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-20 bg-red-50 rounded-[3rem] border border-red-100">
            <p className="text-red-500 font-black italic">Failed to load expert tutors.</p>
          </div>
        ) : tutors.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <FaUserTie className="mx-auto text-slate-200 text-6xl mb-4" />
            <p className="text-slate-400 font-black uppercase tracking-widest italic">No tutors available yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutors.map((tutor) => (
              <TutorsCard key={tutor._id} tutor={tutor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeTutors;
