// src/components/ErrorPage.jsx
import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { FaHome, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import errorAnimation from "../../src/assets/banner-image/Page Not Found 404.json";

const MotionDiv = motion.div;
const MotionButton = motion.button;

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen bg-[#F3F7FB] flex flex-col items-center justify-center p-6 font-sans">
      <div className="flex flex-col items-center justify-center gap-8 md:gap-12 w-full max-w-5xl text-center">
        {/* Lottie Animation */}
        <MotionDiv
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center w-full"
        >
          <Lottie
            animationData={errorAnimation}
            loop={true}
            className="w-64 h-64 sm:w-80 sm:h-80 md:w-[800px] md:h-96"
          />
        </MotionDiv>

        {/* Error Info */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">Oops!</h1>
          <p className="text-xl text-gray-600">
            Sorry, an unexpected error has occurred.
          </p>
          {error && (
            <p className="text-gray-500 italic">
              {error.statusText || error.message}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <MotionButton
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center gap-2 bg-[#FF8C1A] hover:bg-[#e67e17] text-white px-8 py-3 rounded-md text-lg font-medium transition-all shadow-md"
            onClick={() => navigate("/")}
          >
            <FaHome /> Go Home
          </MotionButton>

          <MotionButton
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center gap-2 bg-[#8B5CF6] hover:bg-[#7c4dff] text-white px-8 py-3 rounded-md text-lg font-medium transition-all shadow-md"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft /> Go Back
          </MotionButton>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
