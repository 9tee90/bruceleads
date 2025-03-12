"use client";
import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between w-full">
      <h1 className="text-lg font-bold text-yellow-400">🚀 Bruce Leads</h1>
      <div className="space-x-4">
        <Link href="/onboarding">
          <button className="text-gray-300 hover:text-yellow-400">Onboarding</button>
        </Link>
        <Link href="/dashboard">
          <button className="text-gray-300 hover:text-yellow-400">Dashboard</button>
        </Link>
      </div>
    </nav>
  );
}
