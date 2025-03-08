"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Lead {
  name: string;
  funding: string;
  hiring: string;
  score: number;
}

export default function Dashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");

  // Fetch Leads from API
  const fetchLeads = async () => {
    setLoading(true);
    const response = await fetch("/api/leads");
    const data = await response.json();
    setLeads(data.leads);
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Filter Leads
  const filteredLeads = leads.filter((lead) => {
    if (filter === "high-score") return lead.score > 50;
    if (filter === "funded") return lead.funding !== "N/A";
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-bold text-yellow-500">🚀 Your Sales Dashboard</h1>
      <p className="text-lg text-gray-300 mt-4">View and manage your AI-sourced high-intent leads.</p>

      {/* Filters */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-md ${filter === "all" ? "bg-blue-500" : "bg-gray-700"}`}
        >
          All Leads
        </button>
        <button
          onClick={() => setFilter("high-score")}
          className={`px-4 py-2 rounded-md ${filter === "high-score" ? "bg-blue-500" : "bg-gray-700"}`}
        >
          High-Score Leads
        </button>
        <button
          onClick={() => setFilter("funded")}
          className={`px-4 py-2 rounded-md ${filter === "funded" ? "bg-blue-500" : "bg-gray-700"}`}
        >
          Funded Companies
        </button>
      </div>

      {/* Lead List */}
      <div className="mt-6 w-full max-w-4xl">
        {loading ? (
          <p className="text-gray-400">Loading leads...</p>
        ) : filteredLeads.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredLeads.map((lead, index) => (
              <div key={index} className="p-4 bg-gray-800 border border-yellow-500 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-yellow-500">{lead.name}</h3>
                <p className="text-gray-300 mt-2">Funding: {lead.funding}</p>
                <p className="text-gray-300">Hiring: {lead.hiring}</p>
                <p className="text-yellow-400 font-bold">Score: {lead.score.toFixed(1)}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No leads found.</p>
        )}
      </div>

      {/* Logout Button */}
      <button
        onClick={() => router.push("/")}
        className="mt-6 px-6 py-3 bg-red-500 hover:bg-red-700 text-white font-bold text-lg rounded-lg shadow-lg transition-all"
      >
        Logout
      </button>
    </div>
  );
}
