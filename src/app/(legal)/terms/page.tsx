'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link 
        href="/" 
        className="inline-flex items-center text-blue-500 hover:text-blue-400 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Link>

      <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
      <p className="text-gray-400 mb-8">Last updated: 15 March 2025</p>

      <div className="prose prose-invert max-w-none">
        <p className="text-gray-300 text-lg mb-8">
          Welcome to Bruce Leads. By accessing or using our services, you agree to be bound by these Terms of Service ("Terms"). Bruce Leads is operated by Beyond Business Group Ltd ("Company," "we," "us," or "our"), registered in England and Wales under company number 14332332.
        </p>

        <h2 className="text-2xl font-bold text-white mt-12 mb-6">1. Service Description</h2>
        <p className="text-gray-300 mb-4">
          Bruce Leads provides AI-powered lead generation and sales intelligence services. Our platform includes:
        </p>
        <ul className="list-disc pl-6 text-gray-300 space-y-2">
          <li>Lead generation and enrichment</li>
          <li>Sales intelligence and analytics</li>
          <li>API access for data integration</li>
          <li>Custom AI models and insights</li>
        </ul>

        <h2 className="text-2xl font-bold text-white mt-12 mb-6">2. API Access and Usage</h2>
        <p className="text-gray-300 mb-4">
          When using our API services, you agree to:
        </p>
        <ul className="list-disc pl-6 text-gray-300 space-y-2">
          <li>Use API keys securely and not share them</li>
          <li>Respect rate limits and usage quotas</li>
          <li>Not reverse engineer or modify our services</li>
          <li>Comply with our data usage guidelines</li>
        </ul>

        <h2 className="text-2xl font-bold text-white mt-12 mb-6">3. Intellectual Property</h2>
        <p className="text-gray-300 mb-4">
          All content, features, and functionality are owned by Bruce Leads and protected by international copyright, trademark, and other intellectual property laws.
        </p>

        <h2 className="text-2xl font-bold text-white mt-12 mb-6">4. Disclaimers</h2>
        <p className="text-gray-300 mb-4">
          Our services are provided "as is" without warranties. We do not guarantee:
        </p>
        <ul className="list-disc pl-6 text-gray-300 space-y-2">
          <li>Accuracy of lead data or predictions</li>
          <li>Uninterrupted service availability</li>
          <li>Specific business outcomes or results</li>
        </ul>

        <h2 className="text-2xl font-bold text-white mt-12 mb-6">5. Governing Law</h2>
        <p className="text-gray-300 mb-4">
          These Terms are governed by the laws of England and Wales. Any disputes shall be resolved in the courts of England and Wales.
        </p>

        <h2 className="text-2xl font-bold text-white mt-12 mb-6">6. Contact</h2>
        <p className="text-gray-300 mb-4">
          For any questions about these Terms, please contact us at taha@bruceleads.ai
        </p>
      </div>
    </div>
  );
} 