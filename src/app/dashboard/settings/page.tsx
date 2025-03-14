'use client';
import { useRouter } from 'next/navigation';

export default function Settings() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-6">
      <h1 className="text-4xl font-bold text-yellow-400 mt-10">⚙️ User Settings</h1>
      <p className="text-lg text-gray-300 mt-4">
        Customize your AI notifications and lead tracking.
      </p>

      <label className="flex items-center mt-4 cursor-pointer">
        <input
          type="checkbox"
          className="mr-2 w-5 h-5 rounded border-gray-600 text-yellow-400 focus:ring-yellow-500"
        />
        <span className="text-gray-300">Enable AI Lead Notifications</span>
      </label>

      <button
        onClick={() => router.push('/dashboard')}
        className="mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg"
      >
        🔙 Back to Dashboard
      </button>
    </div>
  );
}
