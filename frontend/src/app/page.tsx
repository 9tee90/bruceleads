"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AITriggerAnimation from "../app/components/AITriggerAnimation";
import ComparisonTable from "../app/components/ComparisonTable";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex flex-col items-center px-6">
      
      {/* 🚀 AI-Powered Hero Section - Fully Polished */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mt-16 max-w-5xl"
      >
        <h1 className="text-6xl font-extrabold text-yellow-400 leading-tight">
          Bruce Leads: The AI Sales Sidekick
        </h1>
        <p className="text-lg text-gray-300 mt-4 max-w-3xl mx-auto">
          🚀 Find high-intent buyers before your competitors do. Bruce Leads scans <span className="text-yellow-400 font-bold">50+ market signals</span> to deliver timely, sales-ready leads—<span className="text-green-400 font-bold">zero guesswork.</span>
        </p>
        <p className="text-xl font-bold text-green-400 mt-4">
          🔸 AI-Powered Triggers | No More 'Cold Outreach' | 10x Faster Prospecting
        </p>

        {/* 🎯 Action-Oriented CTAs */}
        <div className="mt-8 flex gap-4 justify-center">
          <button
            onClick={() => router.push("/signup")}
            className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-xl rounded-lg shadow-lg transition-all"
          >
            🚀 Try Free – Get 5 AI Leads Now
          </button>
          <button
            onClick={() => router.push("/see-how-it-works")}
            className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold text-xl rounded-lg shadow-lg transition-all"
          >
            🎥 See Bruce in Action
          </button>
        </div>
      </motion.div>

      {/* 🎬 AI Process Animation - Dynamic Live Demo */}
      <AITriggerAnimation />

      {/* 📊 Why Bruce Leads Wins - Hard-Hitting Comparison Table */}
      <ComparisonTable />

      {/* 🏆 The AI Sales Sidekick (Rewritten for Simplicity & Impact) */}
      <div className="mt-16 p-6 bg-[#1E293B] rounded-lg shadow-lg text-center max-w-5xl">
        <h3 className="text-2xl font-semibold text-yellow-400">
          🚀 The AI Sales Sidekick That Does the Hard Work For You
        </h3>
        <p className="text-gray-300 mt-2 text-lg max-w-3xl mx-auto">
          ❌ Stop wasting time on bad leads. ✅ Bruce Leads scans <span className="text-yellow-400 font-bold">hiring trends, funding, & growth signals</span> to surface high-intent prospects automatically.
        </p>

        {/* 🛠 Key Features - Rewritten for Clarity & Impact */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-yellow-500">
            <h4 className="text-xl font-semibold">🔍 AI-Powered Smart Triggers</h4>
            <p className="text-gray-400 mt-2">Live tracking of funding rounds, hiring surges, and market trends to reveal hot leads first.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-blue-500">
            <h4 className="text-xl font-semibold">⚡ 10x Faster Than Manual Research</h4>
            <p className="text-gray-400 mt-2">AI scans 50+ sources instantly, replacing hours of prospecting with real-time insights.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-green-500">
            <h4 className="text-xl font-semibold">📩 AI-Crafted Personalized Outreach</h4>
            <p className="text-gray-400 mt-2">Custom AI-generated messaging for LinkedIn, email, and sales calls. No spam. No bans.</p>
          </div>
        </div>
      </div>

      {/* 🎯 Call-to-Action for Early Access */}
      <div className="mt-16 p-6 bg-[#1E293B] rounded-lg shadow-lg text-center max-w-4xl">
        <h3 className="text-xl font-semibold text-yellow-400">
          Join the AI Prospecting Revolution
        </h3>
        <p className="text-gray-400 mt-2">
          Get early access to AI-driven lead intelligence before the public launch.
        </p>
        <button
          onClick={() => router.push("/signup")}
          className="mt-4 px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-bold rounded-lg text-lg"
        >
          ✅ Sign Up Now
        </button>
      </div>

      {/* 📌 Sticky CTA Bar for Continuous Conversion */}
      <motion.div
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 px-6 py-3 rounded-full shadow-lg flex gap-4 items-center cursor-pointer hover:bg-yellow-600 transition-all"
        onClick={() => router.push("/signup")}
      >
        <span className="text-black font-bold">🚀 Start Finding High-Intent Leads Now</span>
      </motion.div>

      {/* 🌎 Trusted by Recruiters, Sales Leaders, & Agencies */}
      <footer className="mt-16 pb-8 text-gray-500">
        <p>© 2025 Bruce Leads. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
