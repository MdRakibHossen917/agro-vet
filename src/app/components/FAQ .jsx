"use client";

import React from "react";

export default function FAQ() {
  return (
    <section className="w-10/12 mx-auto py-12 my-8">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-gray-900 dark:text-gray-100">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4 max-w-4xl mx-auto">
        <div className="collapse collapse-arrow bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title font-semibold text-lg">
            How do I create an account?
          </div>
          <div className="collapse-content text-base text-gray-600 dark:text-gray-400">
            Click the "Sign Up" button in the top right corner and follow the
            registration process.
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold text-lg">
            I forgot my password. What should I do?
          </div>
          <div className="collapse-content text-base text-gray-600 dark:text-gray-400">
            Click on "Forgot Password" on the login page and follow the
            instructions sent to your email.
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold text-lg">
            How do I update my profile information?
          </div>
          <div className="collapse-content text-base text-gray-600 dark:text-gray-400">
            Go to "My Account" settings and select "Edit Profile" to make
            changes.
          </div>
        </div>
      </div>
    </section>
  );
}
