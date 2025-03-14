'use client';
import { useRouter } from 'next/navigation';

export default function Onboarding() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-6">
      <h1 className="text-4xl font-bold text-yellow-400 mt-10">🚀 Welcome to Bruce Leads!</h1>
      <p className="text-lg text-gray-300 mt-4 text-center">
        Bruce Leads tracks high-intent buyers based on funding rounds, hiring trends, and market
        shifts.
      </p>
      <p className="text-gray-400 mt-2 text-center">
        Let’s configure your AI preferences so you only get **the best leads.**
      </p>

      <button
        onClick={() => router.push('/onboarding/preferences')}
        className="mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg"
      >
        Let’s Set Up Your AI Lead Detection →
      </button>
    </div>
  );
}
