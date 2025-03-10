"use client";
import React from "react";

interface Lead {
  company: string;
  score: number;
}

interface LeadListProps {
  leads: Lead[];
}

export default function LeadList({ leads }: LeadListProps) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg w-full max-w-4xl mt-4">
      <h2 className="text-lg font-semibold text-yellow-400">📡 Detected Leads</h2>
      {leads.length === 0 ? (
        <p className="text-gray-400 mt-2">⏳ Detecting high-intent leads...</p>
      ) : (
        <ul className="mt-2">
          {leads.map((lead, index) => (
            <li
              key={index}
              className="p-3 bg-gray-900 rounded-lg border border-gray-700 my-2 flex justify-between"
            >
              <span className="text-white">{lead.company}</span>
              <span className="text-yellow-500 font-bold">{lead.score}% Intent</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
