"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ComparisonTable from "../app/components/ComparisonTable";
import AITriggerAnimation from "../app/components/AITriggerAnimation";

export default function Home() {
  const router = useRouter();
  const [liveLeads, setLiveLeads] = useState(15002);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveLeads((prev) => prev + Math.floor(Math.random() * 10) + 1);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <motion.div 
      className="bg-white text-gray-900 min-h-screen flex flex-col items-center px-6 font-sans"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* 🚀 HERO SECTION */}
      <motion.div 
        variants={itemVariants}
        className="text-center mt-24 max-w-5xl relative"
      >
        <motion.div
          className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-blue-50 to-green-50 rounded-full blur-3xl opacity-30 -z-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <h1 className="text-6xl font-light text-gray-800 leading-tight">
          <strong>Bruce Leads. You Close.</strong>
        </h1>
        <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto leading-relaxed">
          AI-driven <strong>prospecting for recruiters & B2B sales teams.</strong>  
          Find <strong>expanding companies, hiring surges, and funding rounds</strong>—then engage instantly.
        </p>

        <motion.div 
          className="mt-10 flex gap-4 justify-center"
          variants={itemVariants}
        >
          <motion.button
            onClick={() => window.open("https://calendly.com/beyondbusinessgroup/30min", "_blank")}
            className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-medium text-lg rounded-full shadow-lg transition-all"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
            whileTap={{ scale: 0.95 }}
          >
            🚀 <strong>Get Leads Now</strong>
          </motion.button>
          <motion.button
            onClick={() => window.open("https://calendly.com/beyondbusinessgroup/30min", "_blank")}
            className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-medium text-lg rounded-full shadow-lg border border-gray-200 transition-all"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
            whileTap={{ scale: 0.95 }}
          >
            📞 <strong>Book a Call</strong>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* 🔥 BUILT WITH EXPERTS FROM */}
      <motion.div 
        variants={itemVariants}
        className="mt-20 text-center"
      >
        <h3 className="text-base uppercase tracking-wider text-gray-500 font-medium">Built with sales experts from</h3>
        <motion.div 
          className="mt-8 flex flex-wrap justify-center gap-16 opacity-80 transition-all duration-500"
          variants={itemVariants}
        >
          {['adobe', 'google', 'linkedin', 'microsoft', 'salesforce', 'SAP'].map((logo) => (
            <motion.img
              key={logo}
              src={`/logos/${logo}.png`}
              className="h-8 hover:opacity-100 transition-all duration-300 filter grayscale hover:grayscale-0"
              alt={logo}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* 📊 REAL-TIME OPPORTUNITIES */}
      <motion.div 
        variants={itemVariants}
        className="mt-32 text-center relative w-full"
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-white -z-10"
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <h2 className="text-2xl font-light text-gray-600">Opportunities Found in Real-Time</h2>
        <div className="mt-8 flex items-center justify-center overflow-hidden">
          <div className="flex items-baseline">
            <AnimatePresence mode="popLayout">
              {liveLeads.toLocaleString().split('').map((digit, index) => (
                <motion.span
                  key={`${index}-${digit}`}
                  className={`inline-block w-[1ch] text-7xl font-light tracking-tight text-gray-900 tabular-nums ${digit === ',' ? 'w-[0.5ch] mx-1' : ''}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{
                    y: { type: "spring", stiffness: 400, damping: 25 },
                    opacity: { duration: 0.15 }
                  }}
                >
                  {digit}
                </motion.span>
              ))}
            </AnimatePresence>
            <motion.div 
              className="ml-4 text-green-500 text-base font-medium translate-y-2 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Active Leads
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* 🔥 HOW BRUCE WORKS */}
      <motion.div 
        variants={itemVariants}
        className="mt-32 max-w-6xl w-full px-6"
      >
        <div className="text-center mb-16">
          <h2 className="text-5xl font-light text-gray-900">How Bruce Works</h2>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Powered by AI, Bruce finds your next best opportunities through multiple data sources.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {[
            {
              icon: "📡",
              title: "Hiring Surges & Job Reposts",
              description: "AI monitors company hiring patterns to identify expansion signals and growth opportunities."
            },
            {
              icon: "💰",
              title: "Funding Rounds & M&A",
              description: "Track companies receiving new funding or going through strategic changes."
            },
            {
              icon: "🎯",
              title: "AI-Powered Outreach",
              description: "Generate personalized messages that convert, backed by behavioral analysis."
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className="group p-8 bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <motion.div 
                className="text-3xl mb-6 transform group-hover:scale-110 transition-transform duration-300"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-medium text-gray-900">{feature.title}</h3>
              <p className="mt-4 text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* 🤖 AI TRIGGER ANIMATION */}
      <motion.div 
        variants={itemVariants}
        className="mt-32 w-full px-6"
      >
        <div className="text-center mb-16">
          <h2 className="text-5xl font-light text-gray-900">See Bruce in Action</h2>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Watch how Bruce's AI engine transforms raw data into qualified opportunities.
          </p>
        </div>
        <AITriggerAnimation />
      </motion.div>

      {/* 🆚 COMPARISON TABLE */}
      <motion.div 
        variants={itemVariants}
        className="mt-32 max-w-6xl w-full"
      >
        <ComparisonTable />
      </motion.div>

      {/* 🚀 FINAL CTA */}
      <motion.div 
        variants={itemVariants}
        className="mt-32 text-center max-w-4xl relative"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white -z-10 rounded-3xl"
          animate={{
            scale: [1, 1.02, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <h3 className="text-4xl font-light text-gray-900">
          <strong>Smart Leads. Faster Deals.</strong>
        </h3>
        <p className="text-xl text-gray-600 mt-6 leading-relaxed">
          Join agencies using <strong>Bruce to unlock new business—effortlessly.</strong>
        </p>
        <motion.div className="mt-10 flex gap-6 justify-center">
          <motion.button 
            onClick={() => window.open("https://calendly.com/beyondbusinessgroup/30min", "_blank")}
            className="px-8 py-4 bg-gray-900 text-white font-bold text-xl rounded-full shadow-xl"
            whileHover={{ scale: 1.05, boxShadow: "0 25px 25px -5px rgb(0 0 0 / 0.1)" }}
            whileTap={{ scale: 0.95 }}
          >
            🚀 <strong>Start Now</strong>
          </motion.button>
          <motion.button 
            onClick={() => window.open("https://calendly.com/beyondbusinessgroup/30min", "_blank")}
            className="px-8 py-4 bg-white text-gray-900 font-bold text-xl rounded-full shadow-xl border border-gray-200"
            whileHover={{ scale: 1.05, boxShadow: "0 25px 25px -5px rgb(0 0 0 / 0.1)" }}
            whileTap={{ scale: 0.95 }}
          >
            📞 <strong>Book a Call</strong>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* 🌎 FOOTER */}
      <motion.footer 
        variants={itemVariants}
        className="mt-32 bg-gray-900 text-white text-center p-8 w-full"
      >
        <p className="text-lg font-light">
          <strong>Bruce Leads</strong> – The AI Growth Engine for Recruiters.
        </p>
        <p className="text-sm mt-2 opacity-75">© 2025 Bruce Leads. All Rights Reserved.</p>
      </motion.footer>
    </motion.div>
  );
}
