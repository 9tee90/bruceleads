"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Lead {
  name: string;
  funding: string;
  hiring: string;
  score: number;
}

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch Leads from API
  const fetchLeads = async () => {
    setLoading(true);
    const response = await fetch("/api/leads");
    const data = await response.json();
    setLeads(data.leads);
    setLoading(false);
  };

  // Handle Email Signup for Early Access
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: email, company: "Test Company", industry: "SaaS" }),
    });

    const data = await response.json();
    setMessage(data.message || "You're signed up!");
    setEmail("");
  };

  // Demo Login - Redirect to Dashboard
  const handleDemoLogin = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      {/* Hero Section */}
      <h1 className="text-5xl font-bold text-yellow-500 text-center">
        🚀 Apollo is Down. <br /> What’s Next?
      </h1>
      <p className="text-lg text-gray-300 mt-4 text-center">
        AI-powered, compliant lead intelligence that **never gets shut down**.
      </p>

      {/* Signup Form */}
      <form onSubmit={handleSignup} className="mt-6 flex flex-col items-center gap-4">
        <input
          type="email"
          className="px-4 py-3 border border-gray-700 rounded-lg text-lg w-96 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Enter your email for early access"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg rounded-lg shadow-lg transition-all"
        >
          Get Early Access
        </button>
      </form>
      {message && <p className="mt-4 text-green-400">{message}</p>}

      {/* Fetch Leads Section */}
      <button
        onClick={fetchLeads}
        className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white font-bold text-lg rounded-lg shadow-lg transition-all"
      >
        {loading ? "Fetching Leads..." : "Get Intent-Based Leads"}
      </button>

      {/* Demo Login Button */}
      <button
        onClick={handleDemoLogin}
        className="mt-6 px-6 py-3 bg-green-500 hover:bg-green-700 text-white font-bold text-lg rounded-lg shadow-lg transition-all"
      >
        Demo Login
      </button>

      {/* Display Leads */}
      <div className="mt-6 w-full max-w-4xl">
        {leads.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leads.map((lead, index) => (
              <div key={index} className="p-4 bg-gray-800 border border-yellow-500 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gold-500">{lead.name}</h3>
                <p className="text-gray-300 mt-2">Funding: {lead.funding}</p>
                <p className="text-gray-300">Hiring: {lead.hiring}</p>
                <p className="text-yellow-400 font-bold">Score: {lead.score.toFixed(1)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
