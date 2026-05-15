import React from "react";
// আইকন ইমপোর্ট ঠিক করা হয়েছে
import { FaQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const faqData = [
  {
    question: "How do I post a tuition requirement?",
    answer:
      "As a student, log in to your dashboard and navigate to 'Post New Tuition'. Fill in the subject, class, location, and budget. Your post will be visible to tutors once the Admin approves it.",
  },
  {
    question: "How are tutors verified on eTuitionBd?",
    answer:
      "Every tutor application is manually reviewed by our Admin team. We verify their qualifications and experience before they are allowed to start teaching through our platform.",
  },
  {
    question: "When is a tutor officially 'Approved' for a job?",
    answer:
      "A tutor is considered approved only after the student clicks 'Accept' and successfully completes the payment for the tutor's expected salary via our secure Stripe gateway.",
  },
  {
    question: "How can I join as a tutor?",
    answer:
      "Register an account and select the 'Tutor' role. You can then browse the 'Tuitions' page and click 'Apply' on posts that match your expertise. You'll need to provide your qualifications and expected salary.",
  },
  {
    question: "Is my payment secure?",
    answer:
      "Yes, we use industry-standard Stripe encryption for all transactions. Your financial data is never stored on our servers, and admins monitor all transaction histories for transparency.",
  },
  {
    question: "Can I edit my tuition post after publishing?",
    answer:
      "Yes! Students can manage their posts from the 'My Tuitions' section in their dashboard. You can edit details or delete a post entirely if you have already found a tutor.",
  },
];

const FAQ = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              {/* আইকনটি এখানে সঠিকভাবে কল করা হয়েছে */}
              <FaQuestionCircle /> FAQ Center
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] mb-4">
            Frequently Asked <span className="text-orange-500">Questions</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Find answers to common questions about our platform's workflow,
            tutor verification, and payment security.
          </p>
        </div>

        {/* Accordion Container using DaisyUI Collapse */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="collapse collapse-plus bg-white border border-gray-100 shadow-sm rounded-2xl group focus-within:border-blue-400 transition-all duration-300"
            >
              <input
                type="radio"
                name="faq-accordion"
                defaultChecked={index === 0}
              />

              <div className="collapse-title text-lg font-bold text-[#0f172a] group-hover:text-blue-700 transition-colors px-6 py-5">
                {item.question}
              </div>

              <div className="collapse-content px-6 text-gray-600 leading-relaxed">
                <div className="pb-4 pt-2 border-t border-gray-50">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Extra Contact Support Card */}
        <div className="mt-12 p-8 bg-[#0f172a] rounded-3xl text-center text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">
              Still have more questions?
            </h3>
            <p className="text-gray-400 mb-6 text-sm">
              Our support team is always here to help you 24/7.
            </p>
            <Link
              to="/contact"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-all active:scale-95 shadow-lg"
            >
              Contact Us Now
            </Link>
          </div>
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-800 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-orange-500 rounded-full blur-3xl opacity-10"></div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
