"use client";
import React from "react";
import { motion } from "framer-motion";

export default function ComparisonTable() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6 }} 
      className="bg-white p-6 rounded-lg shadow-md mt-8 max-w-5xl mx-auto border border-gray-200"
    >
      {/* Title */}
      <h2 className="text-gray-900 text-2xl font-bold flex items-center gap-2">
        🏆 Why Bruce Leads Wins
      </h2>
      <p className="text-gray-600 text-sm mt-1">
        Bruce Leads isn’t just another lead tool—it’s an <strong>AI-driven prospecting machine.</strong> See how we compare.
      </p>

      {/* Table Container */}
      <div className="overflow-x-auto mt-4">
        <table className="w-full border-collapse border border-gray-300 text-gray-900">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left text-gray-700">Feature</th>
              <th className="p-3 text-center font-semibold text-gray-900">Bruce Leads 🏆</th>
              <th className="p-3 text-center text-gray-500">Apollo.io</th>
              <th className="p-3 text-center text-gray-500">Seamless.ai</th>
              <th className="p-3 text-center text-gray-500">Clay</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-t border-gray-300">
              <td className="p-3 font-semibold">AI-Powered Sales Triggers</td>
              <td className="p-3 text-center text-green-500 font-semibold">✅ Yes</td>
              <td className="p-3 text-center text-red-500">❌ No</td>
              <td className="p-3 text-center text-red-500">❌ No</td>
              <td className="p-3 text-center text-red-500">❌ No</td>
            </tr>
            <tr className="border-t border-gray-300">
              <td className="p-3 font-semibold">Ethical, No LinkedIn Ban Risk</td>
              <td className="p-3 text-center text-green-500 font-semibold">✅ 100% Safe</td>
              <td className="p-3 text-center text-red-500">❌ Risky Scraping</td>
              <td className="p-3 text-center text-red-500">❌ Banned</td>
              <td className="p-3 text-center text-red-500">❌ Risky</td>
            </tr>
            <tr className="border-t border-gray-300">
              <td className="p-3 font-semibold">Real-Time Hiring & Market Tracking</td>
              <td className="p-3 text-center text-green-500 font-semibold">✅ Yes</td>
              <td className="p-3 text-center text-red-500">❌ No</td>
              <td className="p-3 text-center text-red-500">❌ No</td>
              <td className="p-3 text-center text-red-500">❌ No</td>
            </tr>
            <tr className="border-t border-gray-300">
              <td className="p-3 font-semibold">Automated Personalized Outreach</td>
              <td className="p-3 text-center text-green-500 font-semibold">✅ AI-Crafted</td>
              <td className="p-3 text-center text-red-500">❌ Manual Only</td>
              <td className="p-3 text-center text-red-500">❌ Spam Risk</td>
              <td className="p-3 text-center text-red-500">❌ Limited</td>
            </tr>
            <tr className="border-t border-gray-300">
              <td className="p-3 font-semibold">Built for Recruiters & Sales</td>
              <td className="p-3 text-center text-green-500 font-semibold">✅ Yes</td>
              <td className="p-3 text-center text-red-500">❌ No</td>
              <td className="p-3 text-center text-red-500">❌ No</td>
              <td className="p-3 text-center text-red-500">❌ Partial</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* CTA Button */}
      <div className="flex justify-center mt-6">
        <button 
          className="px-6 py-3 bg-black hover:bg-black-500 text-white font-bold text-lg rounded-lg shadow-md transition-all"
          onClick={() => window.open("https://calendly.com/beyondbusinessgroup/30min", "_blank")}
        >
          🚀 Start Finding High-Intent Leads Now
        </button>
      </div>
    </motion.div>
  );
}
