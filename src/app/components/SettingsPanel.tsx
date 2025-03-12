"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function SettingsPanel() {
  const [aiNotifications, setAiNotifications] = useState(true);
  const [leadFilter, setLeadFilter] = useState("high-intent");

  return (
    <motion.div
      className="bg-gray-900 p-6 rounded-lg text-center mt-6 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-xl font-bold text-yellow-400">
        ⚙️ AI Personalization & Lead Settings
      </h2>
      <p className="text-gray-300 mb-4">
        Customize your AI tracking, lead filters, and notification settings.
      </p>

      {/* AI Notification Toggle */}
      <div className="flex justify-between bg-gray-800 p-4 rounded-lg mb-4">
        <span className="text-white">Enable AI Lead Notifications</span>
        <button
          onClick={() => setAiNotifications(!aiNotifications)}
          className={`px-4 py-2 font-bold rounded-lg transition-all ${
            aiNotifications ? "bg-green-500 hover:bg-green-600 text-black" : "bg-red-500 hover:bg-red-600 text-white"
          }`}
        >
          {aiNotifications ? "✅ ON" : "❌ OFF"}
        </button>
      </div>

      {/* Lead Filtering Options */}
      <div className="flex flex-col bg-gray-800 p-4 rounded-lg mb-4">
        <span className="text-white mb-2">Filter Leads By Intent:</span>
        <select
          value={leadFilter}
          onChange={(e) => setLeadFilter(e.target.value)}
          className="p-2 rounded-lg text-black bg-white"
        >
          <option value="high-intent">🔥 High-Intent Only</option>
          <option value="all">🌎 All Detected Leads</option>
          <option value="custom">🎯 Custom Criteria</option>
        </select>
      </div>

      {/* Save Settings Button */}
      <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-all">
        💾 Save Settings
      </button>
    </motion.div>
  );
}
