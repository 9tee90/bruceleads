'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link 
        href="/" 
        className="inline-flex items-center text-blue-500 hover:text-blue-400 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Link>

      <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
      <p className="text-gray-400 mb-8">Last updated: 15 March 2025</p>

      <div className="prose prose-invert max-w-none">
        <p className="text-gray-300 text-lg mb-8">
          Bruce Leads is a project operated by Beyond Business Group Ltd ("Company," "we," "us," or "our"), registered in England and Wales under company number 14332332. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services ("Services").
        </p>

        <h2 className="text-2xl font-bold text-white mt-12 mb-6">1. Information We Collect</h2>
        <p className="text-gray-300 mb-4">
          We collect personal and non-personal information when you interact with our Services, including but not limited to:
        </p>
        <ul className="list-disc pl-6 text-gray-300 space-y-2">
          <li>Personal Information: Name, email, phone number, billing details, and other identifiers.</li>
          <li>Usage Data: IP address, browser type, operating system, referring URLs, and site interaction data.</li>
        </ul>

        <h2 className="text-2xl font-bold text-white mt-12 mb-6">2. How We Use Your Information</h2>
        <p className="text-gray-300 mb-4">We use collected data to:</p>
        <ul className="list-disc pl-6 text-gray-300 space-y-2">
          <li>Provide, personalize, and improve our Services</li>
          <li>Ensure security, detect fraud, and prevent unauthorized access</li>
          <li>Optimize and deliver targeted lead recommendations</li>
          <li>Facilitate API integrations and third-party services</li>
          <li>Comply with legal obligations (GDPR, CCPA, and other applicable laws)</li>
          <li>Conduct research, analytics, and enhance AI-driven insights</li>
        </ul>

        <h2 className="text-2xl font-bold text-white mt-12 mb-6">3. Data Sharing and Disclosure</h2>
        <p className="text-gray-300 mb-4">We do not sell your data. We may share your information with:</p>
        <ul className="list-disc pl-6 text-gray-300 space-y-2">
          <li>Service Providers: Hosting, analytics, payment processors, and AI infrastructure partners</li>
          <li>Legal Compliance: If required by law, regulation, or legal process</li>
          <li>Business Transfers: In case of mergers, acquisitions, or asset sales</li>
          <li>API and Third-Party Integrations: If you enable external data sources</li>
        </ul>

        <h2 className="text-2xl font-bold text-white mt-12 mb-6">4. Your Rights</h2>
        <p className="text-gray-300 mb-4">Under GDPR and CCPA, you have rights to:</p>
        <ul className="list-disc pl-6 text-gray-300 space-y-2">
          <li>Access, rectify, or delete your data</li>
          <li>Opt-out of certain data processing activities</li>
          <li>Receive a copy of your data in a structured format</li>
          <li>Lodge complaints with data protection authorities</li>
        </ul>

        <h2 className="text-2xl font-bold text-white mt-12 mb-6">5. Security Measures</h2>
        <p className="text-gray-300 mb-4">
          We implement industry-standard security protocols, encryption, and access controls to safeguard your data.
        </p>
      </div>
    </div>
  );
} 