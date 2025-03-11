"use client";
import { motion } from "framer-motion";

const comparisonData = [
  { feature: "AI-Powered Sales Triggers", bruce: "✅ Yes", apollo: "❌ No", seamless: "❌ No", clay: "✅ Partial" },
  { feature: "Ethical, No LinkedIn Ban Risk", bruce: "✅ 100% Safe", apollo: "❌ Risky Scraping", seamless: "❌ Banned", clay: "✅ Safe" },
  { feature: "Real-Time Market Signal Tracking", bruce: "✅ Yes", apollo: "❌ No", seamless: "❌ No", clay: "✅ Limited" },
  { feature: "Automated Personalized Outreach", bruce: "✅ AI-Crafted", apollo: "❌ Manual Only", seamless: "❌ Spam Risk", clay: "✅ Some" },
  { feature: "Built for Recruiters & Sales", bruce: "✅ Yes", apollo: "❌ No", seamless: "❌ No", clay: "✅ Partial" },
];

export default function ComparisonTable() {
  return (
    <motion.div
      className="bg-gray-900 p-8 rounded-lg text-center mt-6 max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">
        🏆 Why Bruce Leads Wins
      </h2>
      <p className="text-gray-300 mb-6">
        See how we compare to Apollo, Seamless, and Clay.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-3 text-left">Feature</th>
              <th className="p-3 text-center text-green-400">Bruce Leads 🏆</th>
              <th className="p-3 text-center text-red-400">Apollo.io ❌</th>
              <th className="p-3 text-center text-red-400">Seamless.ai ❌</th>
              <th className="p-3 text-center text-yellow-400">Clay ⚡</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((item, index) => (
              <motion.tr
                key={index}
                className={`border-b border-gray-700 ${
                  index % 2 === 0 ? "bg-gray-800" : "bg-gray-850"
                }`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <td className="p-3 text-white">{item.feature}</td>
                <td className="p-3 text-center font-bold text-green-400">{item.bruce}</td>
                <td className="p-3 text-center font-bold text-red-400">{item.apollo}</td>
                <td className="p-3 text-center font-bold text-red-400">{item.seamless}</td>
                <td className="p-3 text-center font-bold text-yellow-400">{item.clay}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
