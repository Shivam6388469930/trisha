'use client';

import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-black text-white py-6 shadow-md">
        <div className="max-w-8xl mx-auto px-5">
          <h1 className="text-3xl font-bold text-center">Terms & Conditions</h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-5 py-10">
        <div className="bg-black text-white shadow-lg rounded-lg p-8 space-y-6">
         

          <p>
            Welcome to <strong>Trisha Consultancy</strong>. By accessing or using our website and
            services, you agree to comply with the following Terms and Conditions. Please read them carefully.
          </p>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
            <p>
              By using our website or services, you agree to be legally bound by these Terms and Conditions and our Privacy Policy.
              If you do not agree, please do not use our services.
            </p>

            <h2 className="text-xl font-semibold">2. Services</h2>
            <p>
              Trisha Consultancy provides [briefly describe your services, e.g., business consulting, digital solutions, etc.].
              All services are provided as per the terms agreed upon in consultation or project agreements.
            </p>

            <h2 className="text-xl font-semibold">3. Use of Website</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-100">
              <li>You agree to use our website for lawful purposes only.</li>
              <li>You will not engage in any activity that may disrupt, damage, or interfere with the website’s functionality.</li>
              <li>You agree not to copy, reproduce, distribute, or exploit any content from the website without prior written consent.</li>
            </ul>

            <h2 className="text-xl font-semibold">4. Intellectual Property</h2>
            <p>
              All content, including text, graphics, logos, images, and software, is the property of Trisha Consultancy and protected under applicable intellectual property laws.
              Unauthorized use of our content may result in legal action.
            </p>

            <h2 className="text-xl font-semibold">5. Limitation of Liability</h2>
            <p>
              Trisha Consultancy shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or services.
              We do not guarantee uninterrupted or error-free services.
            </p>

            <h2 className="text-xl font-semibold">6. Governing Law</h2>
            <p>
              These Terms and Conditions are governed by the laws of [Your State/Country]. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of [Your City/State].
            </p>

            <h2 className="text-xl font-semibold">7. Contact Us</h2>
            <p>
              For any questions regarding these Terms and Conditions, contact us at:<br/>
              <strong>Email:</strong> [trishaconsultancyservices.tcs@gmail.com] <br/>
              <strong>Phone:</strong> [9598705515] <br/>
              <strong>Address:</strong> [Noida Sector 62, Uttar Pradesh]
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsAndConditions;
