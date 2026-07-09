import React from "react";

const LegalNotice = () => {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6 font-sans">
      <h1 className="text-5xl font-black text-[#0f172a] mb-10 italic uppercase">
        Privacy <span className="text-orange-500">Policy</span>
      </h1>
      <div className="space-y-8 text-slate-600 dark:text-slate-300 leading-relaxed">
        <section>
          <h3 className="text-xl font-bold text-[#0f172a] mb-4">1. Information We Collect</h3>
          <p>We collect information you provide directly to us, such as when you create an account, post a tuition, or apply as a tutor. This includes your name, email address, phone number, and professional qualifications.</p>
        </section>
        <section>
          <h3 className="text-xl font-bold text-[#0f172a] mb-4">2. How We Use Your Information</h3>
          <p>We use the information we collect to operate, maintain, and provide the features of the eTuitionBd platform, including connecting students with qualified tutors and processing payments securely via Stripe.</p>
        </section>
        <section>
          <h3 className="text-xl font-bold text-[#0f172a] mb-4">3. Data Security</h3>
          <p>We implement a variety of security measures to maintain the safety of your personal information. Your sensitive data (like passwords) is hashed, and payment information is handled directly by Stripe.</p>
        </section>
      </div>
    </div>
  );
};

export default LegalNotice;
