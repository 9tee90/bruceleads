"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import AITriggerAnimation from "../components/AITriggerAnimation";

export default function Dashboard() {
  const router = useRouter();

  // Mock lead data (replace with API later)
  const [leads, setLeads] = useState([
    { name: "Acme Corp", intent: "92%" },
    { name: "Beta Industries", intent: "85%" },
    { name: "Gamma Solutions", intent: "78%" },
  ]);

  // Simulate AI updating leads
  useEffect(() => {
    const interval = setInterval(() => {
      setLeads((prevLeads) => [
        ...prevLeads,
        { name: `New Lead ${prevLeads.length + 1}`, intent: `${Math.floor(Math.random() * 100)}%` },
      ]);
    }, 5000); // Add a new lead every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-6">
      {/* Dashboard Header */}
      <h1 className="text-4xl font-bold text-yellow-400 mt-10">🚀 AI Command Center</h1>
      <p className="text-lg text-gray-300 mt-4 text-center">
        Your leads are ranked, prioritized, and ready for engagement.
      </p>

      {/* AI Detection Animation */}
      <div className="w-full max-w-3xl mt-8">
        <AITriggerAnimation />
      </div>

      {/* Detected Leads Section */}
      <div className="mt-10 w-full max-w-3xl bg-gray-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-yellow-400">📌 Detected Leads</h2>
        <p className="text-gray-400 mb-4">Live AI-detected leads appear here.</p>

        <div className="space-y-2">
          {leads.map((lead, index) => (
            <div key={index} className="bg-gray-800 p-3 rounded-lg flex justify-between">
              <span className="text-white">{lead.name}</span>
              <span className="text-yellow-400 font-semibold">{lead.intent} Intent</span>
            </div>
          ))}
        </div>
      </div>

      {/* Settings & Engagement Buttons */}
      <div className="flex gap-4 mt-6">
        <button 
          onClick={() => router.push("/onboarding")}
          className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg"
        >
          ⚙️ Adjust Preferences
        </button>

        <button 
          onClick={() => router.push("/dashboard/settings")}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg"
        >
          🔧 Manage Settings
        </button>

        <button 
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-bold rounded-lg"
        >
          📩 Auto-Engage Leads
        </button>
      </div>
    </div>
  );
}
