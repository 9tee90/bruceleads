"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ComparisonTable from "../app/components/ComparisonTable";

export default function Home() {
  const router = useRouter();
  const [liveLeads, setLiveLeads] = useState(15002);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveLeads((prev) => prev + Math.floor(Math.random() * 10) + 1);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#F8F9FA] text-black min-h-screen flex flex-col items-center px-6 font-sans">
      
      {/* 🚀 HERO SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }} 
        className="text-center mt-24 max-w-5xl"
      >
        <h1 className="text-6xl font-bold text-gray-900 leading-tight">
          <strong>Bruce Leads. You Close.</strong>
        </h1>
        <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
          AI-driven <strong>prospecting for recruiters & B2B sales teams.</strong>  
          Find <strong>expanding companies, hiring surges, and funding rounds</strong>—then engage instantly.
        </p>

        <div className="mt-8 flex gap-4 justify-center">
          <button
            onClick={() => window.open("https://calendly.com/beyondbusinessgroup/30min", "_blank")}
            className="px-8 py-4 bg-black hover:bg-gray-800 text-white font-bold text-xl rounded-lg shadow-lg transition-all"
          >
            🚀 <strong>Get AI-Scored Leads Now</strong>
          </button>
          <button
            onClick={() => window.open("https://calendly.com/beyondbusinessgroup/30min", "_blank")}
            className="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-black font-bold text-xl rounded-lg shadow-lg transition-all"
          >
            📞 <strong>Book a Call</strong>
          </button>
        </div>
      </motion.div>

      {/* 🔥 BUILT WITH EXPERTS FROM… */}
      <div className="mt-16 text-center">
        <h3 className="text-lg text-gray-500">Built with insights from top experts:</h3>
        <div className="mt-6 flex flex-wrap justify-center gap-8 opacity-90">
          <img src="/logos/adobe.png" className="h-12" alt="Adobe" />
          <img src="/logos/google.png" className="h-12" alt="Google" />
          <img src="/logos/linkedin.png" className="h-12" alt="LinkedIn" />
          <img src="/logos/microsoft.png" className="h-12" alt="Microsoft" />
          <img src="/logos/salesforce.png" className="h-12" alt="Salesforce" />
          <img src="/logos/SAP.png" className="h-12" alt="SAP" />
        </div>
      </div>

      {/* 🔥 AI SMART TRIGGERS – HOW BRUCE WORKS */}
      <div className="mt-24 max-w-6xl text-center">
        <h2 className="text-4xl font-bold text-gray-900"><strong>Leads That Matter. Delivered Daily.</strong></h2>
        <p className="text-lg text-gray-600 mt-3">
          <strong>Bruce scans 50+ data sources</strong> to surface <strong>companies ready to hire & expand.</strong>  
          Engage with <strong>decision-makers before competitors even know.</strong>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900">📡 <strong>Hiring Surges & Job Reposts</strong></h3>
            <p className="text-gray-600 mt-2">Track <strong>job board reposts & sudden hiring spikes</strong> to spot growth companies.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900">💰 <strong>Funding Rounds & M&A Activity</strong></h3>
            <p className="text-gray-600 mt-2">Find companies <strong>expanding after funding or acquisitions</strong>—before your competition does.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900">📞 <strong>AI-Powered Outreach</strong></h3>
            <p className="text-gray-600 mt-2">Generate <strong>hyper-personalized LinkedIn & email scripts</strong> with AI.</p>
          </div>
        </div>
      </div>

      {/* 📊 REAL-TIME AI ACTIVITY */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 1, delay: 0.4 }} 
        className="mt-24 bg-white p-6 rounded-lg shadow-lg text-center max-w-4xl"
      >
        <h3 className="text-2xl font-semibold text-gray-900">
          Bruce is Tracking <strong>{liveLeads}</strong> Hiring & Market Signals Right Now
        </h3>
      </motion.div>

      {/* 🆚 WHY BRUCE? STRONGER DIFFERENTIATION SECTION */}
      <div className="mt-24 max-w-6xl text-center">
        <h2 className="text-4xl font-bold text-gray-900"><strong>Why Top Recruiters Choose Bruce</strong></h2>
        <p className="text-lg text-gray-600 mt-3">
          <strong>No more manual research. No more wasted outreach.</strong>  
          Bruce delivers <strong>warm, sales-ready conversations.</strong>
        </p>
      </div>

      {/* 🆚 WHY BRUCE WINS – FINALIZED COMPARISON TABLE */}
      <div className="mt-12 max-w-6xl">
        <ComparisonTable />
      </div>

      {/* 🚀 GETTING STARTED SECTION */}
      <div className="mt-24 text-center max-w-4xl">
        <h3 className="text-3xl font-semibold text-gray-900"><strong>Smart Leads. Faster Deals.</strong></h3>
        <p className="text-lg text-gray-600 mt-3">Join agencies using <strong>Bruce to unlock new business—effortlessly.</strong></p>
        <div className="mt-6 flex gap-4 justify-center">
          <button className="px-8 py-4 bg-black text-white font-bold text-xl rounded-lg shadow-lg">🚀 <strong>Start Now</strong></button>
          <button className="px-8 py-4 bg-gray-200 text-black font-bold text-xl rounded-lg shadow-lg">📞 <strong>Book a Call</strong></button>
        </div>
      </div>

      {/* 🌎 FINAL ENTERPRISE-GRADE FOOTER */}
      <footer className="mt-24 bg-gray-900 text-white text-center p-8 w-full">
        <p className="text-lg"><strong>Bruce Leads</strong> – The AI Growth Engine for Recruiters.</p>
        <p className="text-sm mt-2 opacity-75">© 2025 Bruce Leads. All Rights Reserved.</p>
      </footer>

    </div>
  );
}
