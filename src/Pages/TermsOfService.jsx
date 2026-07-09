import React from "react";

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6 font-sans">
      <h1 className="text-5xl font-black text-[#0f172a] mb-10 italic uppercase">
        Terms of <span className="text-blue-500">Service</span>
      </h1>
      <div className="space-y-8 text-slate-600 dark:text-slate-300 leading-relaxed">
        <section>
          <h3 className="text-xl font-bold text-[#0f172a] mb-4">1. Acceptance of Terms</h3>
          <p>By accessing or using the eTuitionBd platform, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
        </section>
        <section>
          <h3 className="text-xl font-bold text-[#0f172a] mb-4">2. User Conduct</h3>
          <p>Users are responsible for the accuracy of the information they provide. Tutors must provide genuine qualifications, and students must provide accurate tuition requirements.</p>
        </section>
        <section>
          <h3 className="text-xl font-bold text-[#0f172a] mb-4">3. Payment Terms</h3>
          <p>All payments made through eTuitionBd are final. The platform acts as a connector and facilitator for educational services.</p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
