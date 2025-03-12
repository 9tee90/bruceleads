"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ReviewSetup() {
  const router = useRouter();

  // Mock user selections (These would come from state or API in a real app)
  const [userSelections, setUserSelections] = useState({
    industry: "Technology",
    companySize: "51-200 Employees",
    leadIntent: "High (Funding & Hiring Signals)",
  });

  // Simulate loading user selections (In real implementation, fetch from API or localStorage)
  useEffect(() => {
    // If using localStorage or an API, retrieve data here
    // Example: setUserSelections(JSON.parse(localStorage.getItem("preferences")));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-6">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-yellow-400 mt-10">✅ Confirm Your Setup</h1>
      <p className="text-lg text-gray-300 mt-4 text-center">
        Here’s what Bruce Leads will track for you:
      </p>

      {/* User Selections Summary */}
      <div className="bg-gray-900 p-6 rounded-lg mt-4 w-80 border border-gray-700 shadow-lg">
        <p className="text-white"><strong>Industry:</strong> {userSelections.industry}</p>
        <p className="text-white"><strong>Company Size:</strong> {userSelections.companySize}</p>
        <p className="text-white"><strong>Lead Intent:</strong> {userSelections.leadIntent}</p>
      </div>

      <p className="text-gray-400 mt-6 text-center">
        You can adjust these settings anytime in your dashboard.
      </p>

      {/* Buttons - Modify Setup or Continue */}
      <div className="flex gap-4 mt-6">
        <button 
          onClick={() => router.push("/onboarding/preferences")}
          className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg shadow-md"
        >
          🔄 Modify Setup
        </button>

        <button 
          onClick={() => router.push("/dashboard")}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-bold rounded-lg shadow-md"
        >
          🚀 Start Finding Leads →
        </button>
      </div>
    </div>
  );
}
