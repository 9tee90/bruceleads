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
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
          <p>
            By accessing or using BruceLeads ("the Platform"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the Platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Platform Usage and LinkedIn Compliance</h2>
          <p>
            Our Platform is designed to complement LinkedIn's services while maintaining strict compliance with their policies:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Users must comply with LinkedIn's User Agreement and Platform Guidelines</li>
            <li>The Platform does not scrape or automatically collect data from LinkedIn</li>
            <li>All LinkedIn integrations are through official APIs and authorized channels</li>
            <li>Users are responsible for obtaining necessary permissions for data usage</li>
            <li>The Platform complements, not competes with, LinkedIn's Sales Navigator and advertising products</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
          <p>
            When creating an account, you agree to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Promptly update any changes to your information</li>
            <li>Accept responsibility for all activities under your account</li>
            <li>Not share your account credentials with third parties</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Subscription and Payments</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Subscription fees are billed in advance on a recurring basis</li>
            <li>All payments are processed securely through Stripe</li>
            <li>Refunds are handled according to our refund policy</li>
            <li>We reserve the right to modify pricing with notice</li>
            <li>Failed payments may result in service interruption</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Acceptable Use</h2>
          <p>
            Users agree not to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on intellectual property rights</li>
            <li>Attempt to gain unauthorized access to the Platform</li>
            <li>Use the Platform for spam or harassment</li>
            <li>Interfere with the Platform's operation</li>
            <li>Scrape or harvest data without permission</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Data Usage and Privacy</h2>
          <p>
            Your use of the Platform is also governed by our Privacy Policy. You agree to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Only upload data you have permission to use</li>
            <li>Respect data privacy and protection laws</li>
            <li>Not share or misuse other users' data</li>
            <li>Comply with data retention and deletion policies</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
          <p>
            The Platform and its original content, features, and functionality are owned by BruceLeads and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
          <p>
            BruceLeads shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the Platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Termination</h2>
          <p>
            We may terminate or suspend your account and access to the Platform:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>For violations of these Terms</li>
            <li>At our sole discretion with notice</li>
            <li>Upon your request</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will notify users of any material changes via email or through the Platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Contact Information</h2>
          <p>
            For questions about these Terms, please contact us at:
          </p>
          <ul className="list-none pl-6 mb-4">
            <li>Email: legal@bruceleads.com</li>
            <li>Address: [Your Business Address]</li>
          </ul>
        </section>
      </div>
    </div>
  );
} 