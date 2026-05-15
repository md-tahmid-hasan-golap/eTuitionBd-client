import React from "react";
import Banner from "../Components/Banner";
import Tuition from "../Components/Tuition";
import HomeTutors from "../Components/HomeTutors";
import HowThePlatformWorks from "../Components/HowThePlatformWorks ";
import WhyChooseUs from "../Components/WhyChooseUs";
import FAQ from "../Components/FAQ";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";


const Home = () => {
  const axiosPublic = useAxiosPublic();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['tuitions'],
    queryFn: async () => {
      const res = await axiosPublic.get('/all-tuitions', {
        params: { limit: 6, page: 1, status: 'Approved' }
      });
      console.log('API Response (Home Tuitions):', res.data);
      return res.data;
    }
  });

  // Extract tuitions array safely
  const tuitions = data?.tuitions || [];

  return (
    <div>
      <Banner />
      
      {/* Tuition Data Section */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <span className="loading loading-spinner loading-lg text-blue-700"></span>
          <p className="text-slate-500 font-medium animate-pulse">Finding best tuitions for you...</p>
        </div>
      ) : isError ? (
        <div className="text-center py-20 bg-red-50 rounded-3xl mx-4 my-10 border border-red-100">
          <p className="text-red-500 font-semibold mb-2">Oops! Couldn't load tuitions.</p>
          <button 
            onClick={() => refetch()}
            className="btn btn-sm btn-outline btn-error rounded-full"
          >
            Try Again
          </button>
        </div>
      ) : (
        <Tuition data={tuitions} />
      )}

      <HomeTutors />
      <HowThePlatformWorks />
      <WhyChooseUs />
      <FAQ />
     
    </div>
  );
};

export default Home;
