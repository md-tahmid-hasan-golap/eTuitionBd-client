import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import TutorsCard from "../Components/TutorsCard";

const Tutors = () => {
  const axiosPublic = useAxiosPublic();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["tutors"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tutors");
      console.log("API Response (Tutors):", res.data);
      return res.data;
    },
  });

  // Data Guard: Ensure tutors is always an array
  const tutors = Array.isArray(data) ? data : [];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-[#0f172a] italic mb-4 uppercase tracking-tight">
            Expert <span className="text-orange-500">Tutors</span>
          </h2>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto">
            Connect with qualified professionals ready to help you excel in your studies.
          </p>
        </div>

        {/* Loading / Cards Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm animate-pulse">
                <div className="w-24 h-24 bg-slate-200 rounded-[2rem] mb-6"></div>
                <div className="h-6 bg-slate-200 rounded-full w-3/4 mb-4"></div>
                <div className="h-4 bg-slate-200 rounded-full w-1/2 mb-8"></div>
                <div className="space-y-3">
                  <div className="h-12 bg-slate-100 rounded-2xl w-full"></div>
                  <div className="h-12 bg-slate-100 rounded-2xl w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border border-red-100 shadow-sm flex flex-col items-center gap-4">
            <p className="text-red-500 text-xl font-bold italic">Oops! Couldn't load tutor data.</p>
            <button 
              onClick={() => refetch()}
              className="btn bg-red-500 hover:bg-red-600 text-white rounded-xl px-8"
            >
              Retry
            </button>
          </div>
        ) : tutors?.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
            <p className="text-slate-400 text-2xl font-bold italic uppercase tracking-widest">
              No Tutors Available At This Moment
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tutors.map((tutor) => (
              <TutorsCard key={tutor._id} tutor={tutor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tutors;
