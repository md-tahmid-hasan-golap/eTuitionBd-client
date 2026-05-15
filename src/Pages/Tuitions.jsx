import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TuitionsCard from "../Components/TuitionsCard";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const Tuitions = () => {
  const axiosPublic = useAxiosPublic();
  
  // States for filters and pagination
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("date-newest"); // Default to newest first
  const [page, setPage] = useState(1);
  const limit = 6; // Tuitions per page

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['all-tuitions', search, selectedClass, location, sort, page],
    queryFn: async () => {
      const res = await axiosPublic.get('/all-tuitions', {
        params: { search, class: selectedClass, location, sort, page, limit }
      });
      return res.data;
    }
  });

  // Data Guard: Handle array or object structure { totalCount, tuitions }
  const tuitions = data?.tuitions || (Array.isArray(data) ? data : []);
  
  const handleNext = () => {
    setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title Section */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-[#0f172a] italic mb-3">
            Available <span className="text-orange-500">Tuitions</span>
          </h2>
          <p className="text-slate-500 font-medium">
            Explore our tuition opportunities and start your teaching journey.
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-10 flex flex-col lg:flex-row gap-4 items-center justify-between">
          <input
            type="text"
            placeholder="Search subject..."
            className="input input-bordered w-full lg:max-w-[200px] rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-slate-50 text-slate-800"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />

          <input
            type="text"
            placeholder="Filter by location..."
            className="input input-bordered w-full lg:max-w-[200px] rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-slate-50 text-slate-800"
            value={location}
            onChange={(e) => { setLocation(e.target.value); setPage(1); }}
          />
          
          <select 
            className="select select-bordered w-full lg:max-w-[200px] rounded-xl focus:border-orange-500 bg-slate-50 text-slate-800"
            value={selectedClass}
            onChange={(e) => { setSelectedClass(e.target.value); setPage(1); }}
          >
            <option value="">All Classes</option>
            <option value="Class 1-5">Class 1-5</option>
            <option value="Class 6-8">Class 6-8</option>
            <option value="Class 9-10">Class 9-10</option>
            <option value="HSC">HSC</option>
            <option value="Admission">Admission</option>
          </select>

          <select 
            className="select select-bordered w-full lg:max-w-[200px] rounded-xl focus:border-orange-500 bg-slate-50 text-slate-800"
            value={sort}
            onChange={(e) => { setSort(e.target.value); setPage(1); }}
          >
            <option value="date-newest">Sort by Date (Newest)</option>
            <option value="salary-desc">Salary: High to Low</option>
            <option value="salary-asc">Salary: Low to High</option>
          </select>
        </div>

        {/* Loading State / Cards Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="flex w-full flex-col gap-4 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                <div className="skeleton h-10 w-28 rounded-full bg-slate-200"></div>
                <div className="skeleton h-6 w-3/4 bg-slate-200"></div>
                <div className="skeleton h-4 w-1/2 bg-slate-200"></div>
                <div className="skeleton h-4 w-full bg-slate-200 mt-4"></div>
                <div className="skeleton h-12 w-full rounded-2xl bg-slate-200 mt-4"></div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border border-red-100 shadow-sm flex flex-col items-center gap-4">
            <p className="text-red-500 text-xl font-bold italic">Oops! Something went wrong while fetching tuitions.</p>
            <button 
              onClick={() => refetch()}
              className="btn bg-red-500 hover:bg-red-600 text-white rounded-xl px-8"
            >
              Retry Loading
            </button>
          </div>
        ) : tuitions?.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
            <p className="text-slate-400 text-2xl font-bold italic uppercase tracking-widest">
              No Tuitions Found Matching Your Criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tuitions.map((tution) => (
              <TuitionsCard key={tution._id} tution={tution}></TuitionsCard>
            ))}
          </div>
        )}

        {/* Pagination Section */}
        {!isLoading && !isError && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button 
              onClick={handlePrev} 
              disabled={page === 1}
              className="btn btn-outline border-slate-200 hover:bg-orange-500 hover:border-orange-500 px-8 rounded-2xl disabled:opacity-50 disabled:bg-slate-50 font-bold"
            >
              Previous
            </button>
            <span className="font-black text-slate-700 bg-white px-5 py-3 rounded-xl shadow-sm border border-slate-100">
              Page {page} {data?.totalCount ? `of ${Math.ceil(data.totalCount / limit)}` : ""}
            </span>
            <button 
              onClick={handleNext} 
              disabled={data?.totalCount ? page >= Math.ceil(data.totalCount / limit) : tuitions.length < limit}
              className="btn btn-outline border-slate-200 hover:bg-orange-500 hover:border-orange-500 px-8 rounded-2xl disabled:opacity-50 disabled:bg-slate-50 font-bold"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tuitions;
