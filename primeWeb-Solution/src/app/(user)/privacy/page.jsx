'use client';

import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-800">
      {/* Header */}
      <header className="bg-black text-white py-6 shadow-md">
        <div className="max-w-7xl mx-auto px-5">
          <h1 className="text-3xl font-bold text-center">Privacy Policy</h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-5 py-10">
        <div className="bg-black text-white shadow-lg rounded-lg p-8 space-y-6">
          

          <p>
            At <strong>Trisha Consultancy</strong>, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.
          </p>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">1. Information We Collect</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-100">
              <li>Personal information you provide directly (e.g., name, email, phone number).</li>
              <li>Information collected automatically (e.g., IP address, browser type, usage data).</li>
              <li>Information from third-party sources when you interact with our services.</li>
            </ul>

            <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-1 text-white">
              <li>To provide and improve our services.</li>
              <li>To communicate with you regarding inquiries, updates, or offers.</li>
              <li>To personalize your experience on our website.</li>
              <li>To comply with legal obligations and prevent fraud or misuse.</li>
            </ul>

            <h2 className="text-xl font-semibold">3. Cookies and Tracking</h2>
            <p>
              We may use cookies and similar tracking technologies to enhance your experience, analyze site usage, and serve relevant content. You can control cookies through your browser settings.
            </p>

            <h2 className="text-xl font-semibold">4. Sharing Your Information</h2>
            <p>
              We do not sell or rent your personal information. We may share information with trusted third-party service providers to help operate our services, comply with the law, or protect our rights.
            </p>

            <h2 className="text-xl font-semibold">5. Data Security</h2>
            <p>
              We implement reasonable technical and organizational measures to protect your personal data. However, no method of transmission over the internet is 100% secure.
            </p>

            <h2 className="text-xl font-semibold">6. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at the details below.
            </p>

            <h2 className="text-xl font-semibold">7. Children’s Privacy</h2>
            <p>
              Our services are not intended for individuals under 13 years of age. We do not knowingly collect personal information from children.
            </p>

            <h2 className="text-xl font-semibold">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with the “Last Updated” date.
            </p>

            <h2 className="text-xl font-semibold">9. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, you can contact us at:<br/>
              <strong>Email:</strong> [trishaconsultancyservices.tcs@gmail.com]<br/>
              <strong>Phone:</strong> [9598705515]<br/>
              <strong>Address:</strong> [Noida Sector 62, Uttar Pradesh]
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
