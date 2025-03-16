import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | BruceLeads',
  description: 'Privacy policy and data handling practices for BruceLeads platform',
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-lg text-gray-600 mb-8">
          Last updated: 15 March 2025
        </p>

        <section className="mb-8">
          <p className="mb-4">
            Bruce Leads is a project operated by Beyond Business Group Ltd ("Company," "we," "us," or "our"), registered in England and Wales under company number 14332332. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services ("Services").
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <p className="mb-4">We collect personal and non-personal information when you interact with our Services, including but not limited to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Personal Information: Name, email, phone number, billing details, and other identifiers.</li>
            <li>Usage Data: IP address, browser type, operating system, referring URLs, and site interaction data.</li>
            <li>Cookies & Tracking Technologies: To improve user experience and analytics.</li>
            <li>Third-Party Data: Data from integrations with APIs and third-party platforms.</li>
            <li>Account Data: Information provided when signing up, including preferences, business details, and lead intent signals.</li>
            <li>Communication Data: Any messages or correspondence exchanged with us.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p className="mb-4">We use collected data to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide, personalize, and improve our Services.</li>
            <li>Ensure security, detect fraud, and prevent unauthorized access.</li>
            <li>Optimize and deliver targeted lead recommendations.</li>
            <li>Facilitate API integrations and third-party services.</li>
            <li>Comply with legal obligations (GDPR, CCPA, and other applicable laws).</li>
            <li>Conduct research, analytics, and enhance AI-driven insights.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Data Sharing and Disclosure</h2>
          <p className="mb-4">We do not sell your data. We may share your information with:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Service Providers: Hosting, analytics, payment processors, and AI infrastructure partners.</li>
            <li>Legal Compliance: If required by law, regulation, or legal process.</li>
            <li>Business Transfers: In case of mergers, acquisitions, or asset sales.</li>
            <li>API and Third-Party Integrations: If you enable external data sources.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Your Rights</h2>
          <p className="mb-4">Under GDPR and CCPA, you have rights to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Access, rectify, or delete your data.</li>
            <li>Opt-out of certain data processing activities.</li>
            <li>Receive a copy of your data in a structured format.</li>
            <li>Lodge complaints with data protection authorities.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Security Measures</h2>
          <p className="mb-4">
            We implement industry-standard security protocols, encryption, and access controls to safeguard your data.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Retention Policy</h2>
          <p className="mb-4">
            We retain data as long as necessary to fulfill our obligations, comply with laws, or for legitimate business interests.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
          <p className="mb-4">
            For any privacy-related questions, contact us at:
          </p>
          <ul className="list-none pl-6 mb-4">
            <li>Email: taha@bruceleads.ai</li>
          </ul>
        </section>
      </div>
    </div>
  );
} 