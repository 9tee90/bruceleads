"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
        initial={{ opacity: 0, y: -30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }} 
        className="text-center mt-24 max-w-5xl"
      >
        <h1 className="text-6xl font-bold text-gray-900 leading-tight">
          <strong>Bruce Leads. You Close.</strong>
        </h1>
        <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
          AI-driven <strong>prospecting for recruiters & B2B sales teams.</strong>  
          Find <strong>expanding companies, hiring surges, and funding rounds</strong>—then engage instantly.
        </p>

        <motion.div 
          className="mt-8 flex gap-4 justify-center"
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <motion.button
            onClick={() => window.open("https://calendly.com/beyondbusinessgroup/30min", "_blank")}
            className="px-8 py-4 bg-black hover:bg-gray-800 text-white font-bold text-xl rounded-lg shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🚀 <strong>Get AI-Scored Leads Now</strong>
          </motion.button>
          <motion.button
            onClick={() => window.open("https://calendly.com/beyondbusinessgroup/30min", "_blank")}
            className="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-black font-bold text-xl rounded-lg shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            📞 <strong>Book a Call</strong>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* 🔥 BUILT WITH EXPERTS FROM… */}
      <motion.div 
        className="mt-16 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h3 className="text-lg text-gray-500">Built with insights from top experts:</h3>
        <motion.div 
          className="mt-6 flex flex-wrap justify-center gap-8 opacity-90"
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, staggerChildren: 0.3 }}
        >
          <img src="/logos/adobe.png" className="h-12" alt="Adobe" />
          <img src="/logos/google.png" className="h-12" alt="Google" />
          <img src="/logos/linkedin.png" className="h-12" alt="LinkedIn" />
          <img src="/logos/microsoft.png" className="h-12" alt="Microsoft" />
          <img src="/logos/salesforce.png" className="h-12" alt="Salesforce" />
          <img src="/logos/SAP.png" className="h-12" alt="SAP" />
        </motion.div>
      </motion.div>

      {/* 📊 REAL-TIME OPPORTUNITIES DETECTED */}
      <div className="mt-20 text-center">
        <p className="text-2xl text-gray-500">Real-Time Opportunities Detected:</p>
        <div className="relative h-16 overflow-hidden mt-2">
          <AnimatePresence mode="wait">
            <motion.p
              key={liveLeads}
              initial={{ opacity: 0, y: 20, position: "absolute" }}
              animate={{ opacity: 1, y: 0, position: "absolute" }}
              exit={{ opacity: 0, y: -20, position: "absolute" }}
              transition={{ duration: 0.4 }}
              className="text-6xl font-bold text-green-500 w-full"
            >
              {liveLeads.toLocaleString()}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* 🔥 HOW BRUCE WORKS – CARDS RESTORED */}
      <motion.div 
        className="mt-24 max-w-6xl text-center"
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold text-gray-900"><strong>How Bruce Works</strong></h2>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.3 }}
        >
          <motion.div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900">📡 <strong>Hiring Surges & Job Reposts</strong></h3>
            <p className="text-gray-600 mt-2">AI tracks hiring spikes to surface hot leads.</p>
          </motion.div>
          <motion.div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900">💰 <strong>Funding Rounds & M&A Activity</strong></h3>
            <p className="text-gray-600 mt-2">Detect companies expanding after funding.</p>
          </motion.div>
          <motion.div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900">📞 <strong>AI-Powered Outreach</strong></h3>
            <p className="text-gray-600 mt-2">Generate high-converting messages in seconds.</p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 🆚 COMPARISON TABLE */}
      <motion.div 
        className="mt-12 max-w-6xl"
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
      >
        <ComparisonTable />
      </motion.div>
{/* 🚀 FINAL CTA BEFORE FOOTER */}
<motion.div 
  className="mt-24 text-center max-w-4xl"
  initial={{ opacity: 0, y: 20 }} 
  whileInView={{ opacity: 1, y: 0 }} 
  transition={{ duration: 1 }}
>
  <h3 className="text-3xl font-semibold text-gray-900"><strong>Smart Leads. Faster Deals.</strong></h3>
  <p className="text-lg text-gray-600 mt-3">Join agencies using <strong>Bruce to unlock new business—effortlessly.</strong></p>
  <motion.div className="mt-6 flex gap-4 justify-center">
    <motion.button 
      onClick={() => window.open("https://calendly.com/beyondbusinessgroup/30min", "_blank")}
      className="px-8 py-4 bg-black text-white font-bold text-xl rounded-lg shadow-lg"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      🚀 <strong>Start Now</strong>
    </motion.button>
    <motion.button 
      onClick={() => window.open("https://calendly.com/beyondbusinessgroup/30min", "_blank")}
      className="px-8 py-4 bg-gray-200 text-black font-bold text-xl rounded-lg shadow-lg"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      📞 <strong>Book a Call</strong>
    </motion.button>
  </motion.div>
</motion.div>

      {/* 🌎 FINAL FOOTER */}
      <footer className="mt-24 bg-gray-900 text-white text-center p-8 w-full">
        <p className="text-lg"><strong>Bruce Leads</strong> – The AI Growth Engine for Recruiters.</p>
        <p className="text-sm mt-2 opacity-75">© 2025 Bruce Leads. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
