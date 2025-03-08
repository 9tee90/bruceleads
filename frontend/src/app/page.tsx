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
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    setMessage("🎉 You're In! What’s Next?");
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center justify-center px-6">
      {/* Top Navigation */}
      <nav className="absolute top-0 w-full flex justify-between px-8 py-4">
        <Image src="/logo.png" alt="Bruce Leads" width={150} height={50} />
        <button
          onClick={() => router.push("/admin")}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg transition-all"
        >
          Demo Login
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

        {/* Post-Signup Options */}
        {message && (
          <div className="mt-6 flex flex-col items-center gap-4">
            <p className="text-green-400 text-lg font-semibold">{message}</p>
            <button
              onClick={() => router.push("/demo")}
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition-all"
            >
              Try Bruce Leads
            </button>
            <button
              onClick={() => router.push("/get-free-leads")}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg transition-all"
            >
              Get Free Leads
            </button>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl text-center">
        <div className="p-6 bg-gray-800 border border-yellow-500 rounded-lg shadow-lg hover:scale-105 transition-all">
          <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
            🔍 Find High-Intent Triggers
          </h3>
          <p className="text-gray-400 mt-2">We scan reports, news, and signals to tell you WHY this lead is ready to buy NOW.</p>
        </div>
        <div className="p-6 bg-gray-800 border border-yellow-500 rounded-lg shadow-lg hover:scale-105 transition-all">
          <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
            📡 Get Smart Insights
          </h3>
          <p className="text-gray-400 mt-2">Funding rounds, hiring trends, competitor analysis—all automated.</p>
        </div>
        <div className="p-6 bg-gray-800 border border-yellow-500 rounded-lg shadow-lg hover:scale-105 transition-all">
          <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
            🤖 AI-Powered Outreach
          </h3>
          <p className="text-gray-400 mt-2">Use AI-generated messaging based on the exact context of why they should buy.</p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-12 flex gap-6">
        <button
          onClick={() => router.push("/demo")}
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg rounded-lg shadow-lg transition-all"
        >
          Try Bruce Leads
        </button>
        <button
          onClick={() => router.push("/get-free-leads")}
          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold text-lg rounded-lg shadow-lg transition-all"
        >
          Get Free Leads
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-16 pb-8 text-gray-500">
        <p>© 2025 Bruce Leads. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
