import { MapPin } from "lucide-react";
import Link from "next/link";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">BPA</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Account Information</h3>
            <p className="text-gray-700 mb-6">
              When you sign up for BPA using Google OAuth, we collect your Google account email address, name, and profile information that you choose to share with us.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Google Business Profile Data</h3>
            <p className="text-gray-700 mb-6">
              With your permission, we access your Google Business Profile information including business names, locations, and profile details necessary to provide our scheduling service.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Usage Information</h3>
            <p className="text-gray-700 mb-6">
              We collect information about how you use BPA, including posts you create, scheduling preferences, and feature usage to improve our service.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 mb-6">We use your information to:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 ml-4">
              <li>Provide and maintain our scheduling service</li>
              <li>Post content to your Google Business Profiles as requested</li>
              <li>Send you service-related communications</li>
              <li>Improve and optimize our service</li>
              <li>Provide customer support</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Information Sharing</h2>
            <p className="text-gray-700 mb-6">
              We do not sell, trade, or share your personal information with third parties except:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 ml-4">
              <li>With Google, as necessary to post to your Business Profiles</li>
              <li>With service providers who help us operate BPA (under strict confidentiality agreements)</li>
              <li>When required by law or to protect our rights</li>
              <li>In connection with a business transfer or acquisition</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Data Security</h2>
            <p className="text-gray-700 mb-6">
              We implement industry-standard security measures to protect your data, including encryption, secure servers, and access controls. However, no method of transmission over the internet is 100% secure.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Google OAuth and Permissions</h2>
            <p className="text-gray-700 mb-6">
              BPA uses Google OAuth to securely access your Google Business Profile. We only request the minimum permissions necessary to provide our service. You can revoke these permissions at any time through your Google account settings.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Data Retention</h2>
            <p className="text-gray-700 mb-6">
              We retain your account information and content for as long as your account is active or as needed to provide services. You may delete your account at any time, which will remove your data from our systems.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Your Rights</h2>
            <p className="text-gray-700 mb-6">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-700 mb-6 ml-4">
              <li>Access and download your data</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and data</li>
              <li>Restrict or object to certain processing</li>
              <li>Data portability (where applicable)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Cookies and Analytics</h2>
            <p className="text-gray-700 mb-6">
              We use cookies and similar technologies to improve your experience, remember your preferences, and analyze how our service is used. You can control cookie settings through your browser.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. Children&apos;s Privacy</h2>
            <p className="text-gray-700 mb-6">
              BPA is not intended for use by children under 13. We do not knowingly collect personal information from children under 13.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. International Data Transfers</h2>
            <p className="text-gray-700 mb-6">
              Your information may be processed and stored in countries other than your own. We ensure appropriate safeguards are in place to protect your data during international transfers.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">11. Changes to This Policy</h2>
            <p className="text-gray-700 mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by email or through our service. Your continued use of BPA after changes constitutes acceptance of the updated policy.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">12. Contact Us</h2>
            <p className="text-gray-700 mb-6">
              If you have any questions about this Privacy Policy or our data practices, please contact us at{" "}
              <a href="mailto:privacy@yourbpadomain.com" className="text-blue-600 hover:underline">
                privacy@yourbpadomain.com
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