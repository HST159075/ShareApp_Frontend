import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  // Animations variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm"
      >
        <h1 className="text-2xl font-bold text-blue-600 tracking-tight">
          ShareApp
        </h1>
        <div className="space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 text-slate-600 hover:text-blue-600 transition font-medium"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition shadow-md"
          >
            Get Started
          </Link>
        </div>
      </motion.nav>

      {/* Main Hero Section */}
      <main className="max-w-6xl mx-auto mt-20 px-4 text-center">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={fadeInUp}
          className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-[1.1]"
        >
          Share Files <span className="text-blue-600">Instantly</span> <br />
          without the{" "}
          <span className="underline decoration-blue-200">hassle</span>.
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          variants={fadeInUp}
          className="text-lg text-slate-600 max-w-2xl mx-auto mb-10"
        >
          একটি সহজ লিঙ্কের মাধ্যমে আপনার বড় ফাইল, ছবি বা ডকুমেন্ট শেয়ার করুন।
          কোনো রেজিস্ট্রেশন ছাড়াই কুইক শেয়ার, আর মেম্বারদের জন্য আনলিমিটেড
          স্টোরেজ।
        </motion.p>

        {/* Animated Buttons */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          variants={fadeInUp}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {/* FIXED: changed /upload to /share to match your App.tsx route */}
            <Link
              to="/share"
              className="w-full md:w-auto px-10 py-4 bg-blue-600 text-white text-lg font-semibold rounded-2xl hover:shadow-xl shadow-blue-200 transition"
            >
              Upload File Now
            </Link>
          </motion.div>
          <motion.button
            whileHover={{ backgroundColor: "#f8fafc" }}
            className="w-full md:w-auto px-10 py-4 bg-white border border-slate-200 text-slate-700 text-lg font-semibold rounded-2xl transition"
          >
            How it Works
          </motion.button>
        </motion.div>

        {/* Animated Drag & Drop Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 bg-white p-2 rounded-3xl shadow-2xl border border-slate-100 max-w-4xl mx-auto mb-20"
        >
          <div className="h-64 md:h-80 bg-blue-50/50 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-blue-200 group hover:border-blue-400 transition cursor-pointer">
            <div className="p-4 bg-white rounded-full shadow-sm mb-4 group-hover:bg-blue-600 group-hover:text-white transition duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <p className="text-slate-600 font-medium">
              Drag & drop files here or{" "}
              <span className="text-blue-600">click to browse</span>
            </p>
            <p className="text-sm text-slate-400 mt-2">
              Maximum file size: 2GB
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default LandingPage;
