// src/components/HowThePlatformWorks.jsx
import React from "react";
import { motion } from "framer-motion";
// React Icons থেকে ইমপোর্ট করা হয়েছে
import { FaEdit, FaSearch, FaCheckDouble } from "react-icons/fa";

const MotionH2 = motion.h2;
const MotionDiv = motion.div;

const steps = [
  {
    number: "01",
    title: "Post Tuition",
    description:
      "Students post requirements including subject, class, location, and budget. It then goes to admin for approval.",
    icon: <FaEdit size={28} />,
  },
  {
    number: "02",
    title: "Tutors Apply",
    description:
      "Verified tutors browse approved posts and apply with their qualifications and expected salary.",
    icon: <FaSearch size={28} />,
  },
  {
    number: "03",
    title: "Approve & Pay",
    description:
      "Students approve tutors and complete secure payment via Stripe to confirm the tuition job.",
    icon: <FaCheckDouble size={28} />,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const HowThePlatformWorks = () => {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <MotionH2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-[#0f172a]"
          >
            How the Platform{" "}
            <span className="text-orange-500 italic">Works</span>
          </MotionH2>
          <div className="w-24 h-1.5 bg-blue-900 mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-500 mt-6 max-w-xl mx-auto">
            Our simplified process ensures a seamless connection between
            qualified tutors and ambitious students.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          {/* Connector Line (Desktop only) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-gray-300 -translate-y-1/2 z-0"></div>

          {steps.map((step, index) => (
            <MotionDiv
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col items-center text-center relative z-10 hover:shadow-2xl hover:border-blue-100 transition-all duration-300 group"
            >
              {/* Step Number Badge */}
              <div className="absolute -top-5 bg-orange-500 text-white font-black px-4 py-1 rounded-lg shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
                STEP {step.number}
              </div>

              {/* Icon Circle */}
              <div className="w-20 h-20 bg-blue-50 text-blue-900 rounded-full flex items-center justify-center mb-6 shadow-inner group-hover:bg-blue-900 group-hover:text-white transition-colors duration-500">
                {step.icon}
              </div>

              <h3 className="text-2xl font-bold text-[#0f172a] mb-4 group-hover:text-blue-900 transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                {step.description}
              </p>

              {/* Decorative Circle Background */}
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-orange-50 rounded-full -z-10 opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowThePlatformWorks;
