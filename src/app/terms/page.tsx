import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar className="bg-white shadow-sm" />

      {/* Content */}
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-6">
              By accessing and using BPA (Business Profile Automation), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 mb-6">
              BPA is a web-based service that allows users to schedule and automate posts to their Google Business Profiles. Our service helps businesses maintain an active online presence by automating their posting schedule.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. User Accounts</h2>
            <p className="text-gray-700 mb-6">
              To use BPA, you must create an account by signing in with your Google account. You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Google Business Profile Access</h2>
            <p className="text-gray-700 mb-6">
              By using BPA, you grant us permission to access and manage your Google Business Profile(s) on your behalf. We will only use this access to perform the services you have requested, such as posting content you have created and scheduled.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Content Policy</h2>
            <p className="text-gray-700 mb-6">
              You are solely responsible for the content you create and schedule through BPA. You agree not to post content that is:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 ml-4">
              <li>Illegal, harmful, or violates any laws</li>
              <li>Abusive, harassing, or discriminatory</li>
              <li>Contains false or misleading information</li>
              <li>Violates Google&apos;s terms of service or community guidelines</li>
              <li>Infringes on intellectual property rights</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Payment Terms</h2>
            <p className="text-gray-700 mb-6">
              BPA offers both free and paid subscription plans. Paid subscriptions are billed monthly or annually in advance. All fees are non-refundable except as required by law. You may cancel your subscription at any time.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Service Availability</h2>
            <p className="text-gray-700 mb-6">
              While we strive for 100% uptime, we cannot guarantee that BPA will be available at all times. We may temporarily suspend service for maintenance, updates, or due to circumstances beyond our control.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-700 mb-6">
              BPA shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. Termination</h2>
            <p className="text-gray-700 mb-6">
              We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users of BPA.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. Changes to Terms</h2>
            <p className="text-gray-700 mb-6">
              We reserve the right to modify these terms at any time. We will notify users of significant changes via email or through the service. Continued use of BPA after changes constitutes acceptance of the new terms.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">11. Contact Information</h2>
            <p className="text-gray-700 mb-6">
              If you have any questions about these Terms of Service, please contact us at{" "}
              <a href="mailto:support@yourbpadomain.com" className="text-blue-600 hover:underline">
                support@yourbpadomain.com
              </a>
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link 
              href="/"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}