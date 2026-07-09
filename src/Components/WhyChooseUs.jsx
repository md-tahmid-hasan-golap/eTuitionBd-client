// src/components/WhyChooseUs.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  LuShieldCheck,
  LuLock,
  LuLayoutDashboard,
  LuActivity,
} from "react-icons/lu";

const MotionSpan = motion.span;
const MotionH2 = motion.h2;
const MotionDiv = motion.div;

const features = [
  {
    title: "Verified Tutors",
    description:
      "All tutors are verified by admin to ensure quality and trust.",
    icon: <LuShieldCheck className="text-3xl text-orange-500" />,
  },
  {
    title: "Secure Payments",
    description:
      "Stripe-based payment system ensures safe and transparent transactions.",
    icon: <LuLock className="text-3xl text-orange-500" />,
  },
  {
    title: "Role-Based Dashboard",
    description: "Separate dashboards for Students, Tutors, and Admins.",
    icon: <LuLayoutDashboard className="text-3xl text-orange-500" />,
  },
  {
    title: "Admin Monitoring",
    description:
      "Admin controls users, tuition posts, and platform activities.",
    icon: <LuActivity className="text-3xl text-orange-500" />,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <MotionSpan
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-orange-600 font-bold uppercase tracking-widest text-sm"
          >
            Our Core Features
          </MotionSpan>
          <MotionH2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black text-[#0f172a] mt-2"
          >
            Why Choose <span className="text-blue-900 dark:text-blue-100 italic">eTuition</span>
            <span className="text-orange-500">Bd</span>
          </MotionH2>
          <div className="w-20 h-1.5 bg-blue-900 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <MotionDiv
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="bg-gray-50 dark:bg-slate-800 p-8 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:bg-white dark:bg-slate-900 transition-all duration-300 group"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:bg-blue-900 transition-colors duration-300">
                <div className="group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-bold mb-3 text-[#0f172a]">
                {feature.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative Line */}
              <div className="w-0 group-hover:w-full h-1 bg-orange-500 mt-4 transition-all duration-500 rounded-full"></div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
