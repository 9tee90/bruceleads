import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | BruceLeads',
  description: 'Terms and conditions for using the BruceLeads platform',
};

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-lg text-gray-600 mb-8">
          Last updated: 15 March 2025
        </p>

        <section className="mb-8">
          <p className="mb-4">
            By accessing or using Bruce Leads, you agree to these Terms of Use.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Use of Services</h2>
          <p className="mb-4">You agree to use our Services in compliance with all applicable laws and regulations. Prohibited uses include:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Unauthorized data scraping, automated queries, or excessive API requests.</li>
            <li>Engaging in fraudulent, misleading, or unlawful activities.</li>
            <li>Reverse engineering, attempting to disrupt, or interfering with our Services.</li>
            <li>Misusing AI-generated insights for deceptive purposes.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. API Access & Fair Use Policy</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>API access is subject to fair use limits, monitored for abuse prevention.</li>
            <li>Excessive requests, scraping, or misuse may result in temporary or permanent suspension.</li>
            <li>API keys must be kept secure; users are responsible for any misuse.</li>
            <li>Bruce Leads reserves the right to modify, throttle, or revoke API access if it disrupts system stability.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Intellectual Property</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>All content, trademarks, data, and proprietary technology used in Bruce Leads are owned by Beyond Business Group Ltd.</li>
            <li>Unauthorized reproduction, resale, or redistribution of our Services is prohibited.</li>
            <li>Users may not claim ownership of AI-generated insights or data processed through our platform.</li>
            <li>Any third-party integrations must comply with our API usage policies.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Disclaimers & Limitations</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>We do not guarantee uninterrupted service or absolute accuracy of insights.</li>
            <li>Liability for indirect, consequential, or business losses is disclaimed to the maximum extent permitted by law.</li>
            <li>Users are responsible for the accuracy of data they input into the platform.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Governing Law & Dispute Resolution</h2>
          <p className="mb-4">
            These Terms are governed by the laws of England and Wales. Any disputes shall be resolved through arbitration or courts in this jurisdiction.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Termination & Modifications</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>We reserve the right to suspend or terminate access to our Services for violation of these terms.</li>
            <li>We may update these Terms, and continued use of the Services constitutes acceptance of the revised Terms.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Contact</h2>
          <p className="mb-4">
            For legal inquiries, contact us at:
          </p>
          <ul className="list-none pl-6 mb-4">
            <li>Email: taha@bruceleads.ai</li>
          </ul>
        </section>
      </div>
    </div>
  );
} 