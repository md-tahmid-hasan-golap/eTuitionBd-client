import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // New X logo as per requirements

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-gray-300 mt-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Column 1: About & Branding */}
        <div className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight text-white">
            eTuition<span className="text-orange-500">Bd</span>
          </h2>
          <p className="text-sm leading-relaxed">
            Bangladesh's most trusted platform for finding verified tutors and
            tuition. Empowering students and tutors through a seamless digital
            management system.
          </p>
          <div className="flex gap-4 pt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-600 hover:text-white transition-all"
            >
              <FaFacebookF size={16} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-600 hover:text-white transition-all"
            >
              <FaGithub size={16} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-700 hover:text-white transition-all"
            >
              <FaLinkedinIn size={16} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-black hover:text-white transition-all"
            >
              <FaXTwitter size={16} />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
            Quick Links
            <span className="absolute -bottom-1 left-0 w-10 h-1 bg-orange-500 rounded-full"></span>
          </h3>
          <ul className="space-y-3">
            {[
              { path: "/", name: "Home" },
              { path: "/tuitions", name: "Browse Tuitions" },
              { path: "/tutors", name: "Find Tutors" },
              { path: "/about", name: "About Us" },
              { path: "/contact", name: "Contact Us" },
            ].map((link, idx) => (
              <li key={idx}>
                <Link
                  to={link.path}
                  className="hover:text-orange-500 hover:translate-x-1 transition-all inline-block"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: For Users */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
            For Users
            <span className="absolute -bottom-1 left-0 w-10 h-1 bg-orange-500 rounded-full"></span>
          </h3>
          <ul className="space-y-3">
            <li>
              <Link
                to="/login"
                className="hover:text-orange-500 transition-colors"
              >
                Login to Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="hover:text-orange-500 transition-colors"
              >
                Register as Tutor
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="hover:text-orange-500 transition-colors"
              >
                Post a Tuition
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-orange-500 transition-colors">
                Help & FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
            Get In Touch
            <span className="absolute -bottom-1 left-0 w-10 h-1 bg-orange-500 rounded-full"></span>
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-orange-500 mt-1" />
              <span className="text-sm text-gray-400">Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-orange-500" />
              <span className="text-sm text-gray-400">+880 1707115247</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-orange-500" />
              <span className="text-sm text-gray-400">
                tahmidhasangolap@gmail.com
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Bottom Bar */}
      <div className="bg-[#0b1221] py-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 italic">
            Developed with ❤️ by{" "}
            <a
              href="https://github.com/md-tahmid-hasan-golap"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-white underline"
            >
              Tahmid Hasan
            </a>
          </p>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()}{" "}
            <span className="text-white font-semibold">eTuitionBd</span>. All
            rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <Link to="/legal-notice" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
