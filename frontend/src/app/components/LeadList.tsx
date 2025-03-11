"use client";
import { motion } from "framer-motion";

const leads = [
  { company: "Acme Corp", intent: "92%", color: "bg-green-500" },
  { company: "Beta Industries", intent: "85%", color: "bg-yellow-500" },
  { company: "Gamma Solutions", intent: "78%", color: "bg-orange-500" },
  { company: "Delta Tech", intent: "88%", color: "bg-green-500" },
  { company: "Epsilon Ltd", intent: "91%", color: "bg-green-500" },
  { company: "Zeta Networks", intent: "80%", color: "bg-yellow-500" },
  { company: "Theta Enterprises", intent: "95%", color: "bg-green-500" },
  { company: "Iota Systems", intent: "89%", color: "bg-green-500" },
  { company: "Kappa Analytics", intent: "76%", color: "bg-orange-500" },
  { company: "Lambda AI", intent: "94%", color: "bg-green-500" },
];

export default function LeadList() {
  return (
    <motion.div
      className="bg-gray-900 p-6 rounded-lg text-center mt-6 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-xl font-bold text-yellow-400">
        🎯 High-Intent Leads Detected
      </h2>
      <p className="text-gray-300 mb-4">
        AI has identified your top-ranked leads. Ready to engage?
      </p>

      <div className="bg-gray-800 rounded-lg shadow-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-3 text-white">Company</th>
              <th className="p-3 text-white">Intent Score</th>
              <th className="p-3 text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, index) => (
              <motion.tr
                key={index}
                className="border-b border-gray-700 hover:bg-gray-750 transition-all"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <td className="p-3 text-white">{lead.company}</td>
                <td className={`p-3 text-black font-bold ${lead.color} rounded-lg text-center`}>
                  {lead.intent}
                </td>
                <td className="p-3">
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm">
                    🔗 View Profile
                  </button>
                  <button className="ml-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm">
                    ✉️ Send Outreach
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
