// app/privacy/page.tsx
import React from "react"

export const metadata = {
  title: "Privacy Policy | Random Generator",
  description:
    "Read the Privacy Policy for Random Generator. Learn how we handle data, AI-generated content, and your privacy.",
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 px-4 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Privacy Policy
        </h1>

        <p className="text-gray-600 mb-4">
          Welcome to <strong>Random Generator</strong>. We value your privacy and want to be transparent about how our service works.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-purple-700">
          1. Free AI-Powered Service
        </h2>
        <p className="text-gray-600 mb-4">
          Our website provides <strong>facts, jokes, and questions</strong> that are generated using Artificial Intelligence.  
          The service is completely free to use, and you don’t need to create an account.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-purple-700">
          2. Data Collection
        </h2>
        <p className="text-gray-600 mb-4">
          We do not collect personal data such as names, emails, or passwords.  
          However, basic analytics (like number of visitors) may be collected to improve the service.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-purple-700">
          3. AI-Generated Content
        </h2>
        <p className="text-gray-600 mb-4">
          All jokes, facts, and questions are created using AI. Since the content is machine-generated, we cannot guarantee
          100% accuracy. Please use the content for fun and entertainment purposes only.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-purple-700">
          4. MIT License
        </h2>
        <p className="text-gray-600 mb-4">
          This project is released under the <strong>MIT License</strong>.  
          You are free to use, modify, and share the code and content with proper attribution.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-purple-700">
          5. Third-Party Services
        </h2>
        <p className="text-gray-600 mb-4">
          We may use third-party tools (like Google Analytics or AdSense) to support the service.  
          These services may use cookies to provide better functionality and ads.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-purple-700">
          6. Updates
        </h2>
        <p className="text-gray-600 mb-4">
          We may update this Privacy Policy from time to time.  
          Any updates will be posted on this page with a new date of revision.
        </p>

        <p className="text-gray-600 mt-6">
          If you have any questions, please visit our{" "}
          <a
            href="/contact"
            className="text-purple-600 font-medium hover:underline"
          >
            Contact Page
          </a>.
        </p>
      </div>
    </main>
  )
}
