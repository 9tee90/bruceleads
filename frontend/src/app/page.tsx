"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AITriggerAnimation from "./components/AITriggerAnimation";

const companies = [
  { name: "Salesforce", logo: "/logos/Salesforce.png" },
  { name: "Adobe", logo: "/logos/adobe.png" },
  { name: "Microsoft", logo: "/logos/microsoft.png" },
  { name: "LinkedIn", logo: "/logos/linkedin.png" },
  { name: "Google", logo: "/logos/google.png" },
  { name: "SAP", logo: "/logos/SAP.png" },
];

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mt-16"
      >
        <h1 className="text-6xl font-extrabold text-yellow-400">
          💡 AI-Powered Revenue Signals: <br /> Bruce Leads, You Close. 📈
        </h1>
        <p className="text-lg text-gray-300 mt-4 tracking-wide max-w-3xl mx-auto">
          Bruce Leads continuously scans 50+ sales intelligence sources to detect <br />
          <strong>WHO to contact, WHY they’re ready, and WHEN to reach out.</strong> <br /><br />
          No more cold outreach—<span className="text-yellow-400 font-semibold">only engage high-intent buyers.</span>
        </p>

        {/* Call to Action */}
        <div className="mt-8 flex gap-4 justify-center">
          <button
            onClick={() => router.push("/signup")}
            className="px-6 py-3 bg-green-500 hover:bg-green-700 text-black font-bold text-lg rounded-lg shadow-lg transition-all"
          >
            🚀 Request Early Access & Close More Deals
          </button>
        </div>
      </motion.div>

      {/* AI Process Animation - The Market Radar */}
      <AITriggerAnimation />

      {/* Logos Display Without a Box */}
      <div className="py-10 text-white text-center mt-12 w-full">
        <h2 className="text-3xl font-semibold mb-6">🚀 Trusted by Sales Experts from Industry Leaders</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {companies.map((company, index) => (
            <img key={index} src={company.logo} alt={company.name} className="h-12 grayscale hover:grayscale-0 transition-all" />
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl text-center">
        <motion.div className="p-6 bg-gray-800 border border-yellow-500 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">🌎 Global Sales Intelligence</h3>
          <p className="text-gray-400 mt-2">
            Track high-intent buying signals from <strong>funding rounds, job changes, & tech adoption</strong> in the US, EU, Middle East, APAC, & LATAM.
          </p>
        </motion.div>
        <motion.div className="p-6 bg-gray-800 border border-blue-500 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">🚀 Automated Lead Scoring</h3>
          <p className="text-gray-400 mt-2">
            AI ranks leads based on trigger strength & urgency, ensuring you <strong>only contact the right prospects at the right time.</strong>
          </p>
        </motion.div>
        <motion.div className="p-6 bg-gray-800 border border-green-500 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">🤖 AI-Powered Outreach</h3>
          <p className="text-gray-400 mt-2">
            Auto-generate <strong>highly relevant LinkedIn, Email, and Call Scripts</strong>—personalized for every lead.
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="mt-16 pb-8 text-gray-500">
        <p>© 2025 Bruce Leads. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
