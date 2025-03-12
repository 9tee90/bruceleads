"use client";
import { useRouter } from "next/navigation";

export default function Preferences() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-6">
      <h1 className="text-4xl font-bold text-yellow-400 mt-10">📌 Define Your Ideal Leads</h1>
<p className="text-lg text-gray-300 mt-4 text-center">
  Select your target industries, company size, and lead intent.
</p>

<div className="mt-6">
  <label className="text-gray-300 block mb-2">🔎 Target Industry</label>
  <select className="p-3 bg-gray-800 border border-gray-600 rounded-lg w-72">
    <option>Technology</option>
    <option>Finance</option>
    <option>Healthcare</option>
    <option>Real Estate</option>
  </select>
</div>

<div className="mt-6">
  <label className="text-gray-300 block mb-2">🏢 Company Size</label>
  <select className="p-3 bg-gray-800 border border-gray-600 rounded-lg w-72">
    <option>1-50 Employees</option>
    <option>51-200 Employees</option>
    <option>201-1000 Employees</option>
    <option>1000+ Employees</option>
  </select>
</div>

<button 
  onClick={() => router.push("/onboarding/review")}
  className="mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg"
>
  Review & Confirm →
</button>

    </div>
  );
}
