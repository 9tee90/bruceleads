import { Metadata } from 'next';
import Header from '@/components/marketing/Header';

export const metadata: Metadata = {
  title: 'Terms of Service | BruceLeads',
  description: 'Terms of service and usage agreement for BruceLeads platform',
};

export default function TermsOfService() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <article className="bg-white shadow-sm rounded-lg p-8">
            <h1 className="text-4xl font-bold mb-8 text-gray-900">Terms of Service</h1>
            
            <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700">
              <p className="text-lg text-gray-600 mb-8">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8" aria-labelledby="agreement">
                <h2 id="agreement" className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
                <p>
                  By accessing or using the BruceLeads platform ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you do not have permission to access the Service.
                </p>
              </section>

              <section className="mb-8" aria-labelledby="platform-usage">
                <h2 id="platform-usage" className="text-2xl font-semibold mb-4">2. Platform Usage and LinkedIn Compliance</h2>
                <p>
                  Our platform operates in compliance with LinkedIn's Platform Guidelines:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>We do not scrape or automatically collect data from LinkedIn</li>
                  <li>Users must comply with LinkedIn's terms of service</li>
                  <li>All data collection is done through official APIs and authorized methods</li>
                  <li>Users must have appropriate rights to use and import LinkedIn data</li>
                </ul>
              </section>

              <section className="mb-8" aria-labelledby="user-accounts">
                <h2 id="user-accounts" className="text-2xl font-semibold mb-4">3. User Accounts</h2>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>You must provide accurate and complete information when creating an account</li>
                  <li>You are responsible for maintaining the security of your account</li>
                  <li>You must notify us immediately of any unauthorized access</li>
                  <li>We reserve the right to terminate accounts that violate these terms</li>
                </ul>
              </section>

              <section className="mb-8" aria-labelledby="subscription">
                <h2 id="subscription" className="text-2xl font-semibold mb-4">4. Subscription and Payments</h2>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Subscription fees are billed in advance on a recurring basis</li>
                  <li>All payments are processed securely through Stripe</li>
                  <li>Refunds are handled according to our refund policy</li>
                  <li>We reserve the right to change pricing with notice to users</li>
                </ul>
              </section>

              <section className="mb-8" aria-labelledby="acceptable-use">
                <h2 id="acceptable-use" className="text-2xl font-semibold mb-4">5. Acceptable Use</h2>
                <p>You agree not to:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Use the service for any illegal purposes</li>
                  <li>Attempt to gain unauthorized access to any part of the Service</li>
                  <li>Interfere with or disrupt the Service</li>
                  <li>Scrape or harvest data without authorization</li>
                  <li>Violate any applicable laws or regulations</li>
                </ul>
              </section>

              <section className="mb-8" aria-labelledby="data-usage">
                <h2 id="data-usage" className="text-2xl font-semibold mb-4">6. Data Usage and Privacy</h2>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Users must comply with data privacy laws</li>
                  <li>Users must not misuse or mishandle personal data</li>
                  <li>Our privacy practices are detailed in our <a href="/legal/privacy" className="text-blue-600 hover:text-blue-800">Privacy Policy</a></li>
                  <li>Users are responsible for their data handling practices</li>
                </ul>
              </section>

              <section className="mb-8" aria-labelledby="intellectual-property">
                <h2 id="intellectual-property" className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
                <p>
                  The Service and its original content, features, and functionality are owned by BruceLeads and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>
              </section>

              <section className="mb-8" aria-labelledby="liability">
                <h2 id="liability" className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
                <p>
                  In no event shall BruceLeads be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                </p>
              </section>

              <section className="mb-8" aria-labelledby="termination">
                <h2 id="termination" className="text-2xl font-semibold mb-4">9. Termination</h2>
                <p>
                  We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                </p>
              </section>

              <section className="mb-8" aria-labelledby="changes">
                <h2 id="changes" className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
                <p>
                  We reserve the right to modify or replace these Terms at any time. We will notify users of any material changes to these Terms.
                </p>
              </section>

              <section className="mb-8" aria-labelledby="contact">
                <h2 id="contact" className="text-2xl font-semibold mb-4">11. Contact Us</h2>
                <p>
                  If you have questions about these Terms, please contact us at:
                </p>
                <address className="not-italic pl-6 mb-4 space-y-2">
                  <p>Email: <a href="mailto:legal@bruceleads.com" className="text-blue-600 hover:text-blue-800">legal@bruceleads.com</a></p>
                  <p>Address: [Your Business Address]</p>
                </address>
              </section>
            </div>
          </article>
        </div>
      </main>
    </>
  );
} 