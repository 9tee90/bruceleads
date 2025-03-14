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
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            BruceLeads ("we," "our," or "us") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our lead management and sales automation platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. LinkedIn Data Integration and Compliance</h2>
          <p>
            We take special care in handling data related to LinkedIn and ensure compliance with LinkedIn's Platform Guidelines:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>We do not scrape or automatically collect data from LinkedIn's website</li>
            <li>All LinkedIn data is obtained through official LinkedIn APIs and authorized integrations</li>
            <li>We complement LinkedIn's services and do not compete with LinkedIn Sales Navigator or advertising products</li>
            <li>Users must have appropriate authorization and consent for any LinkedIn data they import into our platform</li>
          </ul>
          <p>
            Our platform serves as a complementary tool to LinkedIn's professional services, helping users manage and organize their LinkedIn leads while respecting LinkedIn's terms of service and user privacy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Information We Collect</h2>
          <h3 className="text-xl font-semibold mb-3">3.1 Information You Provide</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Account information (name, email, password)</li>
            <li>Business information (company name, role, industry)</li>
            <li>Payment information (processed securely through Stripe)</li>
            <li>Lead information you manually input or import</li>
            <li>Communication preferences</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">3.2 LinkedIn-Related Information</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>LinkedIn profile information (with explicit user consent)</li>
            <li>Lead data imported through LinkedIn's API</li>
            <li>Connection and engagement history (via authorized integrations)</li>
            <li>Campaign and outreach metrics</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. How We Use Your Information</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>To provide and improve our services</li>
            <li>To personalize your experience</li>
            <li>To process payments and transactions</li>
            <li>To send administrative communications</li>
            <li>To provide customer support</li>
            <li>To analyze usage patterns and improve our platform</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Data Protection and Security</h2>
          <p>
            We implement robust security measures to protect your information:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>End-to-end encryption for sensitive data</li>
            <li>Regular security audits and updates</li>
            <li>Secure data storage and transmission</li>
            <li>Access controls and authentication measures</li>
            <li>Regular backup procedures</li>
            <li>Employee training on data protection</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Third-Party Services</h2>
          <p>
            We integrate with various third-party services, including:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>LinkedIn (via official API)</li>
            <li>Stripe (payment processing)</li>
            <li>Analytics providers</li>
            <li>Email service providers</li>
          </ul>
          <p>
            Each third-party service has its own privacy policy and data handling practices.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Your Rights and Choices</h2>
          <p>
            You have the right to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
            <li>Export your data</li>
            <li>Withdraw consent for data processing</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or our data practices, please contact us at:
          </p>
          <ul className="list-none pl-6 mb-4">
            <li>Email: privacy@bruceleads.com</li>
            <li>Address: [Your Business Address]</li>
          </ul>
        </section>
      </div>
    </div>
  );
} 