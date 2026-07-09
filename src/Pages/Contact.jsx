import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import toast from "react-hot-toast";
import {
  FaPaperPlane,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const Contact = () => {
  useEffect(() => {
    document.title = "Contact Us | eTuitionBD";
    Aos.init({ duration: 800, once: true });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message Sent Successfully! ✅", {
      position: "top-center",
      duration: 3000,
    });
    e.target.reset();
  };

  return (
    <section className="bg-[#fcfcfd] py-10 lg:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* 🔵 Left Content */}
        <div data-aos="fade-right" className="space-y-8">
          <div className="space-y-3 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-black text-blue-900 dark:text-blue-100 leading-tight">
              Let&apos;s talk about <br />
              <span className="text-orange-500 italic font-serif">
                Education.
              </span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium max-w-md mx-auto lg:mx-0">
              Contact us directly for any inquiries about the right tutor or a
              teaching career.
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-50 dark:border-slate-800">
              <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/30 text-orange-600 rounded-xl flex items-center justify-center text-lg">
                <FaPhoneAlt />
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Call
                </p>
                <p className="text-[#0f172a] font-bold text-sm">01707115247</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-50 dark:border-slate-800">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center text-lg">
                <FaEnvelope />
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Email
                </p>
                <p className="text-[#0f172a] font-bold text-xs truncate">
                  tahmidhasangolap@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-50 dark:border-slate-800 lg:flex sm:hidden">
              <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl flex items-center justify-center text-lg">
                <FaMapMarkerAlt />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Location
                </p>
                <p className="text-[#0f172a] font-bold text-sm">
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-50 dark:border-slate-800 lg:flex sm:hidden">
              <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 text-green-600 rounded-xl flex items-center justify-center text-lg">
                <FaClock />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Hours
                </p>
                <p className="text-[#0f172a] font-bold text-sm">24/7 Service</p>
              </div>
            </div>
          </div>
        </div>

        {/* 🟠 Right Content: Form */}
        <div data-aos="fade-left" className="relative mt-5 lg:mt-0">
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-[2.5rem] shadow-xl border border-slate-50 dark:border-slate-800 space-y-4 max-w-lg mx-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-black text-blue-900 dark:text-blue-100">Send Message</h3>
              <FaPaperPlane className="text-orange-500" size={20} />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Full Name
              </label>
              <input
                required
                type="text"
                placeholder="Ex: Tahmid Hasan"
                className="w-full px-5 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 focus:border-orange-500 focus:outline-none text-sm transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Email
              </label>
              <input
                required
                type="email"
                placeholder="example@mail.com"
                className="w-full px-5 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 focus:border-orange-500 focus:outline-none text-sm transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Message
              </label>
              <textarea
                required
                rows="3"
                placeholder="How can we help?"
                className="w-full px-5 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 focus:border-orange-500 focus:outline-none text-sm resize-none transition-all"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 mt-4"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
