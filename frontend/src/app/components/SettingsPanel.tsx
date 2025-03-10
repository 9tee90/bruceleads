"use client";
import { useState } from "react";

export default function SettingsPanel() {
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="p-4 bg-gray-800 border border-blue-500 rounded-lg mt-4">
      <h3 className="text-lg font-semibold">⚙️ User Settings</h3>
      <label className="flex items-center mt-2">
        <input 
          type="checkbox" 
          checked={notifications} 
          onChange={() => setNotifications(!notifications)}
          className="mr-2"
        />
        Enable AI Lead Notifications
      </label>
    </div>
  );
}
