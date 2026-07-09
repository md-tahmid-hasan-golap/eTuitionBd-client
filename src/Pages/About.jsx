import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import {
  FaRocket,
  FaUserCheck,
  FaLayerGroup,
  FaShieldAlt,
  FaLightbulb,
  FaHandshake,
  FaCheckCircle,
} from "react-icons/fa";

const About = () => {
  useEffect(() => {
    document.title = "About Us | eTuitionBD";
    Aos.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="bg-[#fcfcfd] min-h-screen font-sans overflow-hidden">
      {/* 🚀 Hero Section */}
      <section className="relative py-24 px-6 bg-[#0f172a] overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

        <div
          className="max-w-5xl mx-auto text-center relative z-10"
          data-aos="zoom-out"
        >
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Empowering <span className="text-orange-500">Education</span> <br />
            Beyond Boundaries
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
            eTuitionBd is a next-generation Tuition Management System. We bridge
            the gap between knowledge seekers and expert educators through
            technology, trust, and transparency.
          </p>
        </div>
      </section>

      {/* 🎯 Our Mission Section */}
      <section className="max-w-7xl mx-auto py-20 px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div data-aos="fade-right">
          <div className="inline-block px-4 py-1 rounded-full bg-orange-50 dark:bg-orange-900/30 text-orange-600 text-xs font-black uppercase tracking-widest mb-4">
            Our Mission
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] mb-6 leading-tight">
            Connecting Ambitions with <br /> Specialized Tutors
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-8 font-medium">
            Our mission is to simplify the connection between students and
            tutors by providing automated workflows, digital class tracking, and
            a structured platform where academic excellence becomes accessible
            to everyone.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Verified Educators",
              "Seamless Communication",
              "Goal-Oriented Learning",
              "Safe & Secure",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-[#0f172a] font-bold"
              >
                <FaCheckCircle className="text-orange-500" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative" data-aos="fade-left">
          <div className="absolute inset-0 bg-orange-500 rounded-[2rem] rotate-3 scale-95 opacity-10"></div>
          <div className="relative bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-2xl border border-slate-50 dark:border-slate-800 overflow-hidden">
            <div className="grid grid-cols-2 gap-4">
              <div className="h-32 md:h-40 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest text-xs">
                Reliable
              </div>
              <div className="h-32 md:h-40 bg-orange-500 rounded-2xl flex items-center justify-center text-white font-bold uppercase tracking-widest text-xs">
                Verified
              </div>
              <div className="h-32 md:h-40 bg-[#0f172a] rounded-2xl flex items-center justify-center text-white font-bold uppercase tracking-widest text-xs">
                Modern
              </div>
              <div className="h-32 md:h-40 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest text-xs">
                Effective
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🛠️ How It Works (Steps) */}
      <section className="bg-slate-50 dark:bg-slate-800 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] mb-4">
              How It Works
            </h2>
            <div className="h-1.5 w-20 bg-orange-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <StepCard
              icon={<FaLayerGroup />}
              title="Post Tuition Requirements"
              desc="Easily post your tuition needs by specifying subjects, class levels, and budget to attract the best matching tutors."
              index="01"
            />
            <StepCard
              icon={<FaUserCheck />}
              title="Verify & Shortlist"
              desc="Browse through verified tutor applications. Review their profiles, qualifications, and choose the perfect fit for your needs."
              index="02"
            />
            <StepCard
              icon={<FaShieldAlt />}
              title="Start Learning Safely"
              desc="Begin your educational journey with confidence. We ensure safe payments and transparent communication throughout."
              index="03"
            />
          </div>
        </div>
      </section>

      {/* 🏆 Why Choose Us */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] mb-4">
            Why Choose eTuitionBd
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Building a community of trusted learners and expert teachers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <FeatureCard
            icon={<FaRocket className="text-orange-500" />}
            title="Fast Matching"
            desc="Our smart matching system helps students find the right tutor in the shortest possible time."
          />
          <FeatureCard
            icon={<FaLightbulb className="text-blue-500" />}
            title="Smart Dashboard"
            desc="Intuitive interface for tracking classes, payments, and applications without any hassle."
          />
          <FeatureCard
            icon={<FaHandshake className="text-green-500" />}
            title="Full Transparency"
            desc="We maintain complete transparency in verification and payments for total peace of mind."
          />
        </div>
      </section>
    </div>
  );
};

// Reusable StepCard Component
const StepCard = ({ icon, title, desc, index }) => (
  <div
    data-aos="fade-up"
    className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-xl shadow-blue-100/20 hover:shadow-2xl transition-all border border-slate-50 dark:border-slate-800 relative group"
  >
    {/* Floating Number Badge */}
    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-orange-500 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
      {index}
    </div>

    {/* Icon Container */}
    <div className="w-16 h-16 bg-[#0f172a] text-orange-500 rounded-2xl flex items-center justify-center text-3xl mb-8 mt-4 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
      {icon}
    </div>

    <h3 className="text-2xl font-black text-[#0f172a] mb-4">{title}</h3>
    <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium text-sm">{desc}</p>

    <div className="mt-6 w-12 h-1 bg-slate-100 dark:bg-slate-800 group-hover:w-full group-hover:bg-orange-500/20 transition-all duration-500 rounded-full"></div>
  </div>
);

// Reusable FeatureCard Component
const FeatureCard = ({ icon, title, desc }) => (
  <div
    data-aos="zoom-in"
    className="text-center p-8 rounded-[2.5rem] hover:bg-white dark:bg-slate-900 hover:shadow-2xl transition-all border border-transparent hover:border-slate-50 dark:border-slate-800 group"
  >
    <div className="w-20 h-20 bg-white dark:bg-slate-900 shadow-xl rounded-3xl flex items-center justify-center text-3xl mx-auto mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-[#0f172a] mb-3">{title}</h3>
    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">{desc}</p>
  </div>
);

export default About;
