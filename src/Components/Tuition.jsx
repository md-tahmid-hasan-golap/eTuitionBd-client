import React from "react";
import { Link } from "react-router-dom";
import TuitionsCard from "./TuitionsCard";
import { FaArrowRight } from "react-icons/fa";

const Tuition = ({ data }) => {
  // Taking only the first 6 items for the "Latest" section
  // Handle both array and object structure { tuitions: [...] }
  const tuitionList = data?.tuitions || (Array.isArray(data) ? data : []);
  const latestTuitions = tuitionList.slice(0, 6);

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-black text-[#0f172a] tracking-tight italic">
              Latest <span className="text-orange-500">Tuitions</span>
            </h2>
            <p className="text-slate-500 mt-3 font-medium text-lg">
              Freshly posted requirements from students looking for expert
              tutors.
            </p>
          </div>

          <Link
            to="/tuitions"
            className="group flex items-center gap-3 bg-[#0f172a] text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-200 active:scale-95 text-sm uppercase tracking-widest"
          >
            Explore All{" "}
            <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {/* Latest Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestTuitions.map((tution) => (
            <TuitionsCard key={tution._id} tution={tution} />
          ))}
        </div>

        {/* Display message if no data exists */}
        {latestTuitions.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-bold italic">
              No tuition posts are currently available.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Tuition;
