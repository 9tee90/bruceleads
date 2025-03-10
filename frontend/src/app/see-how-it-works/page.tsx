"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % 5); // Loop through 5 steps
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-yellow-400 mb-8">🚀 See Bruce Leads in Action</h1>

      <div className="relative w-full max-w-4xl h-[400px] bg-gray-900 rounded-lg shadow-lg p-6 border border-yellow-500 flex items-center justify-center">
        {/* Step 1: AI Searching for Leads */}
        {stepIndex === 0 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute top-10 text-center"
          >
            <h2 className="text-2xl font-semibold">🔍 Searching for Leads</h2>
            <p className="text-gray-300">AI scanning funding rounds, hiring trends, and company signals...</p>
            <motion.div
              className="w-10 h-10 border-t-4 border-yellow-400 border-solid rounded-full animate-spin mx-auto mt-4"
            />
          </motion.div>
        )}

        {/* Step 2: Connecting to API Databases */}
        {stepIndex === 1 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="absolute top-20 left-10 text-center"
          >
            <h2 className="text-2xl font-semibold">📡 Connecting to APIs</h2>
            <p className="text-gray-300">Live data being retrieved from market databases...</p>
            <motion.div className="h-1 w-24 bg-yellow-400 mt-2 animate-pulse" />
          </motion.div>
        )}

        {/* Step 3: Triggering News Alerts */}
        {stepIndex === 2 && (
          <motion.div
            key="step-3"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="absolute bottom-20 right-10 text-center"
          >
            <h2 className="text-2xl font-semibold">📰 Detecting News Alerts</h2>
            <p className="text-gray-300">Identifying key changes in the market...</p>
            <motion.div className="h-1 w-24 bg-yellow-400 mt-2 animate-pulse" />
          </motion.div>
        )}

        {/* Step 4: AI Generating Messages */}
        {stepIndex === 3 && (
          <motion.div
            key="step-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="absolute bottom-10 left-10 text-center"
          >
            <h2 className="text-2xl font-semibold">🤖 AI Creating Outreach</h2>
            <p className="text-gray-300">Personalized messages crafted for LinkedIn, Email, and WhatsApp...</p>
            <motion.div className="h-1 w-24 bg-yellow-400 mt-2 animate-pulse" />
          </motion.div>
        )}

        {/* Step 5: Booking the Call */}
        {stepIndex === 4 && (
          <motion.div
            key="step-5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute text-center"
          >
            <h2 className="text-2xl font-semibold">📞 Call Scheduled</h2>
            <p className="text-gray-300">Lead responded! Your sales call is booked.</p>
            <motion.div
              className="w-12 h-12 border-4 border-green-400 border-solid rounded-full animate-ping mx-auto mt-4"
            />
          </motion.div>
        )}
      </div>

      {/* Call-To-Actions */}
      <div className="mt-10 flex gap-6">
        <button
          onClick={() => router.push("/signup")}
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg rounded-lg shadow-lg transition-all"
        >
          Get Started Now
        </button>
        <button
          onClick={() => window.open("https://calendly.com/bruceleads", "_blank")}
          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold text-lg rounded-lg shadow-lg transition-all"
        >
          Book a Call
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-gray-500">
        <p>© 2025 Bruce Leads. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
