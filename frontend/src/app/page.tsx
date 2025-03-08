"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center justify-center px-6">
      {/* Top Navigation */}
      <nav className="absolute top-0 w-full flex justify-between px-8 py-4">
        <h1 className="text-2xl font-bold">Bruce Leads</h1>
        <button
          onClick={() => router.push("/dashboard")}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg transition-all"
        >
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <div className="text-center max-w-4xl mt-16">
        <h1 className="text-5xl font-extrabold text-yellow-400 flex items-center justify-center gap-3">
          🚀 Apollo is Down. <br /> What’s Next?
        </h1>
        <p className="text-lg text-gray-300 mt-4 tracking-wide">
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
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg rounded-full shadow-lg transition-all"
          >
            Get Early Access
          </button>
        </form>
        {message && <p className="mt-4 text-green-400">{message}</p>}
      </div>

      {/* Features Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl text-center">
        <div className="p-6 bg-gray-800 border border-yellow-500 rounded-lg shadow-lg hover:scale-105 transition-all">
          <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
            🔍 Set Your ICP
          </h3>
          <p className="text-gray-400 mt-2">Define your ideal leads with precision.</p>
        </div>
        <div className="p-6 bg-gray-800 border border-yellow-500 rounded-lg shadow-lg hover:scale-105 transition-all">
          <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
            📡 Get Intent-Based Alerts
          </h3>
          <p className="text-gray-400 mt-2">Stay ahead with real-time funding & hiring signals.</p>
        </div>
        <div className="p-6 bg-gray-800 border border-yellow-500 rounded-lg shadow-lg hover:scale-105 transition-all">
          <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
            🤖 AI-Powered Outreach
          </h3>
          <p className="text-gray-400 mt-2">Engage leads with **AI-generated messaging**.</p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-12 flex gap-6">
        <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg rounded-lg shadow-lg transition-all">
          Try Bruce Leads
        </button>
        <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold text-lg rounded-lg shadow-lg transition-all">
          Get Free Free
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-16 pb-8 text-gray-500">
        <p>© 2025 Bruce Leads. All Rights Reserved.</p>
      </footer>
    </div>
  );
}